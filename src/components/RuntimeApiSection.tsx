import React, { useState } from 'react';
import { BookOpen, Copy, Check } from 'lucide-react';

interface RuntimeApiSectionProps {
  onOpenDocs: () => void;
}

export const RuntimeApiSection: React.FC<RuntimeApiSectionProps> = ({ onOpenDocs }) => {
  const [copied, setCopied] = useState(false);

  const endpoints = `GET  /health
GET  /api/agents
POST /api/agents
GET  /api/agents/:agentId/sessions
POST /api/agents/:agentId/sessions
POST /api/agents/:agentId/runs
GET  /api/agents/:agentId/runs/stream`;

  const handleCopy = () => {
    navigator.clipboard.writeText(endpoints);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-24 px-6 bg-[#dfe5ee] dark:bg-[#0b1326] transition-colors" id="runtime-api">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy */}
          <div className="lg:col-span-6 space-y-5">
            <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest block font-extrabold">
              Runtime API
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] dark:text-[#dae2fd] tracking-tight">
              A small API surface with room to grow.
            </h2>
            <p className="text-[#2d3c52] dark:text-[#bacac5] text-base md:text-lg leading-relaxed">
              The FastGem runtime exposes a simple HTTP interface for connecting external clients and services.
            </p>
            <p className="text-[#4b5b73] dark:text-[#94a3b8] text-sm sm:text-base leading-relaxed">
              Use the API to list agents, create sessions, submit prompts, and connect your own interface to the runtime.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenDocs}
                className="px-6 py-3.5 btn-spectrum-outline font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl inline-flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-[#b45309] dark:text-[#f59e0b]" />
                Read the Runtime API
              </button>
            </div>
          </div>

          {/* Right endpoints box (crisp dark terminal surface in both themes) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden bg-[#141c2f] dark:bg-[#060e20] border border-[#2b3850] shadow-xl">
              <div className="h-11 bg-[#1e293b] px-4 flex items-center justify-between border-b border-[#2b3850]">
                <span className="font-mono text-xs text-[#f1f5f9] font-medium">
                  FastGem HTTP Endpoints
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#cbd5e1] hover:text-[#f59e0b] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-6 font-mono text-xs sm:text-sm text-[#38bdf8] overflow-x-auto leading-loose">
                {endpoints}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
