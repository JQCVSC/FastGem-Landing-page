import React from 'react';
import { ArrowRight, Check, MessageSquare, LayoutDashboard } from 'lucide-react';

interface ConsoleStudioSectionProps {
  onOpenConsole: () => void;
  onOpenStudio: () => void;
}

export const ConsoleStudioSection: React.FC<ConsoleStudioSectionProps> = ({
  onOpenConsole,
  onOpenStudio,
}) => {
  const consoleCapabilities = [
    'Review active agents',
    'Configure model settings',
    'Open Agent Studio',
    'Start and continue sessions',
    'Inspect runtime status',
    'Manage API-oriented workflows',
    'Prepare agents for future tools and integrations',
  ];

  return (
    <section className="w-full bg-[#060e20] py-24 border-y border-[#3c4a46]/20" id="console">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Console Section Card */}
          <div className="bg-[#131b2e] border border-[#2b3850] rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <LayoutDashboard className="w-4 h-4 text-[#f59e0b]" />
                <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest font-extrabold">
                  Console
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tracking-tight mb-4">
                A console for the entire agent lifecycle.
              </h2>
              <p className="text-[#bacac5] text-sm sm:text-base mb-6 leading-relaxed">
                The FastGem console gives you one place to explore the system:
              </p>

              <ul className="space-y-3 mb-8">
                {consoleCapabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#dae2fd]">
                    <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onOpenStudio}
                className="px-6 py-3 btn-spectrum text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                Explore Agent Studio <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenConsole}
                className="px-6 py-3 btn-spectrum-outline font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl cursor-pointer whitespace-nowrap"
              >
                Open Console
              </button>
            </div>
          </div>

          {/* Agent Studio Section Card */}
          <div className="bg-[#131b2e] border border-[#2b3850] rounded-2xl p-8 sm:p-10 flex flex-col justify-between" id="agent-studio">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <MessageSquare className="w-4 h-4 text-[#3b82f6]" />
                <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest font-extrabold">
                  Agent Studio
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#dae2fd] tracking-tight mb-4">
                Test your agents where you build them.
              </h2>
              <p className="text-[#bacac5] text-sm sm:text-base leading-relaxed mb-6">
                Agent Studio is the interactive workspace for running prompts against your FastGem agents.
              </p>
              <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-8">
                Select an agent, start a session, send a prompt, and see the runtime response in the same interface. Conversations remain associated with their session so you can continue testing without losing context.
              </p>

              {/* Lightweight Session Preview */}
              <div className="bg-[#090d16] border border-[#2b3850] rounded-xl p-4 font-mono text-xs space-y-2.5 mb-6">
                <div className="flex items-center justify-between text-[#94a3b8] border-b border-[#2b3850]/80 pb-2">
                  <span>Agent: Research Assistant</span>
                  <span className="text-[#10b981]">Session persisted</span>
                </div>
                <div className="text-[#dae2fd]">
                  <span className="text-[#f59e0b] mr-2">&gt;</span>
                  Summarize our Q3 architecture notes and keep context for follow-ups.
                </div>
                <div className="text-[#94a3b8] pl-4">
                  Runtime response streamed to session history via configured runtime URL.
                </div>
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] font-mono border-t border-[#2b3850]/80 pt-4">
              Agent Studio is connected to the FastGem runtime through the configured runtime URL.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
