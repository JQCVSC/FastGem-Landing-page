import React, { useState } from 'react';
import { Upload, Download, Sparkles, X, Plus, Trash2, Code2, Check } from 'lucide-react';

interface SkillsViewProps {
  agentName?: string;
  onClose?: () => void;
  standalone?: boolean;
}

export const SkillsView: React.FC<SkillsViewProps> = ({
  agentName = 'Tester',
  onClose,
  standalone = false,
}) => {
  const [skills, setSkills] = useState<Array<{
    id: string;
    name: string;
    description: string;
    version: string;
    author: string;
  }>>([]);

  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [skillUrl, setSkillUrl] = useState('');

  const handleInstallSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillUrl) return;
    const nameFromUrl = skillUrl.split('/').pop()?.replace('.git', '') || 'custom-skill';
    setSkills((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: nameFromUrl,
        description: 'Installed agent skill capability for enhanced task automation.',
        version: '1.0.0',
        author: 'community',
      },
    ]);
    setSkillUrl('');
    setIsInstallModalOpen(false);
  };

  const handleRemoveSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className={`w-full ${standalone ? 'p-6 sm:p-8' : ''} text-[#0f172a] dark:text-[#f1f5f9] antialiased`}>
      {/* ------------ HEADER ------------ */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
            Skills
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-1 font-sans">
            Skills scoped to <span className="font-semibold text-[#0f172a] dark:text-white">{agentName}</span> — only this agent sees them
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsInstallModalOpen(true)}
            className="px-4 py-2 bg-white dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-[#f1f5f9] hover:bg-slate-50 dark:hover:bg-[#1e2a45] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Upload className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Upload Skills</span>
          </button>

          <button
            type="button"
            onClick={() => setIsInstallModalOpen(true)}
            className="px-4 py-2 bg-white dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-[#f1f5f9] hover:bg-slate-50 dark:hover:bg-[#1e2a45] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Install Skill</span>
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

      {/* ------------ CONTENT ------------ */}
      {skills.length === 0 ? (
        /* Empty container matching reference image */
        <div className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-16 sm:p-24 flex flex-col items-center justify-center text-center shadow-xs">
          {/* Peach/Orange Icon Container */}
          <div className="w-14 h-14 rounded-2xl bg-[#ffedd5] dark:bg-[#ff6b00]/15 flex items-center justify-center mb-5 text-[#ea580c] dark:text-[#ff8c00]">
            <Sparkles className="w-7 h-7 stroke-[1.75]" />
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-[#f1f5f9] mb-1.5">
            No agent-scoped skills yet
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94a3b8] font-sans max-w-md leading-relaxed mb-6">
            Install a skill below — it lands in this agent's own skills directory and only this agent sees it.
          </p>

          <button
            type="button"
            onClick={() => setIsInstallModalOpen(true)}
            className="px-4 py-2.5 bg-white dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-[#f1f5f9] hover:bg-slate-50 dark:hover:bg-[#1e2a45] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            <span>Install Skill</span>
          </button>
        </div>
      ) : (
        /* List of installed skills */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#2b3850]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94a3b8]">
              Installed Skills ({skills.length})
            </span>
            <button
              onClick={() => setSkills([])}
              className="text-xs text-slate-500 hover:text-rose-500 dark:text-[#94a3b8] dark:hover:text-rose-400 font-mono"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-5 flex items-start justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-[#ff6b00]/15 border border-orange-200/60 dark:border-[#ff6b00]/30 flex items-center justify-center shrink-0 text-[#ea580c] dark:text-[#ff8c00]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">{s.name}</h4>
                      <span className="text-[10px] font-mono bg-slate-100 dark:bg-[#18233a] px-2 py-0.5 rounded text-slate-600 dark:text-[#94a3b8]">
                        v{s.version}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#94a3b8] mt-1 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveSkill(s.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer shrink-0"
                  title="Remove skill"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------ INSTALL MODAL ------------ */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f1f5f9]">Install Skill</h3>
              <button
                onClick={() => setIsInstallModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInstallSkill} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Skill Git Repository or NPM Package Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. github:fastclaw/skill-[#1] or @fastclaw/web-search"
                  value={skillUrl}
                  onChange={(e) => setSkillUrl(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-[#f1f5f9] focus:outline-none focus:border-amber-500 dark:focus:border-[#ff6b00]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInstallModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-[#94a3b8] hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 dark:bg-[#c2410c] hover:bg-amber-700 dark:hover:bg-[#9a3412] text-white font-medium text-xs rounded-xl shadow-xs"
                >
                  Install Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
