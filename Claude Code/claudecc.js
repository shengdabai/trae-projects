#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const args = process.argv.slice(2)
const providerArg = args.find(a => a.startsWith('--provider='))
const provider = providerArg ? providerArg.split('=')[1] : 'kimi'

const skillsFile = process.env.CLAUDE_SKILLS_FILE || path.resolve(process.cwd(), 'AGENTS.md')
let skillsContent = ''
try {
  skillsContent = fs.readFileSync(skillsFile, 'utf8')
} catch {}

const systemPrompt = `You are Claude Code in terminal mode. Use the available skills described below when helpful.\n\n${skillsContent}`

const MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY || ''
const ZHIPUAI_API_KEY = process.env.ZHIPUAI_API_KEY || ''

function missingKeyMessage() {
  const need = provider === 'kimi' ? 'MOONSHOT_API_KEY' : 'ZHIPUAI_API_KEY'
  console.error(`Missing ${need}. Please export it before running.`)
  process.exit(1)
}

async function sendChat(messages) {
  const headers = { 'Content-Type': 'application/json' }
  let url = ''
  let body = {}

  if (provider === 'kimi') {
    if (!MOONSHOT_API_KEY) missingKeyMessage()
    headers.Authorization = `Bearer ${MOONSHOT_API_KEY}`
    url = 'https://api.moonshot.cn/v1/chat/completions'
    body = {
      model: 'moonshot-v1-8k',
      messages,
      temperature: 0.2
    }
  } else if (provider === 'glm') {
    if (!ZHIPUAI_API_KEY) missingKeyMessage()
    headers.Authorization = `Bearer ${ZHIPUAI_API_KEY}`
    url = 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
    body = {
      model: 'glm-4',
      messages,
      temperature: 0.2
    }
  } else {
    console.error(`Unknown provider: ${provider}`)
    process.exit(1)
  }

  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`HTTP ${res.status}: ${txt}`)
  }
  const data = await res.json()
  try {
    const content = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.delta?.content || ''
    return content
  } catch (e) {
    return JSON.stringify(data)
  }
}

async function main() {
  console.log(`Claude Code (provider: ${provider})`)
  const messages = [
    { role: 'system', content: systemPrompt }
  ]

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })

  async function ask() {
    rl.question('> ', async (input) => {
      if (!input || input.trim().length === 0) return ask()
      messages.push({ role: 'user', content: input })
      try {
        const reply = await sendChat(messages)
        console.log(`\n${reply}\n`)
        messages.push({ role: 'assistant', content: reply })
      } catch (e) {
        console.error(String(e))
      }
      ask()
    })
  }

  ask()
}

main()

