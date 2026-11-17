import React, { useState } from 'react';
import { Copy, Check, Terminal, Shield, Sparkles } from 'lucide-react';

interface OpenSourceSectionProps {
  onOpenStudio: () => void;
}

export const OpenSourceSection: React.FC<OpenSourceSectionProps> = ({ onOpenStudio }) => {
  const [copied, setCopied] = useState(false);
  const commandText = 'curl -fsSL https://raw.githubusercontent.com/JQCVSC/FastGem/main/install | bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(commandText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[#131b2e] py-24 relative overflow-hidden border-t border-[#3c4a46]/20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div>
            <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest mb-3 block font-extrabold">
              Open Source
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#dae2fd] mb-6 tracking-tight">
              Source-available, yours to run
            </h2>
            <p className="text-[#bacac5] text-base md:text-lg mb-8 leading-relaxed">
              Use FastGem commercially as a backend for your own product, or deploy it internally — free, under the FastGem Community License. Building a multi-tenant SaaS on top? Access our enterprise cloud runner.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <span className="font-mono text-sm font-extrabold text-[#ef4444] bg-[#ef4444]/10 px-2.5 py-1 rounded border border-[#ef4444]/30">
                  01
                </span>
                <div>
                  <h4 className="font-bold text-[#dae2fd] text-base uppercase tracking-wide">
                    Community License
                  </h4>
                  <p className="text-[#bacac5] text-sm mt-1">
                    Free for commercial internal use and backend infrastructure.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-mono text-sm font-extrabold text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-1 rounded border border-[#3b82f6]/30">
                  02
                </span>
                <div>
                  <h4 className="font-bold text-[#dae2fd] text-base uppercase tracking-wide">
                    Enterprise Cloud
                  </h4>
                  <p className="text-[#bacac5] text-sm mt-1">
                    Managed multi-tenant runner for scaling SaaS applications seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Quick Runner Box */}
          <div className="relative p-8 bg-[#2d3449]/40 rounded-2xl border border-[#3c4a46]/30 shadow-2xl flex flex-col items-center text-center justify-center backdrop-blur-xl">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 spectrum-badge rounded-full text-[10px] font-mono uppercase tracking-wider font-extrabold">
              <Sparkles className="w-3 h-3 text-[#f59e0b]" /> <span className="spectrum-gradient-text">One-Line Installation</span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-[#dae2fd] mb-4 mt-2">
              Spin up your first agent today
            </h3>

            <div className="w-full p-4 bg-[#060e20] rounded-xl text-left overflow-x-auto border border-[#3c4a46]/30 mb-6 flex items-center justify-between gap-3 group">
              <code className="text-[#f59e0b] font-mono text-xs sm:text-sm whitespace-nowrap">
                $ {commandText}
              </code>
              <button 
                onClick={handleCopy}
                title="Copy Command"
                className="text-[#bacac5] hover:text-[#f59e0b] p-1.5 rounded hover:bg-[#171f33] transition-colors shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button 
                onClick={handleCopy}
                className="px-6 py-3.5 bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl hover:opacity-95 hover:scale-[1.02] transition-all flex-1 shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
              >
                {copied ? 'Command Copied!' : 'Deploy Now'}
              </button>
              
              <button 
                onClick={onOpenStudio}
                className="px-6 py-3.5 btn-spectrum-outline font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl flex-1 cursor-pointer"
              >
                Test In Browser
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
