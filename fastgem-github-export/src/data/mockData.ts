import { AgentPreset, FaqItem, DeployEnv, FeatureCard } from '../types';

export const AGENT_PRESETS: AgentPreset[] = [
  {
    id: 'researcher',
    name: 'SOUL.md — Tech Researcher',
    soulFile: 'SOUL.md',
    avatarEmoji: '🤖',
    description: 'Specialized in deep multi-source technical analysis and literature review.',
    model: 'gemini-3.1-pro',
    systemInstruction: 'You are an autonomous technical researcher powered by Gemini. You summarize web resources, analyze schemas, and output clean markdown reports.',
    tools: ['web_fetch', 'memory_search', 'pdf_reader'],
    samplePrompts: [
      'Compare Gemini 3.6 Flash vs 3.1 Pro economics for agent loops.',
      'Analyze the latency impact of zero-copy context caching.',
      'Generate a summary of autonomous agent benchmark results.'
    ]
  },
  {
    id: 'code-architect',
    name: 'SOUL.md — Code Architect',
    soulFile: 'SOUL.md',
    avatarEmoji: '⚡',
    description: 'Engineered for sub-second function calling, refactoring, and sandbox execution.',
    model: 'gemini-3.6-flash',
    systemInstruction: 'You are an elite software architect agent. You write strict TypeScript/Go code, enforce zero-dependency paradigms, and generate automated tests.',
    tools: ['sandbox_bash', 'code_ast', 'git_commit'],
    samplePrompts: [
      'Build a lightweight Express route handler for agent webhook streaming.',
      'Write a zero-dependency LRU cache in TypeScript.',
      'Refactor this function call schema to adhere to OpenAPI 3.1.'
    ]
  },
  {
    id: 'discord-mod',
    name: 'SOUL.md — Community Bot',
    soulFile: 'SOUL.md',
    avatarEmoji: '💬',
    description: 'Channel-isolated assistant with perfect thread recall and tool routing.',
    model: 'gemini-3.6-flash',
    systemInstruction: 'You are a helpful community discord moderator. You answer questions accurately with context from MEMORY.md.',
    tools: ['discord_api', 'faq_lookup', 'ticket_router'],
    samplePrompts: [
      'How do I deploy FastGem on Firebase Cloud Functions?',
      'Is there an official Docker image available?',
      'Can FastGem store session logs in SQLite?'
    ]
  }
];

