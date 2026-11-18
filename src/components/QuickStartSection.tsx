import React, { useState } from 'react';
import { Copy, Check, Info, Terminal as TerminalIcon, ExternalLink } from 'lucide-react';

interface QuickStartSectionProps {
  onOpenStudio: () => void;
}

export const QuickStartSection: React.FC<QuickStartSectionProps> = ({ onOpenStudio }) => {
  const [copiedBlock, setCopiedBlock] = useState<'runtime' | 'console' | null>(null);

  const runtimeCommands = `git clone https://github.com/JQCVSC/FastGem.git
cd FastGem

cp .env.example .env
# Add your GEMINI_API_KEY

npm install
npm run runtime`;

  const consoleCommands = `cd FastGem-Landing-page

cp .env.example .env
# Set VITE_FASTGEM_RUNTIME_URL=http://localhost:8000

npm install
npm run dev`;

  const handleCopy = (block: 'runtime' | 'console', text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBlock(block);
    setTimeout(() => setCopiedBlock(null), 2000);
  };

  return (
    <section className="w-full py-24 px-6 bg-[#d5dde8] dark:bg-[#060e20] border-y border-[#bcc8da] dark:border-[#3c4a46]/20 transition-colors" id="quick-start">
      <div className="max-w-[920px] mx-auto">
        <div className="text-center mb-12">
          <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest inline-block mb-3 font-extrabold">
            Quick Start
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] dark:text-[#dae2fd] tracking-tight">
            Run your first Gemini agent in minutes.
          </h2>
          <p className="text-[#2d3c52] dark:text-[#bacac5] text-base md:text-lg mt-4 leading-relaxed">
            FastGem is designed to be easy to run locally while the platform is still evolving.
          </p>
        </div>

        <div className="space-y-6">
          {/* Terminal 1: Runtime (crisp dark terminal surface in both themes) */}
          <div className="rounded-xl overflow-hidden bg-[#141c2f] dark:bg-[#090d16] shadow-lg border border-[#2b3850]">
            <div className="h-11 bg-[#1e293b] px-4 flex items-center justify-between border-b border-[#2b3850]">
              <div className="flex items-center gap-2.5">
                <TerminalIcon className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-mono text-xs text-[#f1f5f9] font-medium">
                  Terminal 1 — Start the FastGem Runtime
                </span>
              </div>
              <button
                onClick={() => handleCopy('runtime', runtimeCommands)}
                className="flex items-center gap-1.5 text-xs font-mono text-[#cbd5e1] hover:text-[#f59e0b] transition-colors cursor-pointer"
              >
                {copiedBlock === 'runtime' ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBlock === 'runtime' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-6 font-mono text-xs sm:text-sm text-[#e2e8f0] overflow-x-auto leading-relaxed">
              {runtimeCommands}
            </pre>
          </div>

          {/* Terminal 2: Console */}
          <div className="rounded-xl overflow-hidden bg-[#141c2f] dark:bg-[#090d16] shadow-lg border border-[#2b3850]">
            <div className="h-11 bg-[#1e293b] px-4 flex items-center justify-between border-b border-[#2b3850]">
              <div className="flex items-center gap-2.5">
                <TerminalIcon className="w-4 h-4 text-[#3b82f6]" />
                <span className="font-mono text-xs text-[#f1f5f9] font-medium">
                  In a second terminal — Start the Console
                </span>
              </div>
              <button
                onClick={() => handleCopy('console', consoleCommands)}
                className="flex items-center gap-1.5 text-xs font-mono text-[#cbd5e1] hover:text-[#3b82f6] transition-colors cursor-pointer"
              >
                {copiedBlock === 'console' ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBlock === 'console' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-6 font-mono text-xs sm:text-sm text-[#e2e8f0] overflow-x-auto leading-relaxed">
              {consoleCommands}
            </pre>
          </div>

          {/* Then open */}
          <div className="p-5 bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-xs sm:text-sm">
              <span className="text-[#4b5b73] dark:text-[#94a3b8]">Then open:</span>
              <code className="px-3 py-1.5 bg-[#141c2f] dark:bg-[#090d16] border border-[#2b3850] rounded-lg text-[#34d399] font-semibold">
                http://localhost:3000
              </code>
            </div>
            <button
              onClick={onOpenStudio}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#b45309] dark:text-[#f59e0b] hover:underline cursor-pointer"
            >
              Open Agent Console <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick-start note */}
        <div className="mt-8 p-6 bg-[#eaeff6] dark:bg-[#131d33] rounded-xl border border-[#bcc8da] dark:border-[#2b3850] flex gap-4 items-start">
          <Info className="w-5 h-5 text-[#b45309] dark:text-[#f59e0b] shrink-0 mt-0.5" />
          <p className="text-[#2d3c52] dark:text-[#bacac5] text-sm leading-relaxed">
            <strong className="text-[#0f172a] dark:text-[#dae2fd]">Quick-start note:</strong> FastGem currently uses local persistence for development. Add authentication, a production datastore, and deployment-specific security controls before exposing the runtime publicly.
          </p>
        </div>
      </div>
    </section>
  );
};
