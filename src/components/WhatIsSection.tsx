import React from 'react';
import { Layers, Terminal, Database } from 'lucide-react';

export const WhatIsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#060e20] py-24 border-y border-[#3c4a46]/20" id="what-is-fastgem">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left heading + narrative */}
          <div className="lg:col-span-7 space-y-5">
            <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest block font-extrabold">
              What Is FastGem?
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#dae2fd] tracking-tight text-balance">
              Your Gemini agents deserve a runtime, not just a prompt box.
            </h2>
            <div className="space-y-4 text-[#bacac5] text-base md:text-lg leading-relaxed pt-2">
              <p>
                FastGem gives you a focused environment for building and operating Gemini agents.
              </p>
              <p>
                Create agents with their own names, descriptions, system instructions, model settings, and session history. Use the web console to inspect your agents and start conversations, or call the runtime directly from your own application.
              </p>
              <p>
                FastGem keeps the architecture simple: a React control plane in front of a TypeScript and Express runtime, with local persistence for agents and sessions.
              </p>
            </div>
          </div>

          {/* Right clean architectural stack summary */}
          <div className="lg:col-span-5 bg-[#131b2e] border border-[#2b3850] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/15 border border-[#3b82f6]/30 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#f1f5f9]">React Control Plane</h3>
                <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">
                  Inspect agents, configure system instructions and models, and run interactive tests inside Agent Studio.
                </p>
              </div>
            </div>

            <div className="h-px bg-[#2b3850]/60" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#a855f7]/15 border border-[#a855f7]/30 flex items-center justify-center shrink-0">
                <Terminal className="w-5 h-5 text-[#a855f7]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#f1f5f9]">TypeScript & Express Runtime</h3>
                <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">
                  A focused HTTP API calling Google’s official Gemini SDK with a clear, inspectable execution path.
                </p>
              </div>
            </div>

            <div className="h-px bg-[#2b3850]/60" />

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center shrink-0">
                <Database className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#f1f5f9]">Local Persistence</h3>
                <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">
                  Stores agents and sessions locally in a straightforward data file for fast iteration and easy inspection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
