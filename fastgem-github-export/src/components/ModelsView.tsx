import React, { useState } from 'react';
import { Share2, Cpu, Plus, Pencil, Trash2, ChevronDown, Check, X } from 'lucide-react';

interface ModelsViewProps {
  agentName?: string;
  onClose?: () => void;
  standalone?: boolean;
}

export const ModelsView: React.FC<ModelsViewProps> = ({
  agentName = 'Tester',
  onClose,
  standalone = false,
}) => {
  const [shareConfig, setShareConfig] = useState<boolean>(true);
  const [activeModel, setActiveModel] = useState<string>('Inherit (clawrouter/claw-latest)');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const [providers, setProviders] = useState<Array<{
    id: string;
    name: string;
    apiBase: string;
    apiKey: string;
    modelsCount: number;
    source: string;
  }>>([
    {
      id: '1',
      name: 'clawrouter',
      apiBase: 'http://clawrouter-api-svc.workany:3000',
      apiKey: 'sk-h****oXhP',
      modelsCount: 1,
      source: 'Inherited from admin',
    },
  ]);

  const [newProviderName, setNewProviderName] = useState('');
  const [newApiBase, setNewApiBase] = useState('');
  const [newApiKey, setNewApiKey] = useState('');

  const modelOptions = [
    'Inherit (clawrouter/claw-latest)',
    'clawrouter/claw-latest',
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'openai/gpt-4o',
    'anthropic/claude-3-5-sonnet',
  ];

  const handleAddProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProviderName) return;
    setProviders((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newProviderName,
        apiBase: newApiBase || 'http://localhost:8000',
        apiKey: newApiKey ? `${newApiKey.slice(0, 4)}****${newApiKey.slice(-4)}` : 'sk-****custom',
        modelsCount: 1,
        source: 'Custom',
      },
    ]);
    setNewProviderName('');
    setNewApiBase('');
    setNewApiKey('');
    setIsAddModalOpen(false);
  };

  const handleDeleteProvider = (id: string) => {
    setProviders((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className={`w-full ${standalone ? 'p-6 sm:p-8' : ''} text-[#0f172a] dark:text-[#f1f5f9] antialiased`}>
      {/* ------------ HEADER ------------ */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
            Models
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-2 font-sans max-w-3xl leading-relaxed">
            LLM providers and active model scoped to <span className="font-semibold text-[#0f172a] dark:text-white">{agentName}</span>. Agent-scope settings override the system default.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-white dark:bg-[#18233a] hover:bg-slate-50 dark:hover:bg-[#202d4a] text-slate-800 dark:text-[#f1f5f9] text-xs sm:text-sm font-medium rounded-xl border border-slate-200 dark:border-[#2b3850] shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#ea580c] dark:text-[#ff8c00]" />
            <span>Add Provider</span>
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

      <div className="space-y-6">
        {/* ------------ CARD 1: SHARE MODEL CONFIG ------------ */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-6 flex items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-[#ff6b00]/10 border border-orange-200/60 dark:border-[#ff6b00]/20 shrink-0 text-[#ea580c] dark:text-[#ff8c00]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">
                Share model config with chatters
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#94a3b8] mt-1 leading-relaxed max-w-2xl">
                Chatters using <span className="font-semibold text-slate-700 dark:text-slate-300">{agentName}</span> inherit your model and provider credentials. Your tokens are spent on their messages.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShareConfig(!shareConfig)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              shareConfig ? 'bg-amber-500 dark:bg-[#ff6b00]' : 'bg-slate-200 dark:bg-[#1e2a45]'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                shareConfig ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* ------------ CARD 2: ACTIVE MODEL ------------ */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-[#ff6b00]/10 border border-orange-200/60 dark:border-[#ff6b00]/20 shrink-0 text-[#ea580c] dark:text-[#ff8c00]">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">
                Active Model
              </h3>
              <span className="text-[11px] font-mono bg-slate-100 dark:bg-[#18233a] text-slate-600 dark:text-[#94a3b8] px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-[#2b3850]">
                Inheriting
              </span>
            </div>
          </div>

          <div className="relative max-w-md">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-slate-800 dark:text-[#f1f5f9] flex items-center justify-between hover:border-slate-300 dark:hover:border-[#3b82f6]/40 transition-colors cursor-pointer"
            >
              <span>{activeModel}</span>
              <ChevronDown className="w-4 h-4 text-slate-400 dark:text-[#64748b]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl shadow-xl z-20 overflow-hidden py-1">
                {modelOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setActiveModel(opt);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm font-mono hover:bg-slate-100 dark:hover:bg-[#1e2a45] text-slate-700 dark:text-[#f1f5f9] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{opt}</span>
                    {activeModel === opt && <Check className="w-4 h-4 text-[#ea580c] dark:text-[#ff6b00]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-[#94a3b8] font-sans">
            Using system default: <code className="font-mono text-slate-700 dark:text-slate-300">clawrouter/claw-latest</code>. Pick a model above to override for {agentName} only.
          </p>
        </div>

        {/* ------------ CARD 3: PROVIDERS TABLE ------------ */}
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#2b3850] bg-slate-50/50 dark:bg-[#131d33]/50 text-slate-500 dark:text-[#94a3b8] font-medium">
                  <th className="py-3.5 px-6 font-normal">Name</th>
                  <th className="py-3.5 px-6 font-normal">API Base</th>
                  <th className="py-3.5 px-6 font-normal">API Key</th>
                  <th className="py-3.5 px-6 font-normal">Models</th>
                  <th className="py-3.5 px-6 font-normal">Source</th>
                  <th className="py-3.5 px-6 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#2b3850]/60">
                {providers.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-[#131d33]/30 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900 dark:text-[#f1f5f9]">
                      {p.name}
                    </td>
                    <td className="py-4 px-6">
                      <code className="bg-slate-100 dark:bg-[#18233a] text-slate-700 dark:text-[#f1f5f9] px-2.5 py-1 rounded border border-slate-200 dark:border-[#2b3850] font-mono text-xs">
                        {p.apiBase}
                      </code>
                    </td>
                    <td className="py-4 px-6">
                      <code className="bg-slate-100 dark:bg-[#18233a] text-slate-700 dark:text-[#f1f5f9] px-2.5 py-1 rounded border border-slate-200 dark:border-[#2b3850] font-mono text-xs">
                        {p.apiKey}
                      </code>
                    </td>
                    <td className="py-4 px-6 font-mono text-slate-700 dark:text-[#f1f5f9]">
                      {p.modelsCount}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-sans text-slate-600 dark:text-[#94a3b8] bg-slate-100 dark:bg-[#18233a] border border-slate-200 dark:border-[#2b3850]">
                        {p.source}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-1.5 text-slate-400 hover:text-slate-700 dark:text-[#94a3b8] dark:hover:text-white transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProvider(p.id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ------------ ADD PROVIDER MODAL ------------ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f1f5f9]">Add Provider</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProvider} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Provider Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. custom-ollama, openai, groq"
                  value={newProviderName}
                  onChange={(e) => setNewProviderName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 dark:text-[#f1f5f9] focus:outline-none focus:border-amber-500 dark:focus:border-[#ff6b00]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  API Base URL
                </label>
                <input
                  type="text"
                  placeholder="http://localhost:11434/v1"
                  value={newApiBase}
                  onChange={(e) => setNewApiBase(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 dark:text-[#f1f5f9] focus:outline-none focus:border-amber-500 dark:focus:border-[#ff6b00]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  placeholder="sk-..."
                  value={newApiKey}
                  onChange={(e) => setNewApiKey(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 dark:text-[#f1f5f9] focus:outline-none focus:border-amber-500 dark:focus:border-[#ff6b00]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-[#94a3b8] hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 dark:bg-[#ff6b00] hover:bg-amber-600 dark:hover:bg-[#e05e00] text-white font-medium text-xs rounded-xl shadow-xs"
                >
                  Save Provider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
