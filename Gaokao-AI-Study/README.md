# 🎓 高考 AI 备考助手 (Gaokao-AI-Study)

这是一个基于 AI 的个人化高考复习系统，灵感来源于 `chenran818/CFP-Study`。它利用 AI 的苏格拉底式教学法，结合你提供的真题资料，帮助你进行深度复习。

## 🚀 快速开始

### 第一步：准备资料
由于“Get笔记”没有公开 API，你需要将资料手动导出：
1.  从“Get笔记”或其他来源下载你的历年真题 PDF、解析 PDF。
2.  将这些文件放入 `knowledge_base/papers/` 文件夹中。

### 第二步：导入知识库
打开终端，运行以下命令，让系统“读取”你的试卷：

```bash
# 1. 安装依赖 (首次运行需要)
pip install -r requirements.txt

# 2. 运行解析脚本
python3 src/ingest_papers.py
```

脚本运行完成后，你的试卷内容会被提取到 `knowledge_base/processed_text/` 中，方便 AI 读取。

### 第三步：开始 AI 辅导
1.  复制 `AI_TUTOR.md` 文件的全部内容。
2.  打开 Trae 的 AI 聊天窗口（或 Claude/ChatGPT）。
3.  **粘贴**刚才复制的内容，发送给 AI。
4.  现在，AI 已经变身为你的“金牌辅导员”了！你可以尝试发送：
    *   “`/quiz 导数`” —— 测验一下。
    *   “`/analyze` (粘贴一道错题)” —— 帮你分析。
    *   “`/plan`” —— 制定今日计划。

### 第四步：追踪进度
每次复习完，记得打开 `progress/tracker.md`，更新你对相关知识点的掌握程度（🔴/🟡/🟢）。

## 📂 目录结构

*   `AI_TUTOR.md`: **核心指令**。发送给 AI，激活它的辅导员人格。
*   `knowledge_base/`:
    *   `papers/`: 存放你的原始 PDF 试卷。
    *   `processed_text/`: 脚本自动生成的文本文件（AI 读这个）。
*   `progress/`:
    *   `tracker.md`: 你的复习进度仪表盘。
*   `sessions/`: (可选) 你可以把每天的和 AI 的精彩对话保存到这里，方便复习。
