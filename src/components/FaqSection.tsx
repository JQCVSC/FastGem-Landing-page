import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';

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
    <section className="w-full py-24 px-6 bg-[#d5dde8] dark:bg-[#060e20] border-t border-[#bcc8da] dark:border-[#3c4a46]/20 transition-colors" id="faq">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest inline-block mb-3 font-extrabold">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] dark:text-[#dae2fd] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-[#4b5b73] dark:text-[#bacac5]/60 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. sessions, authentication, models)..."
            className="w-full bg-[#eaeff6] dark:bg-[#131b2e] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl pl-11 pr-4 py-3 text-sm text-[#0f172a] dark:text-[#dae2fd] placeholder-[#64748b] dark:placeholder-[#bacac5]/50 focus:outline-none focus:border-[#7e22ce] dark:focus:border-[#a855f7] transition-colors"
          />
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-[#eaeff6] dark:bg-[#131d33] rounded-xl border border-[#bcc8da] dark:border-[#2b3850] overflow-hidden transition-all duration-200 hover:border-[#7e22ce]/40 dark:hover:border-[#a855f7]/40"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-semibold text-base sm:text-lg text-[#0f172a] dark:text-[#dae2fd] hover:text-[#b45309] dark:hover:text-[#f59e0b] transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full bg-[#dce3ed] dark:bg-[#0b1326] text-[#4b5b73] dark:text-[#bacac5] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#b45309] dark:text-[#f59e0b]' : ''
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-6 pt-4 text-[#2d3c52] dark:text-[#bacac5] text-sm sm:text-base leading-relaxed border-t border-[#bcc8da]/70 dark:border-[#2b3850]/60 bg-[#dfe5ee]/60 dark:bg-[#0b1326]/40 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 bg-[#eaeff6] dark:bg-[#131b2e] rounded-xl border border-[#bcc8da] dark:border-[#2b3850] text-[#4b5b73] dark:text-[#bacac5]">
              No questions found matching "{searchQuery}". Try a different keyword.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
