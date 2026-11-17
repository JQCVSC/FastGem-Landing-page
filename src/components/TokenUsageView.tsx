import React, { useState } from 'react';
import { Coins, RefreshCw, X, TrendingUp, Cpu } from 'lucide-react';

interface TokenUsageViewProps {
  agentName?: string;
  onClose?: () => void;
  standalone?: boolean;
}

export const TokenUsageView: React.FC<TokenUsageViewProps> = ({
  agentName = 'Tester',
  onClose,
  standalone = false,
}) => {
  const [timeWindow, setTimeWindow] = useState<'24h' | '7d' | '30d'>('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasData, setHasData] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className={`w-full ${standalone ? 'p-6 sm:p-8' : ''} text-[#0f172a] dark:text-[#f1f5f9] antialiased`}>
      {/* ------------ HEADER ------------ */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
            Token Usage
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1 font-sans">
            Token consumption per chat session for this agent.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Time Window Pills */}
          <div className="bg-slate-100 dark:bg-[#18233a] p-1 rounded-xl border border-slate-200/80 dark:border-[#2b3850] flex items-center gap-1">
            {(['24h', '7d', '30d'] as const).map((w) => (
              <button
                key={w}
                onClick={() => setTimeWindow(w)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  timeWindow === w
                    ? 'bg-white dark:bg-[#0f172a] text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-[#94a3b8] dark:hover:text-white'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={handleRefresh}
            className="p-2 bg-white dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl text-slate-600 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1e2a45] transition-colors shadow-xs cursor-pointer"
            title="Refresh Token Usage"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
          </button>

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
      </div>

      {/* ------------ CONTENT CARD ------------ */}
      {!hasData ? (
        <div className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-16 sm:p-24 flex flex-col items-center justify-center text-center shadow-xs">
          {/* Custom Coin Token Icon matching reference image */}
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-slate-400 dark:text-[#64748b]">
            <Coins className="w-8 h-8 stroke-[1.5]" />
          </div>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94a3b8] font-sans">
            No token usage recorded in this window yet.
          </p>

          <button
            type="button"
            onClick={() => setHasData(true)}
            className="mt-6 text-xs text-slate-400 hover:text-slate-600 dark:text-[#64748b] dark:hover:text-[#94a3b8] font-mono underline cursor-pointer"
          >
            Simulate token activity
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-[#94a3b8] block mb-1">Total Prompt Tokens</span>
              <span className="text-2xl font-bold font-mono text-slate-900 dark:text-[#f1f5f9]">142,850</span>
            </div>
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-[#94a3b8] block mb-1">Total Completion Tokens</span>
              <span className="text-2xl font-bold font-mono text-amber-600 dark:text-[#ff8c00]">28,410</span>
            </div>
            <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-5 shadow-xs">
              <span className="text-xs text-slate-500 dark:text-[#94a3b8] block mb-1">Estimated Cost</span>
              <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">$0.034</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-6 shadow-xs flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-800 dark:text-[#f1f5f9]">Recorded Sessions ({timeWindow})</h4>
              <p className="text-xs text-slate-500 dark:text-[#94a3b8] mt-0.5">8 chat sessions processed by {agentName}</p>
            </div>
            <button
              onClick={() => setHasData(false)}
              className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:text-[#94a3b8] dark:hover:text-white"
            >
              Reset View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
