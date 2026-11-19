export interface AgentPreset {
  id: string;
  name: string;
  soulFile: string;
  avatarEmoji: string;
  description: string;
  model: string;
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
  subtitle: string;
  description: string;
  tag: string;
  details: string[];
}
