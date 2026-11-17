import React, { useState } from 'react';
import { X, Sparkles, Code2, HelpCircle, Check, Info } from 'lucide-react';

interface ContextViewProps {
  agentName?: string;
  onClose?: () => void;
  standalone?: boolean;
}

export const ContextView: React.FC<ContextViewProps> = ({
  agentName = 'Tester',
  onClose,
  standalone = false,
}) => {
  const [promptMode, setPromptMode] = useState<'agent' | 'chatbot' | 'customize'>('agent');
  const [multiBubble, setMultiBubble] = useState<boolean>(false);
  const [autoRemember, setAutoRemember] = useState<boolean>(false);
  const [sharedIdentity, setSharedIdentity] = useState<boolean>(false);

  return (
    <div className={`w-full ${standalone ? 'p-6 sm:p-8' : ''} text-[#0f172a] dark:text-[#f1f5f9] antialiased`}>
      {/* ------------ HEADER ------------ */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
            Context
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-2 font-sans max-w-3xl leading-relaxed">
            What the LLM sees for <span className="font-semibold text-[#0f172a] dark:text-white">{agentName}</span>. The prompt mode picks both the framework prompt profile and the built-in tool set. Custom tools come from plugins — always exposed regardless of mode.
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

      <div className="space-y-8 max-w-4xl">
        {/* ------------ PROMPT MODE ------------ */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9] block">
            Prompt mode
          </label>

          <div className="grid grid-cols-1 gap-3">
            {/* AGENT */}
            <div
              onClick={() => setPromptMode('agent')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                promptMode === 'agent'
                  ? 'bg-amber-500/5 dark:bg-[#1e2a45] border-amber-500 dark:border-[#ff6b00] text-slate-900 dark:text-[#f1f5f9]'
                  : 'bg-white dark:bg-[#0f172a] border-slate-200 dark:border-[#2b3850] hover:border-slate-300 dark:hover:border-[#3b82f6]/40 text-slate-700 dark:text-[#94a3b8]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    promptMode === 'agent'
                      ? 'border-amber-500 dark:border-[#ff6b00] bg-amber-500 dark:bg-[#ff6b00]'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {promptMode === 'agent' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-[#f1f5f9]">Agent</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 dark:bg-[#ff6b00]/20 text-amber-600 dark:text-[#ff8c00] px-2 py-0.5 rounded border border-amber-500/20 dark:border-[#ff6b00]/30 font-semibold">
                    Default
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                  Agent — full framework prompt (task delegation, tool-use discipline, workspace self-update, scheduling) + all built-in tools. Default for autonomous task agents.
                </p>
              </div>
            </div>

            {/* CHATBOT */}
            <div
              onClick={() => setPromptMode('chatbot')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                promptMode === 'chatbot'
                  ? 'bg-amber-500/5 dark:bg-[#1e2a45] border-amber-500 dark:border-[#ff6b00] text-slate-900 dark:text-[#f1f5f9]'
                  : 'bg-white dark:bg-[#0f172a] border-slate-200 dark:border-[#2b3850] hover:border-slate-300 dark:hover:border-[#3b82f6]/40 text-slate-700 dark:text-[#94a3b8]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    promptMode === 'chatbot'
                      ? 'border-amber-500 dark:border-[#ff6b00] bg-amber-500 dark:bg-[#ff6b00]'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {promptMode === 'chatbot' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-[#f1f5f9]">Chatbot</span>
                <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                  Chatbot — slim framework so persona files shape voice directly. Built-ins narrowed to <code className="bg-slate-100 dark:bg-[#18233a] px-1 py-0.5 rounded font-mono text-[11px] text-amber-600 dark:text-amber-400">image_gen</code>, <code className="bg-slate-100 dark:bg-[#18233a] px-1 py-0.5 rounded font-mono text-[11px] text-amber-600 dark:text-amber-400">tts</code>, <code className="bg-slate-100 dark:bg-[#18233a] px-1 py-0.5 rounded font-mono text-[11px] text-amber-600 dark:text-amber-400">write_file</code>, <code className="bg-slate-100 dark:bg-[#18233a] px-1 py-0.5 rounded font-mono text-[11px] text-amber-600 dark:text-amber-400">edit_file</code> — the last two let the LLM persist USER.md / MEMORY.md when it learns about the chatter. Memory is the USER.md / MEMORY.md sections inlined in the system prompt; no memory_search escape hatch (it scans logs chatbot mode doesn't write, returns empty, and confuses the model). Main reply emits as plain text, multi-bubble via the inline split marker. For companion / role-play / customer-support bots.
                </p>
              </div>
            </div>

            {/* CUSTOMIZE */}
            <div
              onClick={() => setPromptMode('customize')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                promptMode === 'customize'
                  ? 'bg-amber-500/5 dark:bg-[#1e2a45] border-amber-500 dark:border-[#ff6b00] text-slate-900 dark:text-[#f1f5f9]'
                  : 'bg-white dark:bg-[#0f172a] border-slate-200 dark:border-[#2b3850] hover:border-slate-300 dark:hover:border-[#3b82f6]/40 text-slate-700 dark:text-[#94a3b8]'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    promptMode === 'customize'
                      ? 'border-amber-500 dark:border-[#ff6b00] bg-amber-500 dark:bg-[#ff6b00]'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {promptMode === 'customize' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-[#f1f5f9]">Customize</span>
                <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                  Customize — only the date anchor + your bootstrap files; NO built-in tools. You write the system prompt completely via SOUL.md / IDENTITY.md and bring tools via plugins.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-[#94a3b8] pt-1 leading-relaxed font-sans">
            Plugin and MCP tools are always exposed regardless of mode. Build a plugin — see <code className="bg-slate-100 dark:bg-[#18233a] px-1.5 py-0.5 rounded font-mono text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#2b3850]">~/.fastclaw/plugins/fastclaw-plugin-demo</code> for a minimal example.
          </p>
        </div>

        {/* ------------ MULTI-BUBBLE REPLIES ------------ */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#2b3850]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">
                Multi-bubble replies
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                Let the agent split one reply into multiple chat bubbles using a separator marker — natural for short, multi-beat replies in IM. Applies to every IM channel (WeChat / Telegram / Discord / Slack / LINE / Feishu); ignored on web. Off by default — keeps each reply as a single message.
              </p>
            </div>

            {/* TOGGLE SWITCH */}
            <button
              type="button"
              onClick={() => setMultiBubble(!multiBubble)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                multiBubble ? 'bg-amber-500 dark:bg-[#ff6b00]' : 'bg-slate-200 dark:bg-[#1e2a45]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  multiBubble ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* ------------ AUTO-REMEMBER CHATTER ------------ */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#2b3850]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">
                Auto-remember chatter
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                Backup persistence path: every 5 user-turns the runtime fires a small LLM call that distills the recent conversation into USER.md / MEMORY.md. The primary path is the LLM writing those files directly via write_file / edit_file (now available in Chatbot mode too) — this toggle just makes sure something still gets persisted when the model forgets to. Off by default to preserve the stateless-across-sessions behavior.
              </p>
            </div>

            {/* TOGGLE SWITCH */}
            <button
              type="button"
              onClick={() => setAutoRemember(!autoRemember)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                autoRemember ? 'bg-amber-500 dark:bg-[#ff6b00]' : 'bg-slate-200 dark:bg-[#1e2a45]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  autoRemember ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* ------------ SHARED IDENTITY ACROSS CHANNELS ------------ */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#2b3850]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">
                Shared identity across channels
              </h3>
              <p className="text-xs text-slate-600 dark:text-[#94a3b8] leading-relaxed">
                When enabled, all IM channels (WeChat / Telegram / Discord / Slack / LINE / Feishu) share the same session and memory with the web chat. Conversations started on one channel can be continued on another. Off by default — each channel gets its own isolated session and memory.
              </p>
            </div>

            {/* TOGGLE SWITCH */}
            <button
              type="button"
              onClick={() => setSharedIdentity(!sharedIdentity)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                sharedIdentity ? 'bg-amber-500 dark:bg-[#ff6b00]' : 'bg-slate-200 dark:bg-[#1e2a45]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  sharedIdentity ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
