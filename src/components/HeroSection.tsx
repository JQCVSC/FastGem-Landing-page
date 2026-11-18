import React from 'react';
import { Terminal, Github } from 'lucide-react';

interface HeroSectionProps {
  onOpenStudio: () => void;
  onOpenQuickStart?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenStudio }) => {
  const capabilities = [
    'Gemini-native',
    'Persistent sessions',
    'Self-hostable',
    'Runtime API',
    'Streaming-ready'
  ];

  return (
    <section className="relative w-full overflow-hidden px-6 pt-32 pb-24 md:pt-40 md:pb-28 flex flex-col items-center justify-center text-center bg-[#dfe5ee] dark:bg-[#0b1326] transition-colors">
      {/* Ambient Background Glows (softened in light mode so there is zero glare) */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#ef4444]/6 dark:bg-[#ef4444]/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[15%] right-[-10%] w-[45%] h-[45%] bg-[#3b82f6]/8 dark:bg-[#3b82f6]/15 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-[#a855f7]/6 dark:bg-[#a855f7]/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[35%] h-[35%] bg-[#10b981]/5 dark:bg-[#10b981]/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="z-10 max-w-[920px] flex flex-col items-center gap-6">
        {/* Eyebrow */}
        <p className="font-mono text-xs font-extrabold uppercase tracking-widest spectrum-gradient-text mb-1">
          GEMINI-NATIVE AGENT RUNTIME
        </p>

        {/* Main Display Title */}
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0f172a] dark:text-[#f1f5f9] leading-[1.1] tracking-tight text-balance max-w-[880px]">
            Build and run focused Gemini agents without the{' '}
            <span className="spectrum-gradient-text">framework overhead.</span>
          </h1>

          <div className="text-base sm:text-lg md:text-xl text-[#2d3c52] dark:text-[#bacac5] max-w-[740px] mx-auto leading-relaxed space-y-3">
            <p>
              FastGem is a lightweight, self-hostable runtime and control plane for creating, configuring, and running Google Gemini agents.
            </p>
            <p className="text-sm sm:text-base text-[#4b5b73] dark:text-[#94a3b8]">
              Define each agent’s instructions, model, memory, and session context. Then operate it through a clean console or connect your own application through the runtime API.
            </p>
          </div>

          {/* Capability list (unboxed clean metadata with separators) */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-2 font-mono text-xs text-[#4b5b73] dark:text-[#bacac5]">
            {capabilities.map((cap, idx) => (
              <React.Fragment key={cap}>
                <span className="text-[#1e293b] dark:text-[#dae2fd] font-medium">{cap}</span>
                {idx < capabilities.length - 1 && (
                  <span className="text-[#94a3b8] dark:text-[#475569]" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <button 
            onClick={onOpenStudio}
            className="px-8 py-4 btn-spectrum text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center gap-2.5 cursor-pointer whitespace-nowrap"
          >
            <Terminal className="w-4 h-4 text-white" />
            Open Agent Console
          </button>

          <a 
            href="https://github.com/JQCVSC/FastGem"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 btn-spectrum-outline font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center gap-2.5 cursor-pointer hover:scale-[1.02] transition-all whitespace-nowrap"
          >
            <Github className="w-4 h-4 text-[#b45309] dark:text-[#f59e0b]" />
            <span>View on GitHub</span>
          </a>
        </div>

        {/* Small supporting line */}
        <p className="text-xs sm:text-sm text-[#4b5b73] dark:text-[#94a3b8] mt-3">
          A practical foundation for Gemini-powered agents, built to grow with your product.
        </p>
      </div>
    </section>
  );
};
