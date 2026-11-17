import React from 'react';
import { ArrowLeft, FileText, Scale } from 'lucide-react';

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0b1326] text-[#dae2fd] min-h-screen flex flex-col animate-in fade-in duration-200">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-10 bg-[#060e20]/90 backdrop-blur-md border-b border-[#2b3850]/60 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-medium text-[#ff6b00] hover:text-[#ff8c00] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to home</span>
          </button>

          <div className="flex items-center gap-2">
            <img 
              src="https://i.imgur.com/hkRlTDp.png" 
              alt="FastGem Logo" 
              className="h-7 w-auto object-contain rounded-md shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-sm tracking-tight text-white">FastGem</span>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-16">
        {/* Page Title & Subtitle */}
        <div className="mb-10 pb-8 border-b border-[#2b3850]/60">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6b00]/10 border border-[#ff6b00]/20 text-[#ff6b00] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" /> Legal Agreement
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-base text-[#bacac5] mb-4">
            The terms and conditions for using our service.
          </p>
          <p className="text-xs font-mono text-[#ff6b00] bg-[#131b2e] px-3 py-1.5 rounded-md inline-block border border-[#2b3850]">
            Last updated: 2026-05-21
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-[#bacac5] leading-relaxed text-sm md:text-base">
          {/* Acceptance of Terms */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using this service, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.
            </p>
          </section>

          {/* Description of Service */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Description of Service
            </h2>
            <p>
              We provide a software-as-a-service platform. We may modify, suspend, or discontinue any part of the service at any time, with reasonable notice where possible.
            </p>
          </section>

          {/* User Accounts */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use or security breach.
            </p>
          </section>

          {/* Acceptable Use */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Acceptable Use
            </h2>
            <p>
              You agree not to:
            </p>
            <ul className="space-y-2.5 pt-1">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Violate any applicable laws or regulations.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Infringe on the intellectual property or other rights of any party.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Attempt to gain unauthorized access to our systems or data.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Interfere with or disrupt the integrity or performance of the service.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Use the service to send spam, malware, or other harmful content.</span>
              </li>
            </ul>
          </section>

          {/* Payment and Billing */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Payment and Billing
            </h2>
            <p>
              Paid features are billed in advance for the selected billing period. You are responsible for providing accurate billing information. Refunds are handled on a case-by-case basis in line with our refund policy.
            </p>
          </section>

          {/* Intellectual Property */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Intellectual Property
            </h2>
            <p>
              The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          {/* Termination */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Termination
            </h2>
            <p>
              We may suspend or terminate your access to the service at any time if you violate these terms. You may close your account at any time through your account settings.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of or inability to use the service.
            </p>
          </section>

          {/* Changes to These Terms */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Changes to These Terms
            </h2>
            <p>
              We may modify these Terms at any time. We will notify users of any material changes by updating the date at the top of this page and, where appropriate, sending a notice through the service.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Contact
            </h2>
            <p>
              If you have questions about these Terms, please contact us at the email address provided on our website.
            </p>
          </section>
        </div>

        {/* Back to Home CTA at bottom */}
        <div className="mt-12 pt-8 border-t border-[#2b3850]/60 flex justify-between items-center">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#ff6b00] text-white font-mono text-xs font-bold uppercase rounded-xl hover:bg-[#ea580c] transition-all cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </button>
        </div>
      </main>
    </div>
  );
};
