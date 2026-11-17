import React, { useState } from 'react';
import { Copy, Check, ArrowRight, BookOpen, Terminal } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenStudio: () => void;
  onOpenDocs: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenStudio, onOpenDocs }) => {
  const [copied, setCopied] = useState(false);
  const commandText = 'curl -fsSL https://raw.githubusercontent.com/JQCVSC/FastGem/main/install | bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-28 bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="max-w-[800px] z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight drop-shadow-md">
          Ready to build your next-gen Gemini Agent?
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl font-medium drop-shadow-xs">
          Launch FastGem in under 2 minutes and supercharge your AI agent workflows.
        </p>

        <div className="flex flex-col items-center gap-6 w-full">
          {/* Terminal Curl Box */}
          <div className="w-full max-w-xl p-4 bg-[#060e20]/95 backdrop-blur-md rounded-xl text-left border border-white/30 shadow-2xl flex items-center justify-between gap-3 group">
            <code className="text-[#f59e0b] font-mono text-xs sm:text-sm whitespace-nowrap overflow-x-auto">
              $ {commandText}
            </code>
            <button 
              onClick={handleCopy}
              title="Copy Installation Command"
              className="text-[#bacac5] hover:text-[#f59e0b] p-1.5 rounded hover:bg-[#171f33] transition-colors shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Action Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <button 
              onClick={onOpenStudio}
              className="px-10 py-4 bg-[#0b1326] text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-full hover:scale-105 transition-all shadow-2xl flex items-center gap-2 cursor-pointer border border-white/30 hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            >
              Get Started Now <ArrowRight className="w-4 h-4 text-[#ff8c00]" />
            </button>

            <button 
              onClick={onOpenDocs}
              className="px-10 py-4 border-2 border-white bg-white/10 backdrop-blur-sm text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-full hover:bg-white hover:text-[#0b1326] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <BookOpen className="w-4 h-4" />
              Read Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
