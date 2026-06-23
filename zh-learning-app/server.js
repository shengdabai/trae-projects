// NOTE: This server is designed as a LOCAL development tool.
// If deploying to a public network, add Helmet for security headers and
// configure CORS to restrict allowed origins before exposing any endpoints.
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { pipeline } from '@xenova/transformers'
import { pinyin } from 'pinyin-pro'
import nodejieba from 'nodejieba'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json({ limit: '1mb' }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

let en2zh = null
let zh2en = null

function normalizeEnglish(input) {
  return String(input || '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function getPipelines() {
  if (!en2zh) en2zh = await pipeline('translation', 'Xenova/opus-mt-en-zh')
  if (!zh2en) zh2en = await pipeline('translation', 'Xenova/opus-mt-zh-en')
  return { en2zh, zh2en }
}

function toPinyin(text) {
  return pinyin(text, { toneType: 'symbol', type: 'array' }).join(' ')
}

function segment(text, granularity) {
  if (granularity === 'char') {
    return Array.from(text)
  }
    // word-level segmentation
  return nodejieba.cut(text)
}

const MAX_INPUT_LENGTH = 500
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMIT_MAX = 20
const rateLimitMap = new Map()

// Periodically evict expired rate-limit entries to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.start > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip)
    }
  }
}, RATE_LIMIT_WINDOW_MS).unref()

function rateLimit(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress || 'unknown'
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { start: now, count: 1 })
    return next()
  }
  entry.count++
  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ error: 'Too many requests, please try again later' })
  }
  return next()
}

const VALID_GRANULARITIES = new Set(['word', 'char'])

app.post('/api/translate', rateLimit, async (req, res) => {
  try {
    const { english = '', granularity: rawGranularity = 'word' } = req.body || {}
    const norm = normalizeEnglish(english)
    if (!norm) return res.status(400).json({ error: 'invalid input' })
    if (norm.length > MAX_INPUT_LENGTH) {
      return res.status(400).json({ error: `Input too long (max ${MAX_INPUT_LENGTH} chars)` })
    }
    const granularity = VALID_GRANULARITIES.has(rawGranularity) ? rawGranularity : 'word'

    const { en2zh, zh2en } = await getPipelines()
    const zhOut = await en2zh(norm)
    const chinese = (Array.isArray(zhOut) ? zhOut[0]?.translation_text : zhOut?.translation_text) || ''

    const pySentence = chinese ? toPinyin(chinese) : ''
    const units = chinese ? segment(chinese, granularity) : []

    const segments = []
    for (const u of units) {
      if (!u.trim()) continue
      const py = toPinyin(u)
      let en = ''
      try {
        const enOut = await zh2en(u)
        en = (Array.isArray(enOut) ? enOut[0]?.translation_text : enOut?.translation_text) || ''
      } catch (e) {
        en = ''
      }
      segments.push({ zh: u, py, en })
    }

    res.json({
      chinese,
      pinyin: pySentence,
      segments,
      notes: { normalized_english: norm, provider: 'xenova/transformers', granularity }
    })
  } catch (e) {
    console.error('Translation failed:', e.message)
    res.status(500).json({ error: 'internal error' })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
