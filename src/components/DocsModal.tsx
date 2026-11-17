import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Terminal, Shield, Code, Sparkles } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [activeLang, setActiveLang] = useState<'curl' | 'ts' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const codeSnippets = {
    curl: `curl -X POST https://api.fastgem.ai/v1/agent/run \\
  -H "Authorization: Bearer $GEMINI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent": "researcher",
    "prompt": "Summarize the latest Gemini 3.6 benchmarks",
    "model": "gemini-3.1-pro",
    "tools": ["web_fetch", "memory_search"]
  }'`,
    ts: `import { FastGemClient } from '@fastgem/sdk';

const client = new FastGemClient({
  apiKey: process.env.GEMINI_API_KEY,
});

const result = await client.agent.run({
  agentId: 'researcher',
  prompt: 'Summarize the latest Gemini 3.6 benchmarks',
  model: 'gemini-3.1-pro',
});

console.log(result.response);`,
    python: `from fastgem import FastGem

client = FastGem(api_key=os.getenv("GEMINI_API_KEY"))

response = client.agent.run(
    agent_id="researcher",
    prompt="Summarize the latest Gemini 3.6 benchmarks",
    model="gemini-3.1-pro"
)

print(response.text)`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b1326] border border-[#ff6b00]/40 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(255,107,0,0.15)]">
        {/* Header */}
        <div className="h-16 bg-[#131b2e] border-b border-[#2b3850]/60 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ff6b00]/20 border border-[#ff6b00]/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#ff6b00]" />
            </div>
            <h2 className="text-lg font-bold text-[#dae2fd]">
              FastGem REST API Reference & Architecture
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="text-[#bacac5] hover:text-[#dae2fd] p-2 rounded-lg hover:bg-[#171f33] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[#bacac5] text-sm">
          {/* Endpoint badge */}
          <div className="p-4 bg-[#131b2e] rounded-xl border border-[#2b3850]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#ff6b00] text-white font-mono font-bold text-xs uppercase rounded">
                POST
              </span>
              <code className="font-mono text-sm text-[#dae2fd]">/v1/agent/run</code>
            </div>
            <span className="font-mono text-xs text-[#ff6b00] dark:text-[#ff8c00] bg-[#ff6b00]/10 px-2.5 py-1 rounded border border-[#ff6b00]/20">
              Latency &lt; 20ms
            </span>
          </div>

          {/* Language Tabs & Snippet */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLang('curl')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs uppercase transition-colors cursor-pointer ${
                    activeLang === 'curl' ? 'bg-[#ff6b00] text-white font-bold' : 'bg-[#171f33] text-[#bacac5]'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveLang('ts')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs uppercase transition-colors cursor-pointer ${
                    activeLang === 'ts' ? 'bg-[#ff6b00] text-white font-bold' : 'bg-[#171f33] text-[#bacac5]'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setActiveLang('python')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs uppercase transition-colors cursor-pointer ${
                    activeLang === 'python' ? 'bg-[#ff6b00] text-white font-bold' : 'bg-[#171f33] text-[#bacac5]'
                  }`}
                >
                  Python
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 font-mono text-xs text-[#ff6b00] dark:text-[#ff8c00] hover:underline cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Code'}
              </button>
            </div>

            <pre className="p-4 bg-[#060e20] rounded-xl border border-[#2b3850]/60 font-mono text-xs text-[#ff6b00] dark:text-[#ff8c00] overflow-x-auto whitespace-pre">
              {codeSnippets[activeLang]}
            </pre>
          </div>

          {/* Environment Variables Specs */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#dae2fd] text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ff6b00]" /> Required Environment Variables
            </h3>
            <div className="bg-[#131b2e] rounded-xl border border-[#2b3850]/60 p-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#2b3850]/40 pb-2">
                <span className="text-[#ff6b00] dark:text-[#ff8c00]">GEMINI_API_KEY</span>
                <span className="text-[#bacac5]">Google Gemini API key for model inference</span>
              </div>
              <div className="flex justify-between border-b border-[#2b3850]/40 pb-2">
                <span className="text-[#ff6b00] dark:text-[#ff8c00]">APP_URL</span>
                <span className="text-[#bacac5]">Cloud Run deployment service URL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#ff6b00] dark:text-[#ff8c00]">DATABASE_URL</span>
                <span className="text-[#bacac5]">Optional SQLite path or Firestore project ID</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#131b2e] border-t border-[#2b3850]/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#ff6b00] text-white font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#ea580c] transition-all cursor-pointer shadow-md"
          >
            Close API Docs
          </button>
        </div>
      </div>
    </div>
  );
};
