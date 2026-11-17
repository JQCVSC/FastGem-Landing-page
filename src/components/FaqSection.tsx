import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQ_ITEMS.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full py-28 px-6 bg-[#0b1326]" id="faq">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="px-3 py-1 bg-[#ff6b00]/10 border border-[#ff6b00]/20 rounded-full text-[#ff6b00] dark:text-[#ff8c00] font-mono text-xs uppercase tracking-widest inline-block mb-3">
            Knowledge Base
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#dae2fd] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-[#bacac5]/60 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. security, frameworks, setup)..."
            className="w-full bg-[#131b2e] border border-[#3c4a46]/30 rounded-xl pl-11 pr-4 py-3 text-sm text-[#dae2fd] placeholder-[#bacac5]/50 focus:outline-none focus:border-[#ff6b00]/50 transition-colors"
          />
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-[#171f33] rounded-xl border border-[#3c4a46]/20 overflow-hidden transition-all duration-200 hover:border-[#ff6b00]/30"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-semibold text-base sm:text-lg text-[#dae2fd] hover:text-[#ff6b00] dark:hover:text-[#ff8c00] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full bg-[#0b1326] text-[#bacac5] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#ff6b00] dark:text-[#ff8c00]' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-6 pt-0 text-[#bacac5] text-sm sm:text-base leading-relaxed border-t border-[#3c4a46]/10 bg-[#131b2e]/50 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 bg-[#131b2e] rounded-xl border border-[#3c4a46]/20 text-[#bacac5]">
              No questions found matching "{searchQuery}". Try a different keyword.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
