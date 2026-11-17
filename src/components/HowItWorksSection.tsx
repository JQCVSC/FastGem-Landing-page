import React from 'react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Define an agent',
      description: 'Give the agent a name, description, system instructions, and preferred Gemini model.'
    },
    {
      num: '02',
      title: 'Start the runtime',
      description: 'Run FastGem locally or deploy the runtime to an environment you control.'
    },
    {
      num: '03',
      title: 'Open the console',
      description: 'Connect the website to the runtime using VITE_FASTGEM_RUNTIME_URL.'
    },
    {
      num: '04',
      title: 'Run a session',
      description: 'Open Agent Studio and send prompts through the selected agent.'
    },
    {
      num: '05',
      title: 'Integrate your application',
      description: 'Use the FastGem HTTP API to connect your own frontend, service, automation, or internal tool.'
    }
  ];

  return (
    <section className="w-full py-24 px-6 bg-[#0b1326]" id="how-it-works">
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-[700px] mb-14">
          <span className="spectrum-gradient-text font-mono text-xs uppercase tracking-widest block mb-3 font-extrabold">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#dae2fd] tracking-tight">
            From definition to running session in five steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#131d33] border border-[#2b3850] rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-sm font-extrabold spectrum-gradient-text block mb-4">
                  Step {step.num}
                </span>
                <h3 className="text-lg font-bold text-[#f1f5f9] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[#bacac5] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
