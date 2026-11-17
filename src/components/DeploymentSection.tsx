import React, { useState } from 'react';
import { DEPLOY_ENVS } from '../data/mockData';
import { Cpu, Server, CheckCircle2, ShieldCheck, Terminal, Layers } from 'lucide-react';

export const DeploymentSection: React.FC = () => {
  const [selectedEnv, setSelectedEnv] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#060e20] py-24 border-y border-[#3c4a46]/20" id="deploy">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div className="max-w-[700px]">
            <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest mb-3 block font-extrabold">
              Deployment
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#dae2fd] tracking-tight">
              Run it anywhere
            </h2>
            <p className="text-[#bacac5] text-base md:text-lg mt-4 leading-relaxed">
              From your laptop to Firebase Cloud Functions or a Kubernetes cluster — the same streamlined runtime, with Firestore or SQLite as your source of truth.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#131b2e] p-1.5 px-3 rounded-lg border border-[#3b82f6]/30 font-mono text-xs text-[#bacac5]">
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            <span>Zero-dependency runtime architecture</span>
          </div>
        </div>

        {/* Environment Table */}
        <div className="overflow-x-auto rounded-xl border border-[#3c4a46]/20 bg-[#0b1326]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#3c4a46]/30 bg-[#131b2e]/80">
                <th className="py-5 px-6 font-mono text-xs text-[#bacac5] uppercase tracking-widest">Environment</th>
                <th className="py-5 px-6 font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#f59e0b]">token</span> 
                  <span className="spectrum-gradient-text font-extrabold">FastGemini Support Status</span>
                </th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {DEPLOY_ENVS.map((env) => (
                <tr 
                  key={env.name}
                  onClick={() => setSelectedEnv(selectedEnv === env.name ? null : env.name)}
                  className={`border-b border-[#3c4a46]/10 hover:bg-[#131b2e] transition-colors cursor-pointer ${
                    selectedEnv === env.name ? 'bg-[#171f33]' : ''
                  }`}
                >
                  <td className="py-5 px-6 text-[#dae2fd] font-medium flex items-center gap-3">
                    {env.name.includes('Local') && <Terminal className="w-4 h-4 text-[#ef4444]" />}
                    {env.name.includes('Firebase') && <Server className="w-4 h-4 text-[#f59e0b]" />}
                    {env.name.includes('Docker') && <Layers className="w-4 h-4 text-[#10b981]" />}
                    {env.name.includes('Kubernetes') && <Cpu className="w-4 h-4 text-[#3b82f6]" />}
                    <span>{env.name}</span>
                  </td>
                  <td className="py-5 px-6 text-[#a855f7] font-bold">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" />
                        {env.support}
                      </span>
                      <span className="text-xs text-[#bacac5]/60 font-normal hidden sm:inline-block">
                        {env.description}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feature snippet footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#131b2e] border border-[#3c4a46]/20 flex items-start gap-3">
            <span className="text-[#ff6b00] dark:text-[#ff8c00] font-mono text-lg font-bold">01</span>
            <div>
              <h4 className="text-[#dae2fd] font-semibold text-sm">Portable State</h4>
              <p className="text-[#bacac5] text-xs mt-1">Switch between SQLite on local dev and Firestore in Cloud production seamlessly.</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#131b2e] border border-[#3c4a46]/20 flex items-start gap-3">
            <span className="text-[#ff6b00] dark:text-[#ff8c00] font-mono text-lg font-bold">02</span>
            <div>
              <h4 className="text-[#dae2fd] font-semibold text-sm">Lightweight Footprint</h4>
              <p className="text-[#bacac5] text-xs mt-1">Single-digit millisecond boot time with minimal memory overhead.</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#131b2e] border border-[#3c4a46]/20 flex items-start gap-3">
            <span className="text-[#ff6b00] dark:text-[#ff8c00] font-mono text-lg font-bold">03</span>
            <div>
              <h4 className="text-[#dae2fd] font-semibold text-sm">Native Multimodal</h4>
              <p className="text-[#bacac5] text-xs mt-1">Stream audio, video, and image frames directly into agent tools without decoding lag.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
