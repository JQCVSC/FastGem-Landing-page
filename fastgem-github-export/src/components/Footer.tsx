import React from 'react';

interface FooterProps {
  onOpenStudio: () => void;
  onOpenDocs: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStudio, onOpenDocs, onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="w-full bg-[#060e20] py-16 border-t border-[#3c4a46]/20 text-[#bacac5]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img 
                src="https://i.imgur.com/hkRlTDp.png" 
                alt="FastGem Logo" 
                className="h-8 w-auto object-contain rounded-lg shrink-0" 
                referrerPolicy="no-referrer" 
              />
              <span className="font-bold text-xl text-white tracking-tight">FastGem</span>
            </div>
            <p className="text-sm leading-relaxed text-[#bacac5]/80">
              The Gemini-native AI agent runtime. Yours to run.
            </p>
          </div>

          {/* Column 1: Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#dae2fd] font-mono text-xs font-bold uppercase tracking-wider mb-1">
              Resources
            </h4>
            <button onClick={onOpenDocs} className="text-left hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors text-sm cursor-pointer">
              Documentation
            </button>
            <button onClick={onOpenDocs} className="text-left hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors text-sm cursor-pointer">
              Changelog (v2.5.0)
            </button>
            <button onClick={onOpenDocs} className="text-left hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors text-sm cursor-pointer">
              API Reference
            </button>
          </div>

          {/* Column 2: Community */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#dae2fd] font-mono text-xs font-bold uppercase tracking-wider mb-1">
              Community
            </h4>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors text-sm">
              Discord
            </a>
            <a href="https://github.com/JQCVSC/FastGem" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors text-sm">
              GitHub
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors text-sm">
              Twitter / X
            </a>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[#dae2fd] font-mono text-xs font-bold uppercase tracking-wider mb-1">
              Legal
            </h4>
            <button onClick={onOpenPrivacy} className="text-left hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors text-sm cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={onOpenTerms} className="text-left hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors text-sm cursor-pointer">
              Terms of Service
            </button>
            <button onClick={onOpenStudio} className="text-left text-[#ff6b00] dark:text-[#ff8c00] hover:underline transition-colors text-sm font-mono cursor-pointer">
              ★ Launch Web Studio
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3c4a46]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#bacac5]/60">
          <span>© 2026 FastGem AI. Built for speed.</span>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse"></span>
              System Status: Nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
