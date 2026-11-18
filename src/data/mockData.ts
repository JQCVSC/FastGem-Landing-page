import { AgentPreset, FaqItem, FeatureCard } from '../types';

export const AGENT_PRESETS: AgentPreset[] = [
  {
    id: 'researcher',
    name: 'Research Assistant',
    soulFile: 'SOUL.md',
    avatarEmoji: 'https://i.imgur.com/GZVnWPR.png',
    description: 'Focused on structured research synthesis, document summaries, and technical analysis.',
    model: 'gemini-3.8-flash',
    systemInstruction: 'You are a focused technical researcher powered by Google Gemini. You synthesize information clearly, track session context, and output well-structured markdown responses.',
    tools: ['session_context', 'markdown_export'],
    samplePrompts: [
      'Summarize the trade-offs between stateful sessions and stateless prompt calls.',
      'Outline a clear architecture for a Gemini-powered internal knowledge assistant.',
      'Compare structured outputs vs streaming text for an agent dashboard.'
    ]
  },
  {
    id: 'code-architect',
    name: 'TypeScript Helper',
    soulFile: 'SOUL.md',
    avatarEmoji: 'https://i.imgur.com/EdJkjqY.png',
    description: 'Configured for TypeScript API design, Express route patterns, and debugging.',
    model: 'gemini-3.8-flash',
    systemInstruction: 'You are a TypeScript and Express engineering assistant. You write clean, strongly typed code and keep architecture straightforward and inspectable.',
    tools: ['session_context', 'schema_helper'],
    samplePrompts: [
      'Draft an Express endpoint handler for submitting an agent run.',
      'Show how to persist agent session messages cleanly in a local JSON store.',
      'Write a TypeScript client wrapper for GET /api/agents and POST /api/agents/:agentId/runs.'
    ]
  },
  {
    id: 'support-agent',
    name: 'Support & Docs Agent',
    soulFile: 'SOUL.md',
    avatarEmoji: 'https://i.imgur.com/SExgjMf.png',
    description: 'Session-aware assistant for customer support, onboarding, and internal workflows.',
    model: 'gemini-3.8-flash',
    systemInstruction: 'You are a helpful product support specialist. Answer questions clearly using the session history and keep explanations practical and concise.',
    tools: ['session_context'],
    samplePrompts: [
      'How do I configure VITE_FASTGEM_RUNTIME_URL for local development?',
      'What HTTP endpoints does the FastGem runtime expose?',
      'How does FastGem persist agent sessions during development?'
    ]
  }
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    id: 'agent-workspaces',
    emoji: '🤖',
    title: 'Agent Workspaces',
    subtitle: 'Configure agents around a clear purpose',
    description: 'Create focused agents for research, coding, customer support, analysis, or internal workflows. Each agent can have its own instructions, model, and operating context.',
    tag: 'Feature 01',
    details: [
      'Dedicated name, description, and system instructions per agent',
      'Independent model configuration per workspace',
      'Clean separation between agent definitions and sessions'
    ]
  },
  {
    id: 'persistent-sessions',
    emoji: '💬',
    title: 'Persistent Sessions',
    subtitle: 'Keep conversations connected',
    description: 'FastGem persists agent sessions locally so conversations can continue across requests instead of starting from zero every time.',
    tag: 'Feature 02',
    details: [
      'Session history stored locally by agent ID',
      'Resume multi-turn conversations in Agent Studio or via API',
      'Inspectable session state across requests'
    ]
  },
  {
    id: 'gemini-native',
    emoji: '⚡',
    title: 'Gemini-Native Execution',
    subtitle: 'Designed around Google Gemini',
    description: 'FastGem uses Google’s Gemini API directly through the official Gemini SDK. Choose the model that fits your agent’s task and keep the execution path clear and inspectable.',
    tag: 'Feature 03',
    details: [
      'Direct integration via the official Google Gemini SDK',
      'Configurable via FASTGEM_MODEL (defaulting to Gemini 2.5 Flash)',
      'Zero heavy abstraction layers hiding prompt execution'
    ]
  },
  {
    id: 'runtime-api',
    emoji: '🔌',
    title: 'Runtime API',
    subtitle: 'Use the console or bring your own interface',
    description: 'Run agents through the FastGem dashboard or call the runtime from another application using a simple HTTP API.',
    tag: 'Feature 04',
    details: [
      'Clean REST endpoints for agents, sessions, and runs',
      'Health check endpoint at GET /health',
      'Connect external frontends, scripts, or internal services'
    ]
  },
  {
    id: 'streaming-foundation',
    emoji: '📡',
    title: 'Streaming Foundation',
    subtitle: 'Built for responsive agent experiences',
    description: 'FastGem includes a streaming endpoint foundation for delivering agent events to clients as work progresses.',
    tag: 'Feature 05',
    details: [
      'Dedicated GET /api/agents/:agentId/runs/stream endpoint',
      'Designed for progressive response delivery',
      'Foundation for real-time console and client UI updates'
    ]
  },
  {
    id: 'local-first-persistence',
    emoji: '💾',
    title: 'Local-First Persistence',
    subtitle: 'Start locally and control your data',
    description: 'The current runtime stores agents and sessions locally in a straightforward data file. It is easy to inspect during development and can evolve toward a production database as your deployment grows.',
    tag: 'Feature 06',
    details: [
      'Human-inspectable local data file for rapid iteration',
      'Zero database setup required to run locally',
      'Clear boundary to swap in a durable database for production'
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is FastGem?',
    answer: 'FastGem is a lightweight runtime and web control plane for building, configuring, and operating Google Gemini agents.'
  },
  {
    id: 'faq-2',
    question: 'Is FastGem an AI model?',
    answer: 'No. FastGem is the runtime and control plane. It connects to Google Gemini through the Gemini API.'
  },
  {
    id: 'faq-3',
    question: 'Can I use FastGem without the website?',
    answer: 'Yes. The runtime exposes HTTP endpoints that can be used by your own application.'
  },
  {
    id: 'faq-4',
    question: 'Does FastGem save sessions?',
    answer: 'Yes. The current runtime persists agents and sessions locally for development.'
  },
  {
    id: 'faq-5',
    question: 'Does FastGem support production authentication?',
    answer: 'Not yet. The current website sign-in screen is a demonstration flow. Production authentication is planned as a separate identity layer.'
  },
  {
    id: 'faq-6',
    question: 'Can I self-host FastGem?',
    answer: 'Yes. The current runtime is designed to run locally or on infrastructure you control. Production deployment requires adding the appropriate security, persistence, and operational controls.'
  },
  {
    id: 'faq-7',
    question: 'Does FastGem support tools?',
    answer: 'The console and runtime are structured to support tools, but secure sandboxed tool execution is still part of the roadmap.'
  },
  {
    id: 'faq-8',
    question: 'Which Gemini models are supported?',
    answer: 'FastGem uses the model configured through FASTGEM_MODEL, with Gemini 2.5 Flash as the current default in the runtime. Other compatible Gemini models can be configured as the implementation evolves.'
  }
];
