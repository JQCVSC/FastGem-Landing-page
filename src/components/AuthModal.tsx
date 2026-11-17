import React, { useState } from 'react';
import { X, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (username: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<'username' | 'email' | 'password'>('password');
  const [isLoading, setIsLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const name = usernameOrEmail.split('@')[0] || 'FastClaw User';
      setSignedInUser(name);
      setTimeout(() => {
        onSuccess(name);
        setSignedInUser(null);
      }, 1000);
    }, 800);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const name = 'Jeremy Codjoe';
      setSignedInUser(name);
      setTimeout(() => {
        onSuccess(name);
        setSignedInUser(null);
      }, 1000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b1326] px-4 py-8 animate-in fade-in duration-200">
      {/* Top Left Close/Back Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 left-6 text-[#bacac5] hover:text-[#dae2fd] flex items-center gap-2 font-mono text-xs uppercase tracking-wider transition-colors bg-[#131b2e] px-3.5 py-2 rounded-xl border border-[#2b3850] hover:border-[#ff6b00]/40 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-[#ff6b00]" /> Back to Home
      </button>

      {/* Main Centered Sign-In Card */}
      <div className="w-full max-w-[420px] flex flex-col items-center text-center">
        {signedInUser ? (
          <div className="bg-[#131b2e] border border-[#ff6b00]/50 p-8 rounded-2xl w-full flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-[#ff6b00]/20 border border-[#ff6b00] flex items-center justify-center text-[#ff6b00]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-[#dae2fd]">Welcome back, {signedInUser}!</h3>
            <p className="text-sm text-[#bacac5]">Redirecting to your FastGem Agent Studio...</p>
          </div>
        ) : (
          <>
            {/* FastGem Logo Image */}
            <div className="mb-3 flex justify-center">
              <img 
                src="https://i.imgur.com/hkRlTDp.png" 
                alt="FastGem Logo" 
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,107,0,0.35)]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Subtitle */}
            <p className="text-[#bacac5] text-sm mb-6">
              {isSignUp ? 'Create your FastGem account' : 'Sign in with your username or email'}
            </p>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-[#131b2e] hover:bg-[#1a253e] text-[#dae2fd] font-medium text-sm rounded-xl border border-[#2b3850] hover:border-[#ff6b00]/40 transition-all flex items-center justify-center gap-3 cursor-pointer mb-4 active:scale-[0.99] disabled:opacity-50 shadow-md"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
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
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="w-full flex items-center mb-5">
              <div className="flex-1 border-t border-[#2b3850]"></div>
              <span className="px-3 text-xs text-[#bacac5] uppercase font-mono tracking-wider">or</span>
              <div className="flex-1 border-t border-[#2b3850]"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              {/* Username / Email field */}
              <div>
                <input
                  type="text"
                  required
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  onFocus={() => setFocusedInput('username')}
                  placeholder={isSignUp ? "username" : "username or email"}
                  className={`w-full bg-[#131b2e] text-[#dae2fd] placeholder-[#62748e] text-sm px-4 py-3.5 rounded-xl focus:outline-none transition-all ${
                    focusedInput === 'username' 
                      ? 'border-2 border-[#ff6b00] shadow-[0_0_15px_rgba(255,107,0,0.25)]' 
                      : 'border border-[#2b3850] hover:border-[#3c4a68]'
                  }`}
                />
              </div>

              {/* Extra Email field for Sign Up mode */}
              {isSignUp && (
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedInput('email')}
                    placeholder="email address"
                    className={`w-full bg-[#131b2e] text-[#dae2fd] placeholder-[#62748e] text-sm px-4 py-3.5 rounded-xl focus:outline-none transition-all ${
                      focusedInput === 'email' 
                        ? 'border-2 border-[#ff6b00] shadow-[0_0_15px_rgba(255,107,0,0.25)]' 
                        : 'border border-[#2b3850] hover:border-[#3c4a68]'
                    }`}
                  />
                </div>
              )}

              {/* Password field */}
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  placeholder="password"
                  className={`w-full bg-[#131b2e] text-[#dae2fd] placeholder-[#62748e] text-sm px-4 py-3.5 rounded-xl focus:outline-none transition-all ${
                    focusedInput === 'password' 
                      ? 'border-2 border-[#ff6b00] shadow-[0_0_15px_rgba(255,107,0,0.25)]' 
                      : 'border border-[#2b3850] hover:border-[#3c4a68]'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#ef4444] via-[#f59e0b] via-[#10b981] via-[#3b82f6] to-[#a855f7] hover:opacity-95 text-white font-extrabold text-sm rounded-xl transition-all shadow-lg active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  isSignUp ? 'Sign up' : 'Sign in'
                )}
              </button>
            </form>

            {/* Toggle Sign In / Sign Up Link */}
            <div className="mt-8 text-sm text-[#bacac5]">
              {isSignUp ? (
                <span>
                  Already have an account?{' '}
                  <button 
                    onClick={() => { setIsSignUp(false); setFocusedInput('password'); }}
                    className="spectrum-gradient-text font-bold hover:underline transition-colors cursor-pointer"
                  >
                    Sign in
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => { setIsSignUp(true); setFocusedInput('username'); }}
                    className="spectrum-gradient-text font-bold hover:underline transition-colors cursor-pointer"
                  >
                    Sign up
                  </button>
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
