import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Info } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [focusedInput, setFocusedInput] = useState<'username' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const name = usernameOrEmail.trim().split('@')[0] || 'Developer';
      setSignedInUser(name);
      setTimeout(() => {
        onSuccess(name);
        setSignedInUser(null);
      }, 700);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1326] px-4 py-8 animate-in fade-in duration-200">
      {/* Top Left Close/Back Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 text-[#bacac5] hover:text-[#dae2fd] flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors bg-[#131b2e] px-3.5 py-2 rounded-xl border border-[#2b3850] hover:border-[#a855f7]/40 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-[#f59e0b]" /> Back to Home
      </button>

      {/* Main Centered Console Entry Card */}
      <div className="w-full max-w-[440px] flex flex-col items-center text-center">
        {signedInUser ? (
          <div className="bg-[#131b2e] border border-[#2b3850] p-8 rounded-2xl w-full flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#dae2fd]">Opening console, {signedInUser}</h3>
            <p className="text-sm text-[#bacac5]">Loading the FastGem development console...</p>
          </div>
        ) : (
          <div className="w-full bg-[#131b2e] border border-[#2b3850] rounded-2xl p-8 shadow-2xl">
            {/* FastGem Logo Image */}
            <div className="mb-4 flex justify-center">
              <img 
                src="https://i.imgur.com/hkRlTDp.png" 
                alt="FastGem Logo" 
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Heading */}
            <h2 className="text-2xl font-bold text-[#f1f5f9] tracking-tight mb-2">
              Enter the FastGem console
            </h2>

            {/* Supporting copy */}
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
              Open the development console to configure agents, inspect runtime capabilities, and test Gemini sessions.
            </p>

            {/* Google OAuth Coming Soon Button */}
            <button
              type="button"
              disabled
              className="w-full py-3.5 px-4 bg-[#090d16] text-[#94a3b8] font-medium text-sm rounded-xl border border-[#2b3850] flex items-center justify-center gap-3 mb-4 opacity-70 cursor-not-allowed"
            >
              <svg className="w-5 h-5 shrink-0 opacity-60" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google — coming soon</span>
            </button>

            {/* Divider */}
            <div className="w-full flex items-center mb-4">
              <div className="flex-1 border-t border-[#2b3850]"></div>
              <span className="px-3 text-xs text-[#64748b] uppercase font-mono tracking-wider">or</span>
              <div className="flex-1 border-t border-[#2b3850]"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <div>
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Display name for this session (optional)"
                  className={`w-full bg-[#090d16] text-[#dae2fd] placeholder-[#64748b] text-sm px-4 py-3.5 rounded-xl focus:outline-none transition-all ${
                    focusedInput === 'username' 
                      ? 'border-2 border-[#a855f7]' 
                      : 'border border-[#2b3850] hover:border-[#3c4a68]'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 btn-spectrum hover:opacity-95 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Continue to Console'
                )}
              </button>
            </form>

            {/* Disclaimer */}
            <div className="mt-6 p-3 bg-[#090d16] border border-[#2b3850] rounded-xl flex items-start gap-2.5 text-left">
              <Info className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Development preview — production authentication is not enabled yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
