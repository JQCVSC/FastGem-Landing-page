import React from 'react';
import { Zap, MessageSquare, Star, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onOpenStudio: () => void;
  onOpenQuickStart: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenStudio, onOpenQuickStart }) => {
  return (
    <section className="relative w-full overflow-hidden px-6 pt-32 pb-24 md:pt-40 md:pb-28 flex flex-col items-center justify-center text-center">
      {/* Ambient Background Glows (Red, Yellow, Green, Blue, Purple) */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#ef4444]/15 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[15%] right-[-10%] w-[45%] h-[45%] bg-[#3b82f6]/15 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-[#a855f7]/15 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[35%] h-[35%] bg-[#10b981]/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="z-10 max-w-[900px] flex flex-col items-center gap-6">
        {/* Top Tagline Badge */}
        <div className="px-4 py-1.5 rounded-full spectrum-badge font-mono text-[11px] font-bold uppercase tracking-widest mb-2 shadow-[0_0_20px_rgba(168,85,247,0.2)] inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ef4444] via-[#10b981] to-[#a855f7] animate-pulse"></span>
          <span className="spectrum-gradient-text">Gemini-Native · High-Throughput Agent Engine</span>
        </div>

        {/* Main Display Title */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold text-[#f1f5f9] leading-[1.1] tracking-tight">
            The fastest way to run your own{' '}
            <span className="spectrum-gradient-text">Gemini AI agents</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#bacac5] max-w-[720px] mx-auto leading-relaxed">
            A lightweight AI agent runtime engineered natively for Google Gemini. Create, manage, and run autonomous AI agents — each with its own personality, 2M+ token memory, skills, and tools.
          </p>

          {/* Feature Specs Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-2 font-mono text-xs text-[#bacac5]/90 uppercase tracking-wider">
            <span className="bg-[#171f33] px-3 py-1 rounded border border-[#ef4444]/30 text-[#f87171]">Gemini 3.6 Flash</span>
            <span className="text-[#3c4a46]">•</span>
            <span className="bg-[#171f33] px-3 py-1 rounded border border-[#f59e0b]/30 text-[#fbbf24]">API-First</span>
            <span className="text-[#3c4a46]">•</span>
            <span className="bg-[#171f33] px-3 py-1 rounded border border-[#10b981]/30 text-[#34d399]">Multi-Agent</span>
            <span className="text-[#3c4a46]">•</span>
            <span className="bg-[#171f33] px-3 py-1 rounded border border-[#3b82f6]/30 text-[#60a5fa]">Perfect Recall</span>
            <span className="text-[#3c4a46]">•</span>
            <span className="bg-[#171f33] px-3 py-1 rounded border border-[#a855f7]/30 text-[#c084fc]">Cloud-Ready</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button 
            onClick={onOpenStudio}
            className="px-8 py-4 bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] text-white font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl hover:opacity-95 hover:scale-[1.03] transition-all shadow-[0_0_30px_rgba(239,68,68,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] flex items-center gap-2.5 cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-current text-white" />
            Get Started
          </button>

          <button 
            onClick={onOpenQuickStart}
            className="px-8 py-4 btn-spectrum-outline font-mono text-xs font-extrabold uppercase tracking-wider rounded-xl flex items-center gap-2.5 cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 text-[#a855f7]" />
            Join Discord
          </button>
        </div>

        {/* GitHub Stars Indicator */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#bacac5]/70 uppercase tracking-widest mt-4">
          <Star className="w-4 h-4 text-[#f59e0b] fill-[#f59e0b]" />
          <span>30.4k+ stars on GitHub</span>
        </div>
      </div>
    </section>
  );
};
