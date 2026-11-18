import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Shield } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'curl' | 'ts'>('curl');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const codeSnippets = {
    curl: `# 1. Check runtime health
curl http://localhost:8000/health

# 2. Create a session for an agent
curl -X POST http://localhost:8000/api/agents/researcher/sessions \\
  -H "Content-Type: application/json" \\
  -d '{ "title": "Architecture Review" }'

# 3. Submit a prompt run
curl -X POST http://localhost:8000/api/agents/researcher/runs \\
  -H "Content-Type: application/json" \\
  -d '{
    "sessionId": "session-123",
    "prompt": "Summarize the latest Gemini session notes."
  }'`,
    ts: `const runtimeUrl = import.meta.env.VITE_FASTGEM_RUNTIME_URL || 'http://localhost:8000';

// List configured agents
const agentsRes = await fetch(\`\${runtimeUrl}/api/agents\`);
const agents = await agentsRes.json();

// Run a prompt against an agent session
const runRes = await fetch(\`\${runtimeUrl}/api/agents/researcher/runs\`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionId: 'session-123',
    prompt: 'Summarize the latest Gemini session notes.'
  })
});

const result = await runRes.json();
console.log(result);`
  };

  const endpoints = [
    { method: 'GET', path: '/health', desc: 'Inspect runtime status' },
    { method: 'GET', path: '/api/agents', desc: 'List configured agents' },
    { method: 'POST', path: '/api/agents', desc: 'Create a new agent' },
    { method: 'GET', path: '/api/agents/:agentId/sessions', desc: 'List sessions for an agent' },
    { method: 'POST', path: '/api/agents/:agentId/sessions', desc: 'Start a new session' },
    { method: 'POST', path: '/api/agents/:agentId/runs', desc: 'Submit a prompt run' },
    { method: 'GET', path: '/api/agents/:agentId/runs/stream', desc: 'Stream agent events' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#dfe5ee] dark:bg-[#0b1326] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="h-16 bg-[#eaeff6] dark:bg-[#131b2e] border-b border-[#bcc8da] dark:border-[#2b3850] px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb]/12 dark:bg-[#3b82f6]/15 border border-[#2563eb]/25 dark:border-[#3b82f6]/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#1d4ed8] dark:text-[#3b82f6]" />
            </div>
            <h2 className="text-lg font-bold text-[#0f172a] dark:text-[#dae2fd]">
              FastGem Runtime API Reference
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="text-[#4b5b73] dark:text-[#bacac5] hover:text-[#0f172a] dark:hover:text-[#dae2fd] p-2 rounded-lg hover:bg-[#dce3ed] dark:hover:bg-[#171f33] transition-colors cursor-pointer"
            aria-label="Close API Reference"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[#2d3c52] dark:text-[#bacac5] text-sm">
          {/* Endpoints List */}
          <div>
            <h3 className="font-bold text-[#0f172a] dark:text-[#dae2fd] text-base mb-3">
              HTTP Endpoints
            </h3>
            <div className="bg-[#eaeff6] dark:bg-[#131b2e] rounded-xl border border-[#bcc8da] dark:border-[#2b3850] divide-y divide-[#bcc8da]/70 dark:divide-[#2b3850]/60">
              {endpoints.map((ep) => (
                <div key={`${ep.method}-${ep.path}`} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 font-mono font-bold text-[11px] rounded ${
                      ep.method === 'GET'
                        ? 'bg-[#047857]/12 dark:bg-[#10b981]/15 text-[#047857] dark:text-[#10b981]'
                        : 'bg-[#b45309]/12 dark:bg-[#f59e0b]/15 text-[#b45309] dark:text-[#f59e0b]'
                    }`}>
                      {ep.method}
                    </span>
                    <code className="font-mono text-xs sm:text-sm text-[#0f172a] dark:text-[#dae2fd]">{ep.path}</code>
                  </div>
                  <span className="text-xs text-[#4b5b73] dark:text-[#94a3b8]">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Language Tabs & Snippet */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('curl')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase transition-colors cursor-pointer ${
                    activeTab === 'curl'
                      ? 'bg-[#2563eb] text-white font-bold'
                      : 'bg-[#eaeff6] dark:bg-[#171f33] text-[#2d3c52] dark:text-[#bacac5] border border-[#bcc8da] dark:border-transparent'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveTab('ts')}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase transition-colors cursor-pointer ${
                    activeTab === 'ts'
                      ? 'bg-[#2563eb] text-white font-bold'
                      : 'bg-[#eaeff6] dark:bg-[#171f33] text-[#2d3c52] dark:text-[#bacac5] border border-[#bcc8da] dark:border-transparent'
                  }`}
                >
                  TypeScript (fetch)
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 font-mono text-xs text-[#b45309] dark:text-[#f59e0b] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#047857] dark:text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>

            <pre className="p-4 bg-[#141c2f] dark:bg-[#060e20] rounded-xl border border-[#2b3850] font-mono text-xs text-[#e2e8f0] overflow-x-auto whitespace-pre leading-relaxed">
              {codeSnippets[activeTab]}
            </pre>
          </div>

          {/* Environment Variables Specs */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#0f172a] dark:text-[#dae2fd] text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#b45309] dark:text-[#f59e0b]" /> Configuration Environment Variables
            </h3>
            <div className="bg-[#eaeff6] dark:bg-[#131b2e] rounded-xl border border-[#bcc8da] dark:border-[#2b3850] p-4 space-y-3 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-[#bcc8da]/70 dark:border-[#2b3850]/60 pb-2">
                <span className="text-[#b45309] dark:text-[#f59e0b] font-semibold">GEMINI_API_KEY</span>
                <span className="text-[#2d3c52] dark:text-[#bacac5]">Google Gemini API key used by the runtime</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-[#bcc8da]/70 dark:border-[#2b3850]/60 pb-2">
                <span className="text-[#b45309] dark:text-[#f59e0b] font-semibold">FASTGEM_MODEL</span>
                <span className="text-[#2d3c52] dark:text-[#bacac5]">Default Gemini model configured in runtime</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-[#b45309] dark:text-[#f59e0b] font-semibold">VITE_FASTGEM_RUNTIME_URL</span>
                <span className="text-[#2d3c52] dark:text-[#bacac5]">Runtime URL connected to the React console (e.g. http://localhost:8000)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#eaeff6] dark:bg-[#131b2e] border-t border-[#bcc8da] dark:border-[#2b3850] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 btn-spectrum text-white font-mono text-xs font-bold uppercase rounded-xl transition-all cursor-pointer shadow-md"
          >
            Close Runtime API
          </button>
        </div>
      </div>
    </div>
  );
};
