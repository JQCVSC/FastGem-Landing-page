import React, { useState } from 'react';
import { FEATURE_CARDS } from '../data/mockData';
import { FeatureCard } from '../types';
import { ChevronRight, Check, X } from 'lucide-react';

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
    <section className="w-full py-24 px-6 bg-[#dfe5ee] dark:bg-[#0b1326] transition-colors" id="features">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest inline-block mb-3 font-extrabold">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] dark:text-[#dae2fd] tracking-tight text-balance max-w-[820px] mx-auto">
            Everything you need to start building Gemini agents.
          </h2>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_CARDS.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="bg-[#eaeff6] dark:bg-[#131d33] p-8 rounded-2xl border border-[#bcc8da] dark:border-[#2b3850] hover:border-[#7e22ce]/50 dark:hover:border-[#a855f7]/50 transition-all duration-200 group cursor-pointer flex flex-col justify-between hover:-translate-y-0.5 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-[#4b5b73] dark:text-[#94a3b8]">
                    0{index + 1}
                  </span>
                  <span className="text-xl" aria-hidden="true">
                    {card.emoji}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0f172a] dark:text-[#f1f5f9] mb-1.5 group-hover:text-[#b45309] dark:group-hover:text-[#f59e0b] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-mono text-[#0369a1] dark:text-[#38bdf8] mb-3 font-medium">
                  {card.subtitle}
                </p>

                <p className="text-[#2d3c52] dark:text-[#bacac5] text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#bcc8da] dark:border-[#2b3850]/80 flex items-center justify-between font-mono text-xs text-[#1d4ed8] dark:text-[#3b82f6] group-hover:text-[#7e22ce] dark:group-hover:text-[#a855f7] transition-colors font-medium">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Detail Modal */}
      {activeModalFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#eaeff6] dark:bg-[#131b2e] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
            <button 
              onClick={() => setActiveModalFeature(null)}
              className="absolute top-4 right-4 text-[#4b5b73] dark:text-[#bacac5] hover:text-[#0f172a] dark:hover:text-[#dae2fd] p-1.5 rounded-lg hover:bg-[#dce3ed] dark:hover:bg-[#171f33] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#dce3ed] dark:bg-[#0b1326] border border-[#bcc8da] dark:border-[#2b3850] flex items-center justify-center text-2xl">
                {activeModalFeature.emoji}
              </div>
              <div>
                <p className="font-mono text-xs text-[#0369a1] dark:text-[#38bdf8] font-medium">
                  {activeModalFeature.subtitle}
                </p>
                <h3 className="text-2xl font-bold text-[#0f172a] dark:text-[#dae2fd]">
                  {activeModalFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-[#2d3c52] dark:text-[#bacac5] text-sm leading-relaxed mb-6">
              {activeModalFeature.description}
            </p>

            <div className="space-y-3 bg-[#dfe5ee] dark:bg-[#060e20] p-4 rounded-xl border border-[#bcc8da] dark:border-[#2b3850] mb-6">
              {activeModalFeature.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#0f172a] dark:text-[#dae2fd]">
                  <Check className="w-4 h-4 text-[#047857] dark:text-[#10b981] shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveModalFeature(null)}
              className="w-full py-3 btn-spectrum text-white font-mono text-xs font-bold uppercase rounded-xl transition-all text-center cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
