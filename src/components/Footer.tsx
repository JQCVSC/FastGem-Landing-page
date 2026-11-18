import React from 'react';

interface FooterProps {
  onOpenStudio: () => void;
  onOpenDocs: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStudio, onOpenDocs, onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="w-full bg-[#cfd8e5] dark:bg-[#060e20] py-16 border-t border-[#bcc8da] dark:border-[#3c4a46]/20 text-[#2d3c52] dark:text-[#bacac5] transition-colors">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="bg-[#131b2e] px-2 py-1 rounded-lg dark:bg-transparent dark:p-0">
                <img 
                  src="https://i.imgur.com/hkRlTDp.png" 
                  alt="FastGem Logo" 
                  className="h-7 dark:h-8 w-auto object-contain rounded-lg shrink-0" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <span className="font-bold text-xl text-[#0f172a] dark:text-white tracking-tight">FastGem</span>
            </div>
            <p className="text-sm leading-relaxed text-[#4b5b73] dark:text-[#bacac5]/80">
              A lightweight, self-hostable runtime and control plane for Google Gemini agents.
            </p>
          </div>

          {/* Column 1: Product */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#0f172a] dark:text-[#dae2fd] font-mono text-xs font-bold uppercase tracking-wider mb-1">
              Platform
            </h4>
            <a href="#features" className="text-left hover:text-[#1d4ed8] dark:hover:text-[#f59e0b] transition-colors text-sm">
              Features
            </a>
            <a href="#how-it-works" className="text-left hover:text-[#1d4ed8] dark:hover:text-[#f59e0b] transition-colors text-sm">
              How It Works
            </a>
            <a href="#quick-start" className="text-left hover:text-[#1d4ed8] dark:hover:text-[#f59e0b] transition-colors text-sm">
              Quick Start
            </a>
          </div>

          {/* Column 2: Developers */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#0f172a] dark:text-[#dae2fd] font-mono text-xs font-bold uppercase tracking-wider mb-1">
              Developers
            </h4>
            <button onClick={onOpenDocs} className="text-left hover:text-[#1d4ed8] dark:hover:text-[#f59e0b] transition-colors text-sm cursor-pointer">
              Runtime API Reference
            </button>
            <a href="https://github.com/JQCVSC/FastGem" target="_blank" rel="noopener noreferrer" className="hover:text-[#1d4ed8] dark:hover:text-[#f59e0b] transition-colors text-sm">
              GitHub Repository
            </a>
            <button onClick={onOpenStudio} className="text-left text-[#b45309] dark:text-[#f59e0b] hover:underline transition-colors text-sm font-mono font-semibold cursor-pointer">
              Open Agent Console
            </button>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#0f172a] dark:text-[#dae2fd] font-mono text-xs font-bold uppercase tracking-wider mb-1">
              Legal
            </h4>
            <button onClick={onOpenPrivacy} className="text-left hover:text-[#1d4ed8] dark:hover:text-[#f59e0b] transition-colors text-sm cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenTerms} className="text-left hover:text-[#1d4ed8] dark:hover:text-[#f59e0b] transition-colors text-sm cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#bcc8da] dark:border-[#3c4a46]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#4b5b73] dark:text-[#bacac5]/60">
          <span>© 2026 FastGem. Gemini-native agent runtime.</span>
          <span>Local-first development preview</span>
        </div>
      </div>
    </footer>
  );
};
