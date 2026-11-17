import React, { useState } from 'react';
import { Upload, Save, X, Check, User, Globe } from 'lucide-react';

interface AccountViewProps {
  userEmail?: string;
  onClose?: () => void;
  standalone?: boolean;
  initialTab?: 'account' | 'general';
}

export const AccountView: React.FC<AccountViewProps> = ({
  userEmail = 'jeremycodjoe@gmail.com',
  onClose,
  standalone = false,
  initialTab = 'account',
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'general'>(initialTab);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  const [username, setUsername] = useState('jembuildz');
  const [email, setEmail] = useState(userEmail);
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordUpdated(true);
    setTimeout(() => {
      setPasswordUpdated(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 2000);
  };

  return (
    <div className={`w-full min-h-[600px] flex flex-col md:flex-row gap-8 text-[#dae2fd] rounded-2xl ${standalone ? 'p-6 sm:p-8' : ''} antialiased`}>
      {/* Sub-sidebar for USER section matching landing page palette */}
      <div className="w-full md:w-56 shrink-0 space-y-3 border-b md:border-b-0 md:border-r border-[#2b3850]/60 pb-6 md:pb-0 md:pr-6">
        <div className="text-[11px] font-semibold text-[#bacac5] uppercase tracking-wider px-3 mb-2">
          USER
        </div>
        
        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'account'
                ? 'bg-[#1e2a45] text-[#ff6b00] dark:text-[#ff8c00] font-semibold border border-[#ff6b00]/30 shadow-sm'
                : 'text-[#bacac5] hover:text-white hover:bg-[#18233a]'
            }`}
          >
            <User className="w-4 h-4 text-[#ff8c00] shrink-0" />
            <span>Account</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'bg-[#1e2a45] text-[#ff6b00] dark:text-[#ff8c00] font-semibold border border-[#ff6b00]/30 shadow-sm'
                : 'text-[#bacac5] hover:text-white hover:bg-[#18233a]'
            }`}
          >
            <Globe className="w-4 h-4 text-[#38bdf8] shrink-0" />
            <span>General</span>
          </button>
        </nav>
      </div>

      {/* Main Account Settings Content Area */}
      <div className="flex-1 max-w-4xl space-y-6">
        {/* ------------ HEADER ------------ */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#dae2fd]">
              {activeTab === 'account' ? 'Account' : 'General Settings'}
            </h1>
            <p className="text-xs sm:text-sm text-[#bacac5] mt-1 font-sans">
              {activeTab === 'account' ? 'Profile, password, and session.' : 'Global application preferences.'}
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-[#bacac5] hover:text-white hover:bg-[#1e2a45] rounded-xl transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {activeTab === 'account' ? (
          <div className="space-y-6">
            {/* ------------ CARD 1: PROFILE ------------ */}
            <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
              {/* Avatar & Upload button */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#18233a] border border-[#ff6b00]/40 flex items-center justify-center text-[#ff8c00] font-bold text-xl uppercase shadow-inner">
                  {username.substring(0, 2) || 'JE'}
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#131d33] border border-[#2b3850] rounded-xl text-xs sm:text-sm font-medium text-[#dae2fd] hover:bg-[#1e2a45] hover:border-[#ff6b00]/40 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-[#ff8c00]" />
                  <span>Upload avatar</span>
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* Row 1: Username & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs sm:text-sm font-medium text-[#dae2fd] mb-1.5 block">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#131d33] border border-[#2b3850] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#dae2fd] focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-medium text-[#dae2fd] mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#131d33] border border-[#2b3850] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#dae2fd] focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Display name */}
                <div>
                  <label className="text-xs sm:text-sm font-medium text-[#dae2fd] mb-1.5 block">
                    Display name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="How your name appears in the dashboard"
                    className="w-full bg-[#131d33] border border-[#2b3850] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#dae2fd] placeholder:text-[#bacac5]/50 focus:outline-none focus:border-[#ff6b00] transition-colors"
                  />
                </div>

                {/* Save profile button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#ff6b00] hover:bg-[#ff8c00] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-[#ff6b00]/20 flex items-center gap-2 cursor-pointer"
                  >
                    {profileSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    <span>{profileSaved ? 'Profile saved' : 'Save profile'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* ------------ CARD 2: CHANGE PASSWORD ------------ */}
            <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 space-y-5 shadow-md">
              <div>
                <h3 className="text-sm sm:text-base font-medium text-[#dae2fd]">
                  Change password
                </h3>
                <p className="text-xs text-[#bacac5] mt-1">
                  You'll need your current password. You'll be signed out and asked to sign back in.
                </p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#dae2fd] mb-1.5 block">
                      Current
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-[#131d33] border border-[#2b3850] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#dae2fd] focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#dae2fd] mb-1.5 block">
                      New
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#131d33] border border-[#2b3850] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#dae2fd] focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#dae2fd] mb-1.5 block">
                      Confirm
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#131d33] border border-[#2b3850] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#dae2fd] focus:outline-none focus:border-[#ff6b00] transition-colors"
                    />
                  </div>
                </div>

                {/* Update password button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#ff6b00] hover:bg-[#ff8c00] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md shadow-[#ff6b00]/20 flex items-center gap-2 cursor-pointer"
                  >
                    {passwordUpdated ? <Check className="w-4 h-4" /> : null}
                    <span>{passwordUpdated ? 'Password updated' : 'Update password'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* ------------ GENERAL SETTINGS TAB ------------ */
          <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
            <div>
              <h3 className="text-base font-semibold text-[#dae2fd]">System Preferences</h3>
              <p className="text-xs text-[#bacac5] mt-1">Configure workspace defaults and telemetry.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#131d33] rounded-xl border border-[#2b3850]">
                <div>
                  <div className="text-sm font-medium text-[#dae2fd]">Dark Mode Interface</div>
                  <div className="text-xs text-[#bacac5]">Sync with browser system settings</div>
                </div>
                <input type="checkbox" defaultChecked className="toggle accent-[#ff6b00] rounded" />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#131d33] rounded-xl border border-[#2b3850]">
                <div>
                  <div className="text-sm font-medium text-[#dae2fd]">Automatic Agent Checkpoints</div>
                  <div className="text-xs text-[#bacac5]">Save agent state snapshot after execution loops</div>
                </div>
                <input type="checkbox" defaultChecked className="toggle accent-[#ff6b00] rounded" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

