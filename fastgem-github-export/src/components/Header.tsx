import React, { useState, useEffect } from 'react';
import { Terminal, Code, MessageSquare, User, ArrowRight, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenStudio: () => void;
  onOpenDocs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenStudio, onOpenDocs }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-xl border-b border-[#2b3850]/50 shadow-[0_4px_20px_rgba(0,0,0,0.8)]' 
        : 'bg-black/90 backdrop-blur-xl border-b border-[#2b3850]/30 shadow-[0_1px_8px_rgba(0,0,0,0.5)]'
    }`}>
      <div className="h-20 max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer group"
        >
          <img 
            src="https://i.imgur.com/hkRlTDp.png" 
            alt="FastGem Logo" 
            className="h-10 w-auto object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 px-8">
          <button 
            onClick={() => scrollToSection('features')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'features' ? 'spectrum-gradient-text font-bold' : 'text-[#bacac5] hover:text-[#dae2fd]'
            }`}
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('quick-start')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'quick-start' ? 'spectrum-gradient-text font-bold' : 'text-[#bacac5] hover:text-[#dae2fd]'
            }`}
          >
            Quick Start
          </button>
          <button 
            onClick={() => scrollToSection('deploy')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'deploy' ? 'spectrum-gradient-text font-bold' : 'text-[#bacac5] hover:text-[#dae2fd]'
            }`}
          >
            Deploy
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors ${
              activeTab === 'faq' ? 'spectrum-gradient-text font-bold' : 'text-[#bacac5] hover:text-[#dae2fd]'
            }`}
          >
            FAQ
          </button>
          <a 
            href="https://github.com/JQCVSC/FastGem" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#bacac5] hover:text-[#dae2fd] transition-colors uppercase tracking-wider"
          >
            GitHub
          </a>

        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl bg-[#131d33] border border-[#2b3850] text-[#f59e0b] hover:bg-[#1e2a45] transition-all cursor-pointer flex items-center justify-center shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in fade-in zoom-in duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-purple-400 animate-in fade-in zoom-in duration-200" />
            )}
          </button>

          <div className="hidden md:flex items-center gap-3 border-r border-[#3c4a46]/30 pr-3">
            <button 
              onClick={onOpenDocs}
              title="View Code & API Specs"
              className="text-[#bacac5] hover:text-[#3b82f6] transition-colors flex items-center justify-center p-1.5 rounded-lg hover:bg-[#171f33]"
            >
              <Code className="w-5 h-5" />
            </button>
            <a 
              href="#faq"
              onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
              title="Community & Forum"
              className="text-[#bacac5] hover:text-[#a855f7] transition-colors flex items-center justify-center p-1.5 rounded-lg hover:bg-[#171f33]"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>

          <button 
            onClick={onOpenStudio}
            className="px-5 py-2.5 bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-lg hover:opacity-95 hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] flex items-center gap-2 cursor-pointer"
          >
            Get Started →
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#bacac5] hover:text-[#dae2fd] p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#060e20] border-b border-[#3c4a46]/30 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between py-2 border-b border-[#3c4a46]/20">
            <span className="font-mono text-xs text-[#bacac5] uppercase">Appearance</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#131d33] border border-[#2b3850] rounded-lg text-xs font-mono text-[#ff6b00]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#ea580c]" />}
              <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
          <button 
            onClick={() => scrollToSection('features')}
            className="text-left font-mono text-sm uppercase text-[#bacac5] hover:text-[#ff6b00] py-2 border-b border-[#3c4a46]/20"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('quick-start')}
            className="text-left font-mono text-sm uppercase text-[#bacac5] hover:text-[#ff6b00] py-2 border-b border-[#3c4a46]/20"
          >
            Quick Start
          </button>
          <button 
            onClick={() => scrollToSection('deploy')}
            className="text-left font-mono text-sm uppercase text-[#bacac5] hover:text-[#ff6b00] py-2 border-b border-[#3c4a46]/20"
          >
            Deploy
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="text-left font-mono text-sm uppercase text-[#bacac5] hover:text-[#ff6b00] py-2 border-b border-[#3c4a46]/20"
          >
            FAQ
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenDocs(); }}
            className="text-left font-mono text-sm uppercase text-[#ff6b00] py-2 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Interactive API Docs
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenStudio(); }}
            className="w-full mt-2 py-3 bg-[#ff6b00] text-white font-mono text-xs font-bold uppercase rounded-lg text-center"
          >
            Test Agent Studio Live
          </button>
        </div>
      )}
    </header>
  );
};

