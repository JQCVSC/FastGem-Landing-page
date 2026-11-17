import React, { useState } from 'react';
import { X, ImagePlus, Bot } from 'lucide-react';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (agentData: { name: string; description: string }) => void;
}

export const CreateAgentModal: React.FC<CreateAgentModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      name: name.trim() || 'My Helper',
      description: description.trim(),
    });
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[540px] bg-[#131d33] border border-[#2b3850] rounded-2xl shadow-2xl overflow-hidden text-[#f1f5f9]">
        {/* Header */}
        <div className="p-6 border-b border-[#2b3850]/80 relative bg-[#0f172a]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#94a3b8] hover:text-white p-1 rounded-lg hover:bg-[#1e2a45] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full spectrum-badge text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
            <Bot className="w-3.5 h-3.5 text-[#a855f7]" />
            <span className="spectrum-gradient-text font-extrabold">FastGem Agent Runtime</span>
          </div>
          <h2 className="text-xl font-bold text-[#f1f5f9] tracking-tight">Create New Agent</h2>
          <p className="text-xs text-[#94a3b8] mt-1.5 leading-relaxed">
            The system generates a globally unique agent ID (e.g.{' '}
            <code className="bg-[#090d16] px-2 py-0.5 rounded border border-[#2b3850] text-[#f59e0b] font-mono">
              agt_a1b2c3...
            </code>
            ); configured under Gemini 3.6 Flash / 3.1 Pro runtime.
          </p>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-[#131d33]">
          {/* Avatar Icon + Name Row */}
          <div className="flex gap-4 items-start">
            {/* Avatar / Image Box */}
            <div className="w-20 h-20 shrink-0 rounded-2xl bg-[#090d16] border-2 border-dashed border-[#2b3850] hover:border-[#a855f7] transition-colors flex flex-col items-center justify-center text-[#94a3b8] cursor-pointer group">
              <ImagePlus className="w-6 h-6 text-[#94a3b8] group-hover:text-[#a855f7] transition-colors" />
            </div>

            {/* Name Input */}
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-semibold text-[#f1f5f9] block">Agent Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Code Architect Agent"
                className="w-full bg-[#090d16] text-[#f1f5f9] placeholder-[#64748b] text-sm px-4 py-2.5 rounded-xl border border-[#2b3850] focus:border-[#a855f7] focus:outline-none transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#f1f5f9] block">Description (optional)</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this agent for? Defined in SOUL.md system instruction..."
              className="w-full bg-[#090d16] text-[#f1f5f9] placeholder-[#64748b] text-sm p-3 rounded-xl border border-[#2b3850] focus:border-[#a855f7] focus:outline-none transition-all resize-none shadow-inner"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#2b3850]/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-[#1e2a45] hover:bg-[#283656] text-[#f1f5f9] font-medium text-xs rounded-xl border border-[#2b3850] transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 btn-spectrum text-white font-extrabold text-xs rounded-xl transition-all shadow-md cursor-pointer"
            >
              Create Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
