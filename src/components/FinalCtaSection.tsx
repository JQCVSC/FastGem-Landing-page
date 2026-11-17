import React from 'react';
import { ArrowRight, Github } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenStudio: () => void;
  onOpenDocs?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenStudio }) => {
  return (
    <section className="w-full py-24 bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="max-w-[820px] z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-5 tracking-tight leading-tight drop-shadow-md text-balance">
          Build your first Gemini agent runtime.
        </h2>
        <p className="text-white/95 text-base sm:text-lg md:text-xl mb-3 max-w-2xl font-medium">
          Start with one agent, one session, and one clear use case. Expand from there.
        </p>
        <p className="text-white/85 text-sm sm:text-base mb-10 max-w-2xl">
          FastGem gives you the runtime, the console, and the foundation to turn Gemini prompts into a real agent product.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={onOpenStudio}
            className="px-8 py-4 bg-[#0b1326] text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl hover:scale-[1.03] transition-all shadow-2xl flex items-center gap-2 cursor-pointer border border-white/30 hover:border-white whitespace-nowrap"
          >
            Open Agent Console <ArrowRight className="w-4 h-4 text-[#f59e0b]" />
          </button>

          <a 
            href="https://github.com/JQCVSC/FastGem"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white bg-white/10 backdrop-blur-sm text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl hover:bg-white hover:text-[#0b1326] transition-all flex items-center gap-2 cursor-pointer shadow-lg whitespace-nowrap"
          >
            <Github className="w-4 h-4" />
            Explore the Repository
          </a>
        </div>
      </div>
    </section>
  );
};
