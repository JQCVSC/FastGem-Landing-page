import React from 'react';
import { ArrowLeft, Shield, Lock } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
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
            <Lock className="w-3.5 h-3.5" /> Legal & Governance
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-base text-[#bacac5] mb-4">
            How we collect, use, and protect your personal information.
          </p>
          <p className="text-xs font-mono text-[#ff6b00] bg-[#131b2e] px-3 py-1.5 rounded-md inline-block border border-[#2b3850]">
            Last updated: 2026-05-21
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-[#bacac5] leading-relaxed text-sm md:text-base">
          {/* Introduction */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Introduction
            </h2>
            <p>
              We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Information We Collect
            </h2>
            <p>
              We collect the following types of information to provide and improve our service:
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ff6b00] mt-2 shrink-0" />
                <div>
                  <strong className="text-white font-medium">Account Information</strong> — Your name, email address, and other details you provide when creating an account.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ff6b00] mt-2 shrink-0" />
                <div>
                  <strong className="text-white font-medium">Usage Data</strong> — Information about how you interact with the service, including features accessed, frequency of use, and interaction patterns.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ff6b00] mt-2 shrink-0" />
                <div>
                  <strong className="text-white font-medium">Device Information</strong> — Device type, operating system, and browser type, used to optimize compatibility and performance.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ff6b00] mt-2 shrink-0" />
                <div>
                  <strong className="text-white font-medium">Cookies</strong> — Small data files stored on your device to remember preferences and improve your experience.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#ff6b00] mt-2 shrink-0" />
                <div>
                  <strong className="text-white font-medium">Payment Information</strong> — Billing details handled by trusted third-party payment processors. We do not store full card numbers on our servers.
                </div>
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              How We Use Your Information
            </h2>
            <p>
              We use the data we collect to:
            </p>
            <ul className="space-y-2.5 pt-1">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Provide, maintain, and improve the service.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Process transactions and send related confirmations.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Send technical notices, security alerts, and support messages.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Respond to your questions, feedback, and support requests.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] shrink-0" />
                <span>Detect, prevent, and address fraud and abuse.</span>
              </li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-4">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Data Sharing
            </h2>
            <p>
              We do not sell your personal information. We may share data only in these limited cases:
            </p>
            <ul className="space-y-2.5 pt-1">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] mt-2 shrink-0" />
                <span>With service providers who help us operate the service, under confidentiality agreements.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] mt-2 shrink-0" />
                <span>To comply with legal obligations or respond to lawful requests from public authorities.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] mt-2 shrink-0" />
                <span>To protect our rights, property, or safety, or that of our users.</span>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Data Security
            </h2>
            <p>
              We implement industry-standard security measures including encryption in transit, access controls, and regular reviews. No method of transmission over the Internet is 100% secure, but we work continuously to protect your information.
            </p>
          </section>

          {/* Your Rights */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Your Rights
            </h2>
            <p>
              You have the right to access, update, export, or delete your personal information. You can do this through your account settings or by contacting us at the email address below.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by updating the date at the top of this page and, where appropriate, sending a notice through the service.
            </p>
          </section>

          {/* Contact Us */}
          <section className="bg-[#131b2e]/60 border border-[#2b3850]/60 rounded-2xl p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold text-white tracking-tight">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at the email address provided on our website.
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
