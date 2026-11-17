export interface AgentPreset {
  id: string;
  name: string;
  soulFile: string;
  avatarEmoji: string;
  description: string;
  model: 'gemini-3.6-flash' | 'gemini-3.1-pro' | 'gemini-2.5-flash' | 'gemini-2.5-pro' | string;
  systemInstruction: string;
  tools: string[];
  samplePrompts: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface DeployEnv {
  name: string;
  support: string;
  description: string;
  badgeType: 'native' | 'supported' | 'official' | 'enterprise';
}

export interface FeatureCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tag: string;
  details: string[];
}