export const DEPLOY_ENVS: DeployEnv[] = [
  {
    name: 'Local (SQLite)',
    support: 'Native / Zero Config',
    description: 'Runs directly in-memory or on local disk with zero daemon dependencies. Ideal for quick dev loops.',
    badgeType: 'native'
  },
  {
    name: 'Firebase / Cloud Functions (Serverless)',
    support: 'Supported (Firestore Backend)',
    description: 'Auto-scales to zero. Stores session state and long-term memory seamlessly in Cloud Firestore.',
    badgeType: 'supported'
  },
  {
    name: 'Docker',
    support: 'Official Images Available',
    description: 'Pre-packaged container images on GitHub Container Registry (ghcr.io/fastgem-ai/fastgem).',
    badgeType: 'official'
  },
  {
    name: 'Kubernetes / Cloud Run',
    support: 'Enterprise Ready',
    description: 'High-availability cluster deployment with automatic load balancing and encrypted secret mounting.',
    badgeType: 'enterprise'
  }
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'agent-factory',
    emoji: '🤖',
    title: 'Agent Factory',
    description: 'Create and run many agents, each with its own SOUL.md personality, system instructions, memory, and tools. Per-agent model overrides and visual management dashboard.',
    tag: 'Multi-Agent',
    details: [
      'Per-agent custom SOUL.md personality files',
      'Individual tool permissions & sandbox boundary settings',
      'Visual web dashboard for live monitoring and manual override'
    ]
  },
  {
    id: 'gemini-engine',
    emoji: '⚡',
    title: 'Powered by Gemini 3 Engine',
    description: 'Toggle between Gemini 3.6 Flash, Gemini 3.1 Pro, Flash-Lite, and custom fine-tuned endpoints. Sub-second function calling, strict JSON schema validation, native multimodal inputs, and Flash economics.',
    tag: 'Performance',
    details: [
      'Sub-second function calling latency with Gemini 3.6 Flash & 3.1 Pro',
      'Native multimodal stream processor (vision, audio, video)',
      'Ultra-low token costs with Flash-Lite economics'
    ]
  },
  {
    id: 'connect-channels',
    emoji: '💬',
    title: 'Connect Any Channel',
    description: 'Bind Telegram, Discord, Slack, or custom webhooks per agent. Sessions stay isolated per channel and chat, so threads never bleed into each other.',
    tag: 'Integrations',
    details: [
      'First-class Telegram, Discord, and Slack bot drivers',
      'Isolated session state per channel ID',
      'Custom HTTP Webhooks for proprietary internal tools'
    ]
  },
  {
    id: 'tools-sandbox',
    emoji: '🛡️',
    title: 'Tools & Sandbox',
    description: 'Built-in web fetch, Firestore queries, and system tools. Run them in secure Docker containers or cloud functions with automatic workspace sync.',
    tag: 'Security',
    details: [
      'Ephemeral Docker container execution for untrusted code',
      'Built-in secure web scraping & search tools',
      'Instant workspace state synchronization'
    ]
  },
  {
    id: 'skills-plugins',
    emoji: '🧩',
    title: 'Skills & Plugins',
    description: 'Define custom tools via simple JSON schemas or Python/Go functions. Native support for Google AI Studio function declarations and REST endpoints.',
    tag: 'Extensibility',
    details: [
      'Declarative JSON schema plugin system',
      'Native AI Studio function declaration compatibility',
      'Auto-generation of OpenAPI spec callers'
    ]
  },
  {
    id: 'perfect-recall',
    emoji: '🧠',
    title: 'Perfect Recall Memory',
    description: 'Infinite session context backed by Gemini’s 2M+ token window. Long-term MEMORY.md auto-updated by background heartbeats, full session history, and a drop-in /api/v1/agent/run endpoint.',
    tag: 'State & Memory',
    details: [
      '2M+ token sliding window with zero context loss',
      'Automated background MEMORY.md compaction',
      'Drop-in REST endpoint for stateless agent calls'
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is FastGem?',
    answer: 'FastGem is a lightweight runtime engineered specifically to deploy and manage high-throughput Google Gemini AI agents.'
  },
  {
    id: 'faq-compare',
    question: 'How does FastGem compare to generic agent frameworks?',
    answer: 'Unlike heavy generic frameworks, FastGem is optimized natively for Gemini\'s 2M+ token context window, structured JSON outputs, and fast streaming performance.'
  },
  {
    id: 'faq-llm',
    question: 'Which LLM providers are supported?',
    answer: 'FastGem is natively optimized for Google Gemini models (including Gemini 3.6 Flash, Gemini 3.1 Pro, and Flash-Lite) via Google AI Studio and Vertex AI. Through OpenAI-compatible proxy routing and custom provider adapters, FastGem can also interface with OpenAI, Anthropic, and local Ollama models.'
  },
  {
    id: 'faq-sandbox',
    question: 'How is tool execution sandboxed?',
    answer: 'FastGem executes tools through an isolated execution engine. Code execution, shell commands, and custom scripts run inside lightweight, ephemeral Docker containers or gVisor-sandboxed microVMs with strict CPU/RAM cgroups, read-only root filesystems, and configurable network access policies.'
  },
  {
    id: 'faq-license',
    question: "What's the license?",
    answer: "FastGem is available under an open-source Source-Available Community License. You are free to inspect, modify, self-host, and deploy FastGem in your infrastructure without restrictions."
  },
  {
    id: 'faq-chat',
    question: 'How do end-users chat with my agents?',
    answer: 'End-users can interact with your agents through multiple pre-built channels: the included FastGem web chat UI / Agent Studio, multi-channel bot integrations (Telegram, Discord, Slack, and WhatsApp), or directly via clean REST and WebSocket APIs (/api/v1/agent/chat) embedded into your existing applications.'
  },
  {
    id: 'faq-selfhost',
    question: 'Can I host FastGem on my own server?',
    answer: 'Yes, FastGem can be self-hosted anywhere using Docker, Python/Node.js, or 1-click cloud deployments on Cloud Run, GCP, AWS, or DigitalOcean.'
  }
];
