import { AgentPreset } from '../types';

export type RuntimeAgent = {
  id: string;
  name: string;
  description: string;
  systemInstruction: string;
  model: string;
  tools: string[];
};

type RuntimeAgentsResponse = { agents: RuntimeAgent[] };
type StreamEvent =
  | { type: 'status'; status: string; model: string }
  | { type: 'token'; text: string }
  | { type: 'done'; sessionId: string; model: string }
  | { type: 'error'; error: string };

const runtimeUrl = import.meta.env.VITE_FASTGEM_RUNTIME_URL || 'http://localhost:8000';

export function runtimeAgentToPreset(agent: RuntimeAgent): AgentPreset {
  return {
    id: agent.id,
    name: agent.name,
    soulFile: 'SOUL.md',
    avatarEmoji: 'https://i.imgur.com/EdJkjqY.png',
    description: agent.description,
    model: agent.model,
    systemInstruction: agent.systemInstruction,
    tools: agent.tools,
    samplePrompts: [],
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${runtimeUrl}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || `FastGem runtime request failed (${response.status})`);
  return body as T;
}

export async function listAgents() {
  const result = await request<RuntimeAgentsResponse>('/api/agents');
  return result.agents;
}

export async function createAgent(input: Pick<RuntimeAgent, 'name' | 'description'> & Partial<Pick<RuntimeAgent, 'systemInstruction' | 'model' | 'tools'>>) {
  const result = await request<{ agent: RuntimeAgent }>('/api/agents', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return result.agent;
}

export async function runAgent(agentId: string, prompt: string, sessionId?: string) {
  return request<{ text: string; sessionId: string; model: string }>(`/api/agents/${agentId}/runs`, {
    method: 'POST',
    body: JSON.stringify({ prompt, sessionId }),
  });
}

export async function streamAgent(
  agentId: string,
  prompt: string,
  sessionId: string | undefined,
  onEvent: (event: StreamEvent) => void,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({ prompt });
  if (sessionId) params.set('sessionId', sessionId);
  const response = await fetch(`${runtimeUrl}/api/agents/${encodeURIComponent(agentId)}/runs/stream?${params}`, {
    headers: { Accept: 'text/event-stream' },
    signal,
  });
  if (!response.ok || !response.body) {
    let message = `FastGem streaming request failed (${response.status})`;
    try {
      const body = await response.json();
      message = body.error || message;
    } catch {
      // Keep the status-based message when the server did not return JSON.
    }
    throw new Error(message);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let currentEvent = 'message';

  const consume = (block: string) => {
    let data = '';
    for (const line of block.split('\n')) {
      if (line.startsWith('event:')) currentEvent = line.slice(6).trim();
      if (line.startsWith('data:')) data += line.slice(5).trim();
    }
    if (!data) return;
    const payload = JSON.parse(data) as Record<string, unknown>;
    if (currentEvent === 'status') onEvent({ type: 'status', status: String(payload.status || 'running'), model: String(payload.model || '') });
    if (currentEvent === 'token') onEvent({ type: 'token', text: String(payload.text || '') });
    if (currentEvent === 'done') onEvent({ type: 'done', sessionId: String(payload.sessionId || ''), model: String(payload.model || '') });
    if (currentEvent === 'error') onEvent({ type: 'error', error: String(payload.error || 'Streaming run failed') });
    currentEvent = 'message';
  };

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
    const blocks = buffer.split('\n\n');
    buffer = blocks.pop() || '';
    blocks.forEach(consume);
    if (done) break;
  }
  if (buffer.trim()) consume(buffer);
}
