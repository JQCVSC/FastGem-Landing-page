import React, { useState, useEffect } from 'react';
import { Code, Menu, X, Sun, Moon } from 'lucide-react';
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
        ? 'bg-[#d5dde8]/95 dark:bg-black/95 backdrop-blur-xl border-b border-[#bcc8da] dark:border-[#2b3850]/50 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.8)]' 
        : 'bg-[#d5dde8]/90 dark:bg-black/90 backdrop-blur-xl border-b border-[#bcc8da]/70 dark:border-[#2b3850]/30 shadow-xs dark:shadow-[0_1px_8px_rgba(0,0,0,0.5)]'
    }`}>
      <div className="h-20 max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-8">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center cursor-pointer group shrink-0 bg-[#131b2e] px-2.5 py-1.5 rounded-xl dark:bg-transparent dark:p-0 transition-colors"
        >
          <img 
            src="https://i.imgur.com/hkRlTDp.png" 
            alt="FastGem Logo" 
            className="h-8 dark:h-10 w-auto object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <button 
            onClick={() => scrollToSection('features')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'features' ? 'spectrum-gradient-text font-bold' : 'text-[#2d3c52] hover:text-[#0f172a] dark:text-[#bacac5] dark:hover:text-[#dae2fd]'
            }`}
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'how-it-works' ? 'spectrum-gradient-text font-bold' : 'text-[#2d3c52] hover:text-[#0f172a] dark:text-[#bacac5] dark:hover:text-[#dae2fd]'
            }`}
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('quick-start')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'quick-start' ? 'spectrum-gradient-text font-bold' : 'text-[#2d3c52] hover:text-[#0f172a] dark:text-[#bacac5] dark:hover:text-[#dae2fd]'
            }`}
          >
            Quick Start
          </button>
          <button 
            onClick={() => scrollToSection('runtime-api')}
            className={`font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'runtime-api' ? 'spectrum-gradient-text font-bold' : 'text-[#2d3c52] hover:text-[#0f172a] dark:text-[#bacac5] dark:hover:text-[#dae2fd]'
            }`}
          >
            Runtime
          </button>
          <a 
            href="https://github.com/JQCVSC/FastGem" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-mono text-xs text-[#2d3c52] hover:text-[#0f172a] dark:text-[#bacac5] dark:hover:text-[#dae2fd] transition-colors uppercase tracking-wider whitespace-nowrap shrink-0"
          >
            GitHub
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] text-[#b45309] dark:text-[#f59e0b] hover:bg-[#dce3ed] dark:hover:bg-[#1e2a45] transition-all cursor-pointer flex items-center justify-center shadow-xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in fade-in zoom-in duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-[#4f46e5] animate-in fade-in zoom-in duration-200" />
            )}
          </button>

          <button 
            onClick={onOpenDocs}
            title="Read the Runtime API"
            className="hidden md:flex text-[#2d3c52] dark:text-[#bacac5] hover:text-[#1d4ed8] dark:hover:text-[#3b82f6] transition-colors items-center justify-center p-2 rounded-lg hover:bg-[#eaeff6] dark:hover:bg-[#171f33] cursor-pointer"
          >
            <Code className="w-5 h-5" />
          </button>

          <button 
            onClick={onOpenStudio}
            className="px-5 py-2.5 btn-spectrum text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-lg flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            Open Console
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-[#2d3c52] dark:text-[#bacac5] hover:text-[#0f172a] dark:hover:text-[#dae2fd] p-2 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#dfe5ee] dark:bg-[#060e20] border-b border-[#bcc8da] dark:border-[#3c4a46]/30 px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between py-2 border-b border-[#bcc8da] dark:border-[#3c4a46]/20">
            <span className="font-mono text-xs text-[#4b5b73] dark:text-[#bacac5] uppercase">Appearance</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-lg text-xs font-mono text-[#0f172a] dark:text-[#f59e0b]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#4f46e5]" />}
              <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
            </button>
          </div>
          <button 
            onClick={() => scrollToSection('features')}
            className="text-left font-mono text-sm uppercase text-[#2d3c52] dark:text-[#bacac5] hover:text-[#1d4ed8] dark:hover:text-[#ff6b00] py-2 border-b border-[#bcc8da] dark:border-[#3c4a46]/20"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-left font-mono text-sm uppercase text-[#2d3c52] dark:text-[#bacac5] hover:text-[#1d4ed8] dark:hover:text-[#ff6b00] py-2 border-b border-[#bcc8da] dark:border-[#3c4a46]/20"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('quick-start')}
            className="text-left font-mono text-sm uppercase text-[#2d3c52] dark:text-[#bacac5] hover:text-[#1d4ed8] dark:hover:text-[#ff6b00] py-2 border-b border-[#bcc8da] dark:border-[#3c4a46]/20"
          >
            Quick Start
          </button>
          <button 
            onClick={() => scrollToSection('runtime-api')}
            className="text-left font-mono text-sm uppercase text-[#2d3c52] dark:text-[#bacac5] hover:text-[#1d4ed8] dark:hover:text-[#ff6b00] py-2 border-b border-[#bcc8da] dark:border-[#3c4a46]/20"
          >
            Runtime
          </button>
          <a 
            href="https://github.com/JQCVSC/FastGem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-left font-mono text-sm uppercase text-[#2d3c52] dark:text-[#bacac5] hover:text-[#1d4ed8] dark:hover:text-[#ff6b00] py-2 border-b border-[#bcc8da] dark:border-[#3c4a46]/20"
          >
            GitHub
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenDocs(); }}
            className="text-left font-mono text-sm uppercase text-[#1d4ed8] dark:text-[#ff6b00] py-2 flex items-center gap-2"
          >
            <Code className="w-4 h-4" /> Read the Runtime API
          </button>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenStudio(); }}
            className="w-full mt-2 py-3 btn-spectrum text-white font-mono text-xs font-bold uppercase rounded-lg text-center"
          >
            Open Console
          </button>
        </div>
      )}
    </header>
  );
};
