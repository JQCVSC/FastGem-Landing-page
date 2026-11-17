import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { WhatIsSection } from './components/WhatIsSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ConsoleStudioSection } from './components/ConsoleStudioSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { QuickStartSection } from './components/QuickStartSection';
import { RuntimeApiSection } from './components/RuntimeApiSection';
import { SelfHostingAndStatusSection } from './components/SelfHostingAndStatusSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { AgentStudioModal } from './components/AgentStudioModal';
import { DocsModal } from './components/DocsModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { TermsOfServiceModal } from './components/TermsOfServiceModal';
import { AuthModal } from './components/AuthModal';
import { FastGemDashboard } from './components/FastGemDashboard';
import { AgentPreset } from './types';

export default function App() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [selectedAgentPreset, setSelectedAgentPreset] = useState<AgentPreset | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const handleOpenStudio = (agent?: AgentPreset) => {
    if (agent) {
      setSelectedAgentPreset(agent);
    }
    setStudioOpen(true);
  };

  const handleGetStarted = () => {
    if (user) {
      setDashboardOpen(true);
    } else {
      setAuthOpen(true);
    }
  };

  const handleAuthSuccess = (username: string) => {
    setUser(username);
    setAuthOpen(false);
    setDashboardOpen(true);
  };

  const handleScrollToQuickStart = () => {
    const el = document.getElementById('quick-start');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans selection:bg-[#ff6b00]/30 selection:text-[#ff8c00] flex flex-col antialiased">
      {/* Fixed Header */}
      <Header 
        onOpenStudio={handleGetStarted}
        onOpenDocs={() => setDocsOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1 w-full">
        <HeroSection 
          onOpenStudio={handleGetStarted}
          onOpenQuickStart={handleScrollToQuickStart}
        />

        <WhatIsSection />

        <FeaturesSection />

        <ConsoleStudioSection 
          onOpenConsole={handleGetStarted}
          onOpenStudio={() => handleOpenStudio()}
        />

        <HowItWorksSection />

        <QuickStartSection 
          onOpenStudio={handleGetStarted}
        />

        <RuntimeApiSection 
          onOpenDocs={() => setDocsOpen(true)}
        />

        <SelfHostingAndStatusSection />

        <FaqSection />

        <FinalCtaSection 
          onOpenStudio={handleGetStarted}
          onOpenDocs={() => setDocsOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer 
        onOpenStudio={handleGetStarted}
        onOpenDocs={() => setDocsOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        onOpenTerms={() => setTermsOpen(true)}
      />

      {/* Console Entry Modal (Development Preview) */}
      <AuthModal 
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Interactive FastGem Console Dashboard */}
      <FastGemDashboard 
        isOpen={dashboardOpen}
        username={user}
        onClose={() => setDashboardOpen(false)}
        onOpenStudio={(agent) => handleOpenStudio(agent)}
      />

      {/* Interactive Agent Studio */}
      <AgentStudioModal 
        isOpen={studioOpen}
        initialAgent={selectedAgentPreset}
        onClose={() => setStudioOpen(false)}
      />

      <DocsModal 
        isOpen={docsOpen}
        onClose={() => setDocsOpen(false)}
      />

      <PrivacyPolicyModal 
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      <TermsOfServiceModal 
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
      />
    </div>
  );
}
