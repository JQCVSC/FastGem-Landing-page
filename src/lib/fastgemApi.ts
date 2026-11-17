export type RuntimeAgent = {
  id: string;
  name: string;
  description: string;
  systemInstruction: string;
  model: string;
  tools: string[];
};

const runtimeUrl = import.meta.env.VITE_FASTGEM_RUNTIME_URL || 'http://localhost:8000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${runtimeUrl}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || `FastGem runtime request failed (${response.status})`);
  return body as T;
}

export async function runAgent(agentId: string, prompt: string, sessionId?: string) {
  return request<{ text: string; sessionId: string; model: string }>(`/api/agents/${agentId}/runs`, {
    method: 'POST',
    body: JSON.stringify({ prompt, sessionId }),
  });
}
