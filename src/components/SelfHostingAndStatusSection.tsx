import React from 'react';
import { ShieldAlert, Check, Clock, Server } from 'lucide-react';

export const SelfHostingAndStatusSection: React.FC = () => {
  const currentIncludes = [
    'A Gemini-powered TypeScript runtime',
    'Agent and session persistence',
    'A connected React console',
    'Agent Studio',
    'Runtime health and agent APIs',
    'Prompt execution endpoints',
    'Streaming endpoint foundations',
    'Local development configuration',
  ];

  const nextStages = [
    'Production authentication',
    'Durable database support',
    'Secure tool execution',
    'Multimodal file context',
    'Agent evaluations',
    'Usage and cost tracking',
    'Deployment templates',
    'External channel integrations',
    'Team and workspace support',
  ];

  return (
    <>
      {/* Self-Hosting & Differentiation Section */}
      <section className="w-full bg-[#060e20] py-24 border-y border-[#3c4a46]/20" id="self-hosting">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Self-Hosting Card */}
            <div className="bg-[#131b2e] border border-[#2b3850] rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Server className="w-4 h-4 text-[#10b981]" />
                  <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest font-extrabold">
                    Self-Hosting
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#dae2fd] tracking-tight">
                  Keep your runtime under your control.
                </h2>
                <p className="text-[#bacac5] text-sm sm:text-base leading-relaxed">
                  FastGem is built for developers who want a clear path from local experimentation to self-hosted deployment.
                </p>
                <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed">
                  Run the runtime on your own machine, server, or cloud environment. Keep your Gemini credentials on the backend, separate the user interface from the agent runtime, and choose your own persistence and authentication strategy as the product matures.
                </p>
              </div>

              <div className="p-4 bg-[#090d16] border border-[#2b3850] rounded-xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#bacac5] leading-relaxed">
                  <strong className="text-[#dae2fd]">Important note:</strong> Production deployment should include authentication, HTTPS, rate limiting, secret management, and a durable database.
                </p>
              </div>
            </div>

            {/* Differentiation Card */}
            <div className="bg-[#131b2e] border border-[#2b3850] rounded-2xl p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest block font-extrabold">
                  Why FastGem
                </span>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#dae2fd] tracking-tight">
                  Focused on Gemini. Deliberately simple.
                </h2>
                <p className="text-[#bacac5] text-sm sm:text-base leading-relaxed">
                  FastGem is not trying to be every agent framework at once.
                </p>
                <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed">
                  It focuses on providing a clear Gemini-native runtime with a practical control plane, persistent sessions, and an API that is easy to understand and extend.
                </p>
                <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed">
                  That makes FastGem a strong foundation for teams that want to build their own agent product instead of adapting a large general-purpose platform.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2b3850]/80 text-xs font-mono text-[#94a3b8]">
                Gemini SDK direct execution · React control plane · TypeScript & Express runtime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status & Roadmap Section */}
      <section className="w-full py-24 px-6 bg-[#0b1326]" id="status">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-[760px] mb-12">
            <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest block mb-3 font-extrabold">
              Current Status
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#dae2fd] tracking-tight">
              A focused foundation under active development.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Currently Includes */}
            <div className="bg-[#131d33] border border-[#2b3850] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#f1f5f9] mb-5">
                FastGem currently includes:
              </h3>
              <ul className="space-y-3">
                {currentIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#dae2fd]">
                    <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Stages */}
            <div className="bg-[#131d33] border border-[#2b3850] rounded-2xl p-8">
              <h3 className="text-lg font-bold text-[#f1f5f9] mb-5">
                The next stages include:
              </h3>
              <ul className="space-y-3">
                {nextStages.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#bacac5]">
                    <Clock className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
