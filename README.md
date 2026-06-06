# 🗃️ trae-projects

> A workbench of small, real learning tools — AI gaokao tutoring, a Chinese↔English study app, and DIY Claude-style CLI agents — built in public with [Trae](https://www.trae.ai/).

English | [中文](#中文)

[![Last commit](https://img.shields.io/github/last-commit/shengdabai/trae-projects)](https://github.com/shengdabai/trae-projects/commits)
[![Stars](https://img.shields.io/github/stars/shengdabai/trae-projects?style=social)](https://github.com/shengdabai/trae-projects/stargazers)
[![Follow @shengdabai](https://img.shields.io/github/followers/shengdabai?style=social)](https://github.com/shengdabai)

I'm Tony (Sheng) — a Chinese-language teacher with 6,000+ students, building AI + Chinese-teaching tools in the open. This repo is the scratchpad where those experiments live: each folder is a self-contained tool I actually use or tested, kept honest about what it does and doesn't do yet.

## Why this exists

Teaching language at scale means hitting the same friction over and over: drilling exam questions, getting fast pinyin + segmentation on any sentence, and wiring cheap LLMs into a terminal. Instead of one big app, this is **a collection of focused learning apps and agents** — small enough to read in one sitting, useful enough to keep.

## ✨ Projects

| Project | What it does | Folder |
|---|---|---|
| 🎓 **Gaokao AI Study** | Personalized gaokao (Chinese college-entrance exam) prep. A Python script ingests your past-paper PDFs into plain text, and a Socratic-tutor system prompt turns any chat model (Trae / Claude / ChatGPT) into a coach that guides instead of spoon-feeds. | [`Gaokao-AI-Study/`](Gaokao-AI-Study/) |
| 🇨🇳 **Chinese Learning App** | A local Node + Express web app that translates English → Chinese, then adds pinyin and word/character segmentation per token. Runs translation fully offline via `@xenova/transformers`, with `jieba` segmentation and `pinyin-pro`. | [`zh-learning-app/`](zh-learning-app/) |
| 🤖 **Claude Code (CLI agents)** | DIY terminal chat clients that point a Claude-Code-style loop at budget Chinese LLMs — Kimi (Moonshot) and GLM (Zhipu) — via their OpenAI-compatible APIs. Includes a small API-key security check. | [`Claude Code/`](Claude%20Code/) |
| ⚙️ **bin** | Tiny launcher scripts: `claude` routes through [`@musistudio/claude-code-router`](https://github.com/musistudio/claude-code-router); `kimi` wires Moonshot's API into it. | [`bin/`](bin/) |
| 📚 **Claude Skills collection** | A curated set of 12 third-party Claude Skills repos, vendored as git submodules for reference (superpowers, agent-skill-creator, awesome-claude-skills, and more). | [`claude skillsmp/`](claude%20skillsmp/) |

## 🧱 Tech stack

- **Python** — `pdfplumber` for PDF ingestion; `urllib`-only LLM clients (zero heavy deps)
- **Node.js** — Express 5, ES modules
- **Local AI** — `@xenova/transformers` (in-process translation, no API key)
- **Chinese NLP** — `nodejieba` / `@node-rs/jieba` segmentation, `pinyin-pro` for tones
- **LLM APIs** — Moonshot (Kimi), Zhipu (GLM), OpenAI-compatible routing
- **Built with** — [Trae](https://www.trae.ai/) AI IDE

## 🚀 Quick start

```bash
git clone https://github.com/shengdabai/trae-projects
cd trae-projects
git submodule update --init --recursive   # only if you want the Claude Skills collection
```

Each tool runs on its own — pick one:

**🎓 Gaokao AI Study** (Python)
```bash
cd Gaokao-AI-Study
pip install -r requirements.txt
# drop your past-paper PDFs into knowledge_base/papers/, then:
python3 src/ingest_papers.py
# finally, paste AI_TUTOR.md into your chat model to activate the tutor
```

**🇨🇳 Chinese Learning App** (Node)
```bash
cd zh-learning-app
npm install
npm start          # serves http://localhost:3000
# POST /api/translate { "english": "hello world", "granularity": "word" }
```
> First run downloads the translation models locally; subsequent runs are offline.

**🤖 Claude Code CLI agents** (Python / Node)
```bash
export MOONSHOT_API_KEY=...   # or ZHIPUAI_API_KEY=...
node "Claude Code/claudecc.js" --provider=kimi   # or --provider=glm
```

## 🗺️ Status

This is an active, in-public workbench — expect rough edges.

- ✅ **Gaokao AI Study** — working: PDF ingest + tutor prompt
- ✅ **Chinese Learning App** — working: offline EN→ZH + pinyin + segmentation, with rate limiting and input validation
- ✅ **Claude Code CLI agents** — working: Kimi + GLM chat loops
- 🧪 **bin launchers** — handy but minimal
- 📦 **Claude Skills collection** — reference submodules, not maintained here

## 🤝 Connect / About

I build AI + Chinese-teaching tools in public. If any of this is useful, the best way to follow along is a ⭐ and a follow:

- ⭐ **[Star this repo](https://github.com/shengdabai/trae-projects)** and **[follow @shengdabai](https://github.com/shengdabai)**

More from me, if you teach or learn Chinese:

- 📚 [everything-claude-code](https://github.com/shengdabai/everything-claude-code) — my Claude Code setup, skills, and workflows
- 🎓 [gaokao-study-materials](https://github.com/shengdabai/gaokao-study-materials) — gaokao prep resources
- 🇨🇳 [chinese-learning-app](https://github.com/shengdabai/chinese-learning-app) — the standalone Chinese learning app

*(Sibling repos above; if a link 404s it just isn't public yet.)*

## License

No license file yet — all rights reserved by default. Open an issue if you'd like to reuse a piece and we'll sort it out.

---

# 中文

> 一个小而实在的学习工具工作台 —— AI 高考辅导、中英学习应用、DIY 的 Claude 式命令行 Agent —— 全部用 [Trae](https://www.trae.ai/) 在公开环境中构建。

[English](#-trae-projects) | 中文

我是 Tony（盛）—— 一名拥有 6000+ 学员的中文老师，在公开环境里构建 AI + 中文教学工具。这个仓库是这些实验的草稿台：每个文件夹都是一个我真正在用或测试过的独立工具，对它"能做什么、还不能做什么"保持诚实。

## 为什么有这个仓库

大规模教语言会反复遇到同样的摩擦：刷真题、给任意句子快速标拼音和分词、把便宜的大模型接进终端。与其做一个大应用，不如做**一组聚焦的学习应用和 Agent**—— 小到能一口气读完，又实用到值得留下来。

## ✨ 项目一览

| 项目 | 它做什么 | 目录 |
|---|---|---|
| 🎓 **高考 AI 备考助手** | 个性化高考复习。Python 脚本把你的历年真题 PDF 提取成纯文本，配合一份"苏格拉底式辅导员"系统提示词，把任意聊天模型（Trae / Claude / ChatGPT）变成只引导、不直接喂答案的教练。 | [`Gaokao-AI-Study/`](Gaokao-AI-Study/) |
| 🇨🇳 **中文学习应用** | 本地运行的 Node + Express 网页应用：英译中，并为每个词/字逐一标注拼音和分词。翻译通过 `@xenova/transformers` 完全离线运行，分词用 `jieba`，注音用 `pinyin-pro`。 | [`zh-learning-app/`](zh-learning-app/) |
| 🤖 **Claude Code（命令行 Agent）** | DIY 的终端聊天客户端，把 Claude-Code 式的对话循环接到便宜的国产大模型 —— Kimi（月之暗面）和 GLM（智谱）—— 走它们的 OpenAI 兼容接口。附带一个 API Key 安全检查脚本。 | [`Claude Code/`](Claude%20Code/) |
| ⚙️ **bin** | 极简启动脚本：`claude` 通过 [`@musistudio/claude-code-router`](https://github.com/musistudio/claude-code-router) 路由；`kimi` 把月之暗面接口接进去。 | [`bin/`](bin/) |
| 📚 **Claude Skills 合集** | 精选的 12 个第三方 Claude Skills 仓库，以 git submodule 形式收录作参考（superpowers、agent-skill-creator、awesome-claude-skills 等）。 | [`claude skillsmp/`](claude%20skillsmp/) |

## 🧱 技术栈

- **Python** —— `pdfplumber` 做 PDF 提取；纯 `urllib` 的大模型客户端（零重依赖）
- **Node.js** —— Express 5，ES 模块
- **本地 AI** —— `@xenova/transformers`（进程内翻译，无需 API Key）
- **中文 NLP** —— `nodejieba` / `@node-rs/jieba` 分词，`pinyin-pro` 注音标调
- **大模型接口** —— 月之暗面（Kimi）、智谱（GLM）、OpenAI 兼容路由
- **构建工具** —— [Trae](https://www.trae.ai/) AI IDE

## 🚀 快速开始

```bash
git clone https://github.com/shengdabai/trae-projects
cd trae-projects
git submodule update --init --recursive   # 仅当你需要 Claude Skills 合集时
```

每个工具都能单独运行，挑一个：

**🎓 高考 AI 备考助手**（Python）
```bash
cd Gaokao-AI-Study
pip install -r requirements.txt
# 把历年真题 PDF 放进 knowledge_base/papers/，然后：
python3 src/ingest_papers.py
# 最后把 AI_TUTOR.md 粘贴进你的聊天模型，激活辅导员
```

**🇨🇳 中文学习应用**（Node）
```bash
cd zh-learning-app
npm install
npm start          # 服务运行在 http://localhost:3000
# POST /api/translate { "english": "hello world", "granularity": "word" }
```
> 首次运行会把翻译模型下载到本地，之后即可离线运行。

**🤖 Claude Code 命令行 Agent**（Python / Node）
```bash
export MOONSHOT_API_KEY=...   # 或 ZHIPUAI_API_KEY=...
node "Claude Code/claudecc.js" --provider=kimi   # 或 --provider=glm
```

## 🗺️ 状态

这是一个活跃的、公开构建中的工作台 —— 难免有粗糙之处。

- ✅ **高考 AI 备考助手** —— 可用：PDF 提取 + 辅导员提示词
- ✅ **中文学习应用** —— 可用：离线英译中 + 拼音 + 分词，含限流和输入校验
- ✅ **Claude Code 命令行 Agent** —— 可用：Kimi + GLM 对话循环
- 🧪 **bin 启动脚本** —— 好用但极简
- 📦 **Claude Skills 合集** —— 参考用 submodule，不在此仓库维护

## 🤝 关注 / 关于

我在公开环境构建 AI + 中文教学工具。如果觉得有用，最好的关注方式就是点个 ⭐ 和 follow：

- ⭐ **[Star 本仓库](https://github.com/shengdabai/trae-projects)** 并 **[关注 @shengdabai](https://github.com/shengdabai)**

如果你教中文或学中文，还有这些：

- 📚 [everything-claude-code](https://github.com/shengdabai/everything-claude-code) —— 我的 Claude Code 配置、skills 与工作流
- 🎓 [gaokao-study-materials](https://github.com/shengdabai/gaokao-study-materials) —— 高考备考资源
- 🇨🇳 [chinese-learning-app](https://github.com/shengdabai/chinese-learning-app) —— 独立版中文学习应用

*（以上为同系列仓库；若链接 404，仅表示它尚未公开。）*

## 许可

暂无 license 文件 —— 默认保留所有权利。如果你想复用其中某部分，欢迎开 issue 一起商量。
