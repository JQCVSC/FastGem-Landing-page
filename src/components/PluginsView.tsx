import React, { useState } from 'react';
import { Plug, X, Sparkles, FolderPlus, Terminal, Check, Info } from 'lucide-react';

interface PluginsViewProps {
  agentName?: string;
  onClose?: () => void;
  standalone?: boolean;
}

export const PluginsView: React.FC<PluginsViewProps> = ({
  agentName = 'Tester',
  onClose,
  standalone = false
}) => {
  const [plugins, setPlugins] = useState<Array<{
    id: string;
    name: string;
    version: string;
    description: string;
    type: string;
    enabled: boolean;
  }>>([]);

  return (
    <div className={`w-full ${standalone ? 'p-6 sm:p-8' : ''} text-[#0f172a] dark:text-[#f1f5f9] antialiased`}>
      {/* ------------ HEADER ------------ */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
              Plugins
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-2 font-sans max-w-3xl leading-relaxed">
            Hook plugins discovered on this install — enable per-agent for <span className="font-semibold text-[#0f172a] dark:text-white">{agentName}</span>. Off by default; plugins only fire on agents you explicitly turn on. Follow-up messages flow back through <code className="bg-slate-100 dark:bg-[#1a233a] px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#2b3850] text-amber-600 dark:text-amber-400 font-mono text-xs">chat.send</code> — they don't trigger another agent turn.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e2a45] rounded-xl transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ------------ EMPTY DASHED STATE CONTAINER ------------ */}
      {plugins.length === 0 ? (
        <div className="w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-[#2b3850]/80 p-12 sm:p-16 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-[#0b1326]/40 transition-all">
          {/* Soft Orange/Peach Plug Icon Box */}
          <div className="w-16 h-16 rounded-2xl bg-amber-100/80 dark:bg-[#ff6b00]/15 border border-amber-200 dark:border-[#ff6b00]/30 flex items-center justify-center mb-5 text-[#ea580c] dark:text-[#ff8c00] shadow-xs">
            <Plug className="w-8 h-8 rotate-45 stroke-[1.75]" />
          </div>

          <h3 className="text-lg font-medium text-slate-800 dark:text-[#dae2fd] mb-2">
            No hook plugins installed
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8fa3a8] font-mono max-w-lg leading-relaxed">
            Drop a plugin directory into <span className="text-slate-700 dark:text-slate-300 bg-slate-200/60 dark:bg-[#18233a] px-2 py-0.5 rounded border border-slate-300/60 dark:border-[#2b3850]">~/.fastclaw/plugins/</span> with type: <span className="text-[#ea580c] dark:text-[#ff8c00]">"hook"</span> in its <span className="text-slate-700 dark:text-slate-300">plugin.json</span>, then restart the daemon.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setPlugins([
                  {
                    id: 'web-search-hook',
                    name: 'Auto Web Search Hook',
                    version: '1.0.4',
                    description: 'Intercepts complex query turns and automatically enriches context with live web snippets.',
                    type: 'hook',
                    enabled: true
                  },
                  {
                    id: 'sentiment-log-hook',
                    name: 'Sentiment Logger Hook',
                    version: '0.2.1',
                    description: 'Streams customer satisfaction and user mood scores back to analytics metrics daemon.',
                    type: 'hook',
                    enabled: false
                  }
                ]);
              }}
              className="px-4 py-2 bg-slate-200 dark:bg-[#1a233a] hover:bg-slate-300 dark:hover:bg-[#253252] text-slate-700 dark:text-[#dae2fd] font-mono text-xs font-semibold rounded-xl border border-slate-300 dark:border-[#2b3850] transition-colors cursor-pointer flex items-center gap-2"
            >
              <FolderPlus className="w-4 h-4 text-[#ea580c] dark:text-[#ff8c00]" />
              Load Sample Hook Plugins
            </button>
          </div>
        </div>
      ) : (
        /* ------------ INSTALLED PLUGINS LIST ------------ */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#2b3850]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8fa3a8]">
              Installed Hooks ({plugins.length})
            </span>
            <button
              onClick={() => setPlugins([])}
              className="text-xs text-slate-500 hover:text-rose-500 dark:text-[#8fa3a8] dark:hover:text-rose-400 font-mono"
            >
              Clear Installed
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {plugins.map((plugin) => (
              <div
                key={plugin.id}
                className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-[#ff6b00]/10 border border-amber-200 dark:border-[#ff6b00]/30 flex items-center justify-center shrink-0 text-[#ea580c] dark:text-[#ff8c00] mt-0.5">
                    <Plug className="w-5 h-5 rotate-45" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-semibold text-slate-900 dark:text-[#dae2fd]">{plugin.name}</h4>
                      <span className="text-[10px] font-mono bg-slate-100 dark:bg-[#1e2a45] px-2 py-0.5 rounded text-slate-600 dark:text-[#bacac5] border border-slate-200 dark:border-[#2b3850]">
                        v{plugin.version}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#bacac5] mt-1 leading-relaxed">
                      {plugin.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setPlugins(prev => prev.map(p => p.id === plugin.id ? { ...p, enabled: !p.enabled } : p));
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      plugin.enabled
                        ? 'bg-emerald-50 dark:bg-[#10b981]/20 text-emerald-700 dark:text-[#10b981] border border-emerald-300 dark:border-[#10b981]/40'
                        : 'bg-slate-100 dark:bg-[#171f33] text-slate-600 dark:text-[#bacac5] border border-slate-200 dark:border-[#2b3850]'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${plugin.enabled ? 'opacity-100' : 'opacity-0'}`} />
                    <span>{plugin.enabled ? 'Active for Agent' : 'Off for Agent'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
