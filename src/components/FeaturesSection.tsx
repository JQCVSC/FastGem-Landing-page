import React, { useState } from 'react';
import { FEATURE_CARDS } from '../data/mockData';
import { FeatureCard } from '../types';
import { ChevronRight, Sparkles, Check, X } from 'lucide-react';

interface FeaturesSectionProps {
  onSelectFeature?: (feature: FeatureCard) => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onSelectFeature }) => {
  const [activeModalFeature, setActiveModalFeature] = useState<FeatureCard | null>(null);

  const handleCardClick = (card: FeatureCard) => {
    setActiveModalFeature(card);
    if (onSelectFeature) {
      onSelectFeature(card);
    }
  };

  return (
    <section className="w-full py-28 px-6 bg-[#0b1326]" id="features">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="px-3.5 py-1 rounded-full spectrum-badge font-mono text-xs uppercase tracking-widest inline-block mb-4">
            <span className="spectrum-gradient-text font-extrabold">Core Architecture</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#dae2fd] tracking-tight">
            Everything an agent needs, built in
          </h2>
          <p className="text-[#bacac5] text-base md:text-lg mt-4 max-w-[800px] mx-auto leading-relaxed">
            FastGem handles Gemini API communication, function execution, tool routing, and session state — so you can focus on building your agents.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="bg-[#1E293B] p-8 rounded-xl border border-[#3c4a46]/20 hover:border-[#a855f7]/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)] hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Subtle accent hover background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ef4444]/10 via-[#10b981]/10 to-[#a855f7]/10 rounded-bl-full pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#0b1326] border border-[#3c4a46]/30 flex items-center justify-center group-hover:scale-110 transition-transform text-2xl shadow-inner">
                    {card.emoji}
                  </div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider spectrum-badge px-2.5 py-1 rounded">
                    <span className="spectrum-gradient-text">{card.tag}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#dae2fd] mb-3 group-hover:text-[#f59e0b] transition-colors">
                  {card.title}
                </h3>

                <p className="text-[#bacac5] text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#3c4a46]/20 flex items-center justify-between font-mono text-xs text-[#3b82f6] group-hover:text-[#a855f7] group-hover:translate-x-1 transition-all">
                <span>Explore Capabilities</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {activeModalFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#131b2e] border border-[#ff6b00]/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(255,107,0,0.2)]">
            <button 
              onClick={() => setActiveModalFeature(null)}
              className="absolute top-4 right-4 text-[#bacac5] hover:text-[#dae2fd] p-1.5 rounded-lg hover:bg-[#171f33]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#0b1326] border border-[#ff6b00]/30 flex items-center justify-center text-3xl">
                {activeModalFeature.emoji}
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#ff6b00] dark:text-[#ff8c00]">
                  {activeModalFeature.tag}
                </span>
                <h3 className="text-2xl font-bold text-[#dae2fd]">
                  {activeModalFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-[#bacac5] text-sm leading-relaxed mb-6">
              {activeModalFeature.description}
            </p>

            <div className="space-y-3 bg-[#060e20] p-4 rounded-xl border border-[#3c4a46]/30 mb-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#ff6b00] dark:text-[#ff8c00] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Key Architectural Specs:
              </h4>
              {activeModalFeature.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#dae2fd]">
                  <Check className="w-4 h-4 text-[#ff6b00] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModalFeature(null)}
              className="w-full py-3 bg-[#ff6b00] text-white font-mono text-xs font-bold uppercase rounded-lg hover:bg-[#ea580c] transition-all text-center cursor-pointer"
            >
              Close Technical Specs
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
