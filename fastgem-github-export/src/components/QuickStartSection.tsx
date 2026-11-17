import React, { useState } from 'react';
import { Copy, Check, Info, Terminal as TerminalIcon, ExternalLink, Play } from 'lucide-react';

interface QuickStartSectionProps {
  onOpenStudio: () => void;
}

export const QuickStartSection: React.FC<QuickStartSectionProps> = ({ onOpenStudio }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'cli' | 'pip' | 'docker'>('cli');

  const steps = [
    {
      num: 1,
      comment: '# Install via curl shell installer',
      cmd: 'curl -fsSL https://raw.githubusercontent.com/JQCVSC/FastGem/main/install | bash'
    },
    {
      num: 2,
      comment: '# Initialize FastGem agent',
      cmd: 'fastgem init my-agent'
    },
    {
      num: 3,
      comment: '# Launch Dashboard',
      cmd: 'fastgem run'
    }
  ];

  const handleCopyStep = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(index);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <section className="w-full py-28 px-6 bg-[#0b1326]" id="quick-start">
      <div className="max-w-[840px] mx-auto">
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 rounded-full spectrum-badge font-mono text-xs uppercase tracking-widest inline-block mb-3">
            <span className="spectrum-gradient-text font-extrabold">Zero Config</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#dae2fd] tracking-tight">
            Running in under a minute
          </h2>
          <p className="text-[#bacac5] text-base md:text-lg mt-4 leading-relaxed">
            Install the binary, run the setup wizard, and open the dashboard. No complex config files — bootstrap is env-only.
          </p>

          {/* Installation method selector */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('cli')}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'cli'
                  ? 'bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] text-white font-extrabold shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                  : 'bg-[#171f33] text-[#bacac5] border border-[#3c4a46]/30 hover:text-[#dae2fd]'
              }`}
            >
              curl / Shell
            </button>
            <button
              onClick={() => setActiveTab('pip')}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'pip'
                  ? 'bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] text-white font-extrabold shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                  : 'bg-[#171f33] text-[#bacac5] border border-[#3c4a46]/30 hover:text-[#dae2fd]'
              }`}
            >
              pip / Python
            </button>
            <button
              onClick={() => setActiveTab('docker')}
              className={`px-4 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'docker'
                  ? 'bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] text-white font-extrabold shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                  : 'bg-[#171f33] text-[#bacac5] border border-[#3c4a46]/30 hover:text-[#dae2fd]'
              }`}
            >
              Docker
            </button>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="rounded-xl overflow-hidden bg-[#060e20] shadow-2xl border border-[#3c4a46]/30">
          {/* Header Bar */}
          <div className="h-10 bg-[#334155] px-4 flex items-center justify-between border-b border-[#3c4a46]/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ffb4ab]"></div>
              <div className="w-3 h-3 rounded-full bg-[#45dfa4]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ff8c00]"></div>
              <span className="ml-4 font-mono text-[11px] text-[#bacac5]/70 uppercase tracking-wider flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-[#ff6b00]" /> Terminal — fastgem-install
              </span>
            </div>

            <button 
              onClick={onOpenStudio}
              className="text-[11px] font-mono text-[#ff8c00] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" /> Run Simulation
            </button>
          </div>

          {/* Terminal Content Body */}
          <div className="p-6 md:p-8 font-mono text-xs sm:text-sm space-y-6">
            {activeTab === 'cli' && steps.map((step, idx) => (
              <div key={step.num} className="flex items-start gap-4 group">
                <span className="text-[#bacac5]/40 select-none pt-0.5 w-4 text-right">
                  {step.num}
                </span>
                <div className="flex-1 overflow-x-auto">
                  <div className="text-[#bacac5]/50 mb-1">{step.comment}</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#dae2fd]">
                      <span className="text-[#ff8c00] font-bold mr-2">$</span>
                      {step.cmd}
                    </span>
                    <button 
                      onClick={() => handleCopyStep(idx, step.cmd)}
                      title="Copy Line"
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-[#bacac5] hover:text-[#ff6b00] rounded hover:bg-[#171f33] cursor-pointer"
                    >
                      {copiedStep === idx ? <Check className="w-3.5 h-3.5 text-[#ff6b00]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {activeTab === 'pip' && (
              <div className="space-y-4">
                <div className="text-[#bacac5]/50"># Install FastGem package via PyPI</div>
                <div className="text-[#dae2fd]">
                  <span className="text-[#ff8c00] font-bold mr-2">$</span>
                  pip install fastgem
                </div>
                <div className="text-[#bacac5]/50 mt-4"># Initialize a new agent project</div>
                <div className="text-[#dae2fd]">
                  <span className="text-[#ff8c00] font-bold mr-2">$</span>
                  fastgem init my-agent
                </div>
              </div>
            )}

            {activeTab === 'docker' && (
              <div className="space-y-4">
                <div className="text-[#bacac5]/50"># Run official Docker image</div>
                <div className="text-[#dae2fd]">
                  <span className="text-[#ff8c00] font-bold mr-2">$</span>
                  docker run -d -p 8000:8000 -e GEMINI_API_KEY=$GEMINI_API_KEY ghcr.io/fastgem-ai/fastgem:latest
                </div>
                <div className="text-[#bacac5]/50 mt-4"># Verify container status</div>
                <div className="text-[#dae2fd]">
                  <span className="text-[#ff8c00] font-bold mr-2">$</span>
                  docker logs -f fastgem
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Note Callout */}
        <div className="mt-8 p-6 bg-[#ff6b00]/5 rounded-xl border border-[#ff6b00]/15 flex gap-4 items-start shadow-sm">
          <Info className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5" />
          <p className="text-[#bacac5] text-sm italic leading-relaxed">
            <strong className="text-[#dae2fd] not-italic">Note:</strong> Drops the FastGem runtime directly into <code className="text-[#ff8c00] font-mono text-xs bg-[#060e20] px-1.5 py-0.5 rounded border border-[#3c4a46]/30">~/.local/bin</code> or Python virtual environment. No external dependencies required.
          </p>
        </div>
      </div>
    </section>
  );
};
