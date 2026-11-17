<p align="center">
  <img src="https://i.imgur.com/hkRlTDp.png" alt="FastGem Logo" width="320" />
</p>

<h1 align="center">FastGem 💎</h1>

<p align="center">
  <strong>High-Throughput Gemini AI Agent Runtime</strong><br>
  Engine powered natively for Google Gemini 3.6 Flash, Gemini 3.1 Pro, and Flash-Lite.
</p>

<p align="center">
  <a href="https://github.com/JQCVSC/FastGem"><img src="https://img.shields.io/badge/GitHub-JQCVSC%2FFastGem-blue?logo=github" alt="GitHub Repository"></a>
  <a href="https://github.com/JQCVSC/FastGem#license"><img src="https://img.shields.io/badge/License-Community-orange.svg" alt="License"></a>
  <a href="https://pypi.org/project/fastgem"><img src="https://img.shields.io/badge/Python-3.9%2B-3776AB?logo=python" alt="Python"></a>
  <a href="https://github.com/JQCVSC/FastGem"><img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker" alt="Docker"></a>
</p>

---

## 🚀 What is FastGem?

**FastGem** is a lightweight, high-performance runtime engineered specifically to build, deploy, and manage autonomous Google Gemini AI agents. Designed with a native Python-first architecture, FastGem unlocks sub-second function calling, native structured JSON outputs, multi-source memory recall, and full 2M+ token context window utilization with minimal resource overhead.

---

## 📁 Workspace Architecture

A standard FastGem agent workspace is structured as follows:

```plaintext
my-agent/
├── SOUL.md              # System Instructions & Agent Persona
├── MEMORY.md            # Long-term persistent facts & state
├── tools/               # Custom Python execution tools
│   ├── web_search.py
│   └── custom_tool.py
└── fastgem.config.json   # Agent runtime configuration
```

---

## ✨ Key Features

- **⚡ Native Gemini 3 Engine**: Built from the ground up to leverage **Gemini 3.6 Flash**, **Gemini 3.1 Pro**, and **Flash-Lite**.
- **🧠 2M+ Context Window & Multi-Source Memory**: Seamlessly manage complex, multi-turn agent loops with persistent memory files (`SOUL.md`, `MEMORY.md`).
- **🛠 Sub-Second Tool Execution**: Execute custom Python scripts, terminal commands, web fetchers, and AST parsers in a safe sandbox.
- **🔌 Multi-Channel Integration**: Route agents to Discord, Telegram, Slack, Webhooks, or REST APIs effortlessly.
- **🐳 Enterprise Containerization**: Ready for 1-click deployments on Google Cloud Run, GCP, AWS, or DigitalOcean via Docker or PyPI.

---

## ⚙️ Environment Configuration

| Environment Variable | Description | Default | Required |
| :--- | :--- | :--- | :---: |
| `GEMINI_API_KEY` | Your Google Gemini API Key | — | **Yes** |
| `FASTGEM_MODEL` | Default model (`gemini-3.6-flash`, `gemini-3.1-pro`) | `gemini-3.6-flash` | No |
| `FASTGEM_PORT` | Port for FastGem runtime & channel webhooks | `8000` | No |
| `FASTGEM_LOG_LEVEL` | Logging verbosity level (`DEBUG`, `INFO`, `WARN`) | `INFO` | No |
| `TELEGRAM_BOT_TOKEN` | Token for Telegram Channel Gateway integration | — | No |
| `DISCORD_BOT_TOKEN` | Token for Discord Channel Gateway integration | — | No |

---

## 📦 Quick Start & Installation

### Option 1: Install via PyPI (Recommended)

```bash
pip install fastgem
fastgem init my-agent
cd my-agent
fastgem run
```

### Option 2: Curl Shell Installer

```bash
curl -fsSL https://raw.githubusercontent.com/JQCVSC/FastGem/main/install | bash
```

### Option 3: Docker Container

```bash
docker run -d -p 8000:8000 -e GEMINI_API_KEY=$GEMINI_API_KEY ghcr.io/jqcvsc/fastgem:latest
```

---

## 💻 SDK Usage Example

### Python SDK & Channel Gateway

```python
import os
from fastgem import FastGem, FastGemChannel

# 1. Initialize FastGem agent client
client = FastGem(api_key=os.getenv("GEMINI_API_KEY"))

response = client.agent.run(
    agent_id="researcher",
    prompt="Summarize the latest Gemini 3.6 Flash benchmarks",
    model="gemini-3.6-flash"
)
print(response.text)

# 2. Bind Agent to Messaging Channels (Telegram, Discord, Slack)
gateway = FastGemChannel(agent_id="researcher")
gateway.bind_webhook(platform="telegram", bot_token=os.getenv("TELEGRAM_BOT_TOKEN"))
gateway.bind_webhook(platform="discord", bot_token=os.getenv("DISCORD_BOT_TOKEN"))
gateway.listen(port=8000)
```

### TypeScript SDK

```typescript
import { FastGemClient } from '@fastgem/sdk';

const client = new FastGemClient({
  apiKey: process.env.GEMINI_API_KEY,
});

const result = await client.agents.run({
  agentId: 'researcher',
  prompt: 'Analyze high-throughput agent loops',
  model: 'gemini-3.1-pro',
});

console.log(result.response);
```

### cURL / REST API

```bash
curl -X POST https://api.fastgem.ai/v1/agent/run \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Summarize the latest Gemini 3.6 benchmarks",
    "model": "gemini-3.1-pro",
    "tools": ["web_fetch", "memory_search"]
  }'
```

---

## ❓ Frequently Asked Questions (FAQ)

### What is FastGem?
FastGem is a lightweight runtime engineered specifically to deploy and manage high-throughput Google Gemini AI agents.

### How does FastGem compare to generic agent frameworks?
Unlike heavy generic frameworks, FastGem is optimized natively for Gemini's 2M+ token context window, structured JSON outputs, and fast streaming performance.

### Can I host FastGem on my own server?
Yes! FastGem can be self-hosted anywhere using Docker, Python/Node.js, or 1-click cloud deployments on Cloud Run, GCP, AWS, or DigitalOcean.

---

## 📄 License

FastGem is open-source under the **Source-Available Community License**. Free to use, inspect, modify, and self-host for internal and commercial applications.

- **GitHub Repository**: [https://github.com/JQCVSC/FastGem](https://github.com/JQCVSC/FastGem)
