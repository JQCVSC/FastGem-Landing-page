import React, { useState } from 'react';
import { CreateAgentModal } from './CreateAgentModal';
import { ChannelsView } from './ChannelsView';
import { ModelsView } from './ModelsView';
import { AccountView } from './AccountView';
import { McpView } from './McpView';
import { SkillsView } from './SkillsView';
import { TokenUsageView } from './TokenUsageView';
import { SchedulerView } from './SchedulerView';
import { AGENT_PRESETS } from '../data/mockData';
import { AgentPreset } from '../types';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  Bot, 
  Cpu, 
  KeyRound, 
  Settings, 
  ChevronsUpDown, 
  PanelLeft, 
  Plus, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  Eye, 
  EyeOff, 
  LogOut, 
  ArrowLeft,
  Flame,
  MessageSquare,
  Key,
  X,
  Pencil,
  Radio,
  User,
  Server,
  Coins,
  Clock,
  Sun,
  Moon
} from 'lucide-react';

interface FastGemDashboardProps {
  isOpen: boolean;
  username: string | null;
  onClose: () => void;
  onOpenStudio: (agent?: AgentPreset) => void;
}

export const FastGemDashboard: React.FC<FastGemDashboardProps> = ({
  isOpen,
  username,
  onClose,
  onOpenStudio
}) => {
  const { theme, toggleTheme } = useTheme();
  const [activeNav, setActiveNav] = useState<'overview' | 'agents' | 'models' | 'apikeys' | 'settings' | 'account' | 'general' | 'channels' | 'mcp' | 'skills' | 'tokenusage' | 'scheduler'>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [agents, setAgents] = useState<Array<{ id: string; name: string; model: string; status: 'active' | 'idle' }>>([
    { id: '1', name: 'SOUL.md — Tech Researcher', model: 'Gemini 3.1 Pro', status: 'active' },
    { id: '2', name: 'SOUL.md — Code Architect', model: 'Gemini 3.6 Flash', status: 'active' }
  ]);
  const [apiKeys, setApiKeys] = useState<Array<{ id: string; name: string; key: string; created: string }>>([]);
  const [showKeySecret, setShowKeySecret] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [newKeyType, setNewKeyType] = useState<'User' | 'Agent'>('User');

  const [defaultModel, setDefaultModel] = useState('gemini/gemini-3.6-flash');
  const [isOverride, setIsOverride] = useState(true);
  const [testedProviderStatus, setTestedProviderStatus] = useState<Record<string, 'idle' | 'testing' | 'success' | 'failed'>>({});
  const [copiedBaseUrl, setCopiedBaseUrl] = useState<string | null>(null);
  const [providers, setProviders] = useState<Array<{
    id: string;
    name: string;
    apiBase: string;
    apiKey: string;
    models: number;
    source: string;
    status: string;
  }>>([
    {
      id: 'prov_1',
      name: 'google-gemini',
      apiBase: 'https://generativelanguage.googleapis.com',
      apiKey: 'AIzaSy****FastGem',
      models: 3,
      source: 'Native Google Gemini',
      status: 'Active'
    }
  ]);
  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);
  const [editingProviderId, setEditingProviderId] = useState<string | null>(null);
  const [provNameInput, setProvNameInput] = useState('');
  const [provBaseInput, setProvBaseInput] = useState('');
  const [provKeyInput, setProvKeyInput] = useState('');
  const [provModelsCountInput, setProvModelsCountInput] = useState(1);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  const availableModelOptions = [
    'gemini/gemini-3.6-flash',
    'gemini/gemini-3.1-pro',
    'gemini/gemini-3.0-flash-lite',
    'fastgem/fastgem-runtime-latest',
    'openai/gpt-4o'
  ];

  const handleOpenAddProvider = () => {
    setEditingProviderId(null);
    setProvNameInput('');
    setProvBaseInput('https://generativelanguage.googleapis.com');
    setProvKeyInput('');
    setProvModelsCountInput(3);
    setIsAddProviderOpen(true);
  };

  const handleEditProvider = (p: typeof providers[0]) => {
    setEditingProviderId(p.id);
    setProvNameInput(p.name);
    setProvBaseInput(p.apiBase);
    setProvKeyInput(p.apiKey);
    setProvModelsCountInput(p.models || 1);
    setIsAddProviderOpen(true);
  };

  const handleSaveProvider = () => {
    if (!provNameInput.trim()) return;
    if (editingProviderId) {
      setProviders(providers.map(p => p.id === editingProviderId ? {
        ...p,
        name: provNameInput.trim(),
        apiBase: provBaseInput.trim() || 'http://clawrouter-api-svc.workany:3000',
        apiKey: provKeyInput.trim() || 'sk-h****oXhP',
        models: Number(provModelsCountInput) || 1
      } : p));
    } else {
      setProviders([
        ...providers,
        {
          id: `prov_${Date.now()}`,
          name: provNameInput.trim(),
          apiBase: provBaseInput.trim() || 'http://clawrouter-api-svc.workany:3000',
          apiKey: provKeyInput.trim() || 'sk-h****oXhP',
          models: Number(provModelsCountInput) || 1,
          source: 'Custom',
          status: 'Active'
        }
      ]);
    }
    setIsAddProviderOpen(false);
  };

  const handleDeleteProvider = (id: string) => {
    setProviders(providers.filter(p => p.id !== id));
  };

  const handleTestProviderConnection = (id: string) => {
    setTestedProviderStatus(prev => ({ ...prev, [id]: 'testing' }));
    setTimeout(() => {
      setTestedProviderStatus(prev => ({ ...prev, [id]: 'success' }));
      setTimeout(() => {
        setTestedProviderStatus(prev => ({ ...prev, [id]: 'idle' }));
      }, 3000);
    }, 800);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedBaseUrl(text);
    setTimeout(() => setCopiedBaseUrl(null), 2000);
  };

  const handleSaveModelsConfig = () => {
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  const handleOpenApiKeyModal = () => {
    setNewKeyName('');
    setNewKeyValue('');
    setNewKeyType('User');
    setIsApiKeyModalOpen(true);
  };

  const handleConfirmCreateApiKey = () => {
    const finalKeyString = newKeyValue.trim() 
      ? newKeyValue.trim() 
      : `fc_live_${Math.random().toString(36).substring(2, 12)}...${Math.random().toString(36).substring(2, 6)}`;
    
    const newKey = {
      id: `key_${Date.now()}`,
      name: newKeyName.trim() || `Key #${apiKeys.length + 1}`,
      key: finalKeyString,
      type: newKeyType,
      created: new Date().toISOString().split('T')[0]
    };

    setApiKeys([...apiKeys, newKey]);
    setIsApiKeyModalOpen(false);
  };

  const handleCreateAgent = (data: { name: string; description: string }) => {
    const newAgent = {
      id: `agt_${Math.random().toString(36).substring(2, 8)}`,
      name: data.name,
      model: 'Gemini 3.6 Flash',
      status: 'active' as const,
    };
    setAgents([newAgent, ...agents]);
  };

  if (!isOpen) return null;

  const displayUser = username || 'jembuildz';
  const userInitials = displayUser.substring(0, 2).toUpperCase();

  const handleCreateApiKey = () => {
    const newKey = {
      id: `key_${Date.now()}`,
      name: `Agent Key ${apiKeys.length + 1}`,
      key: `fc_live_${Math.random().toString(36).substring(2, 12)}...${Math.random().toString(36).substring(2, 6)}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleCopyKey = (keyString: string) => {
    navigator.clipboard.writeText(keyString);
    setCopiedKey(keyString);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-[#dfe5ee] dark:bg-[#090d16] text-[#0f172a] dark:text-[#f1f5f9] flex font-sans antialiased overflow-hidden animate-in fade-in duration-200 transition-colors">
      {/* Sidebar */}
      <aside className={`${
        sidebarCollapsed ? 'w-16' : 'w-60'
      } bg-[#d5dde8] dark:bg-[#0f172a] border-r border-[#bcc8da] dark:border-[#2b3850] flex flex-col justify-between transition-all duration-300 shrink-0 select-none`}>
        {/* Top Header / Branding */}
        <div>
          <div className="p-4 border-b border-[#bcc8da] dark:border-[#2b3850]/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden bg-[#131b2e] px-2 py-1 rounded-lg dark:bg-transparent dark:p-0">
              <img 
                src="https://i.imgur.com/hkRlTDp.png" 
                alt="FastGem Logo" 
                className="h-6 dark:h-7 w-auto object-contain rounded-md shrink-0"
                referrerPolicy="no-referrer"
              />
            </div>
            {!sidebarCollapsed && (
              <button className="text-[#4b5b73] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] transition-colors p-1">
                <ChevronsUpDown className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="p-3 space-y-6">
            {/* Overview */}
            <div>
              <button
                onClick={() => setActiveNav('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeNav === 'overview'
                    ? 'bg-[#eaeff6] dark:bg-[#1e2a45] text-[#b45309] dark:text-[#f59e0b] shadow-xs font-semibold border border-[#7e22ce]/30 dark:border-[#a855f7]/30'
                    : 'text-[#2d3c52] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] hover:bg-[#cdd7e5] dark:hover:bg-[#131d33]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0 text-[#b45309] dark:text-[#f59e0b]" />
                {!sidebarCollapsed && <span>Overview</span>}
              </button>
            </div>

            {/* Agent Section */}
            <div>
              {!sidebarCollapsed && (
                <div className="px-3 mb-2 text-[10px] font-mono font-extrabold uppercase tracking-widest spectrum-gradient-text">
                  Agent Runtime
                </div>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveNav('agents')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeNav === 'agents'
                      ? 'bg-[#eaeff6] dark:bg-[#1e2a45] text-[#b45309] dark:text-[#f59e0b] shadow-xs font-semibold border border-[#7e22ce]/30 dark:border-[#a855f7]/30'
                      : 'text-[#2d3c52] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] hover:bg-[#cdd7e5] dark:hover:bg-[#131d33]'
                  }`}
                >
                  <Bot className="w-4 h-4 shrink-0 text-[#7e22ce] dark:text-[#a855f7]" />
                  {!sidebarCollapsed && <span>Agents</span>}
                </button>

                <button
                  onClick={() => setActiveNav('models')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeNav === 'models'
                      ? 'bg-[#eaeff6] dark:bg-[#1e2a45] text-[#b45309] dark:text-[#f59e0b] shadow-xs font-semibold border border-[#7e22ce]/30 dark:border-[#a855f7]/30'
                      : 'text-[#2d3c52] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] hover:bg-[#cdd7e5] dark:hover:bg-[#131d33]'
                  }`}
                >
                  <Cpu className="w-4 h-4 shrink-0 text-[#1d4ed8] dark:text-[#3b82f6]" />
                  {!sidebarCollapsed && <span>Models</span>}
                </button>
              </div>
            </div>

            {/* User Section */}
            <div>
              {!sidebarCollapsed && (
                <div className="px-3 mb-2 text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#4b5b73] dark:text-[#64748b]">
                  Platform
                </div>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveNav('account')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeNav === 'account'
                      ? 'bg-[#eaeff6] dark:bg-[#1e2a45] text-[#b45309] dark:text-[#f59e0b] shadow-xs font-semibold border border-[#7e22ce]/30 dark:border-[#a855f7]/30'
                      : 'text-[#2d3c52] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] hover:bg-[#cdd7e5] dark:hover:bg-[#131d33]'
                  }`}
                >
                  <User className="w-4 h-4 shrink-0 text-[#b45309] dark:text-[#f59e0b]" />
                  {!sidebarCollapsed && <span>Account</span>}
                </button>

                <button
                  onClick={() => setActiveNav('apikeys')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeNav === 'apikeys'
                      ? 'bg-[#eaeff6] dark:bg-[#1e2a45] text-[#b45309] dark:text-[#f59e0b] shadow-xs font-semibold border border-[#7e22ce]/30 dark:border-[#a855f7]/30'
                      : 'text-[#2d3c52] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] hover:bg-[#cdd7e5] dark:hover:bg-[#131d33]'
                  }`}
                >
                  <KeyRound className="w-4 h-4 shrink-0 text-[#047857] dark:text-[#10b981]" />
                  {!sidebarCollapsed && <span>API Keys</span>}
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Bottom: Settings & User Info */}
        <div className="p-3 border-t border-[#bcc8da] dark:border-[#2b3850]/80 space-y-2">
          <button
            onClick={() => setActiveNav('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              activeNav === 'settings'
                ? 'bg-[#eaeff6] dark:bg-[#1e2a45] text-[#b45309] dark:text-[#f59e0b] shadow-xs font-semibold border border-[#7e22ce]/30 dark:border-[#a855f7]/30'
                : 'text-[#2d3c52] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] hover:bg-[#cdd7e5] dark:hover:bg-[#131d33]'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0 text-[#4b5b73] dark:text-[#94a3b8]" />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>

          {/* User Badge */}
          <div className="pt-2">
            <div 
              onClick={() => setActiveNav('account')}
              className={`flex items-center justify-between p-2 rounded-xl hover:bg-[#cdd7e5] dark:hover:bg-[#131d33] transition-colors cursor-pointer group ${
                activeNav === 'account' ? 'bg-[#eaeff6] dark:bg-[#1e2a45] border border-[#7e22ce]/30 dark:border-[#a855f7]/30' : ''
              }`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg spectrum-badge text-[#0f172a] dark:text-[#f1f5f9] font-bold text-xs flex items-center justify-center shrink-0">
                  {userInitials}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-xs font-semibold text-[#0f172a] dark:text-[#f1f5f9] truncate">{displayUser}</span>
                    <span className="text-[10px] text-[#4b5b73] dark:text-[#94a3b8] truncate">Developer</span>
                  </div>
                )}
              </div>
              {!sidebarCollapsed && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  title="Return to Landing Page"
                  className="text-[#4b5b73] dark:text-[#94a3b8] hover:text-[#dc2626] dark:hover:text-[#ef4444] transition-colors p-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#dfe5ee] dark:bg-[#090d16]">
        {/* Top Navbar */}
        <header className="h-14 px-6 border-b border-[#bcc8da] dark:border-[#2b3850] flex items-center justify-between shrink-0 bg-[#d5dde8] dark:bg-[#0f172a]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-[#4b5b73] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] transition-colors p-1.5 rounded-lg hover:bg-[#cdd7e5] dark:hover:bg-[#131d33] cursor-pointer"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-[#4b5b73] dark:text-[#94a3b8] font-mono flex items-center gap-2">
              Gateway: <span className="text-[#047857] dark:text-[#10b981] font-semibold">Connected</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] hover:bg-[#cdd7e5] dark:hover:bg-[#1e2a45] transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#4f46e5]" />
              )}
            </button>
            <div className="spectrum-badge px-3 py-1 rounded-full text-xs font-mono font-bold">
              <span className="spectrum-gradient-text">Gemini Runtime</span>
            </div>
          </div>
        </header>

        {/* Dynamic View Body */}
        <div className="p-8 max-w-6xl w-full mx-auto">
          {activeNav === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Header Titles */}
              <div>
                <h1 className="text-3xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] tracking-tight">Dashboard</h1>
                <p className="text-sm text-[#4b5b73] dark:text-[#94a3b8] mt-1">Monitor your FastGem gateway runtime</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Agents Card */}
                <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] p-6 rounded-2xl flex flex-col justify-between shadow-sm dark:shadow-lg hover:border-[#7e22ce]/50 dark:hover:border-[#a855f7]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4b5b73] dark:text-[#94a3b8] font-medium">Agents</span>
                    <div className="w-9 h-9 rounded-xl bg-[#7e22ce]/12 dark:bg-[#a855f7]/15 text-[#7e22ce] dark:text-[#a855f7] flex items-center justify-center border border-[#7e22ce]/25 dark:border-[#a855f7]/30">
                      <Bot className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-4xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] tabular-nums">{agents.length}</div>
                    <div className="text-xs text-[#4b5b73] dark:text-[#94a3b8] mt-1.5">Active runtime agents</div>
                  </div>
                </div>

                {/* Gateway Models Card */}
                <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] p-6 rounded-2xl flex flex-col justify-between shadow-sm dark:shadow-lg hover:border-[#1d4ed8]/50 dark:hover:border-[#3b82f6]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4b5b73] dark:text-[#94a3b8] font-medium">Models Configured</span>
                    <div className="w-9 h-9 rounded-xl bg-[#1d4ed8]/12 dark:bg-[#3b82f6]/15 text-[#1d4ed8] dark:text-[#3b82f6] flex items-center justify-center border border-[#1d4ed8]/25 dark:border-[#3b82f6]/30">
                      <Cpu className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-4xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] tabular-nums">3</div>
                    <div className="text-xs text-[#4b5b73] dark:text-[#94a3b8] mt-1.5">Google Gemini Models</div>
                  </div>
                </div>

                {/* API Keys Card */}
                <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] p-6 rounded-2xl flex flex-col justify-between shadow-sm dark:shadow-lg hover:border-[#047857]/50 dark:hover:border-[#10b981]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#4b5b73] dark:text-[#94a3b8] font-medium">API Keys</span>
                    <div className="w-9 h-9 rounded-xl bg-[#047857]/12 dark:bg-[#10b981]/15 text-[#047857] dark:text-[#10b981] flex items-center justify-center border border-[#047857]/25 dark:border-[#10b981]/30">
                      <KeyRound className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-4xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] tabular-nums">{apiKeys.length}</div>
                    <div className="text-xs text-[#4b5b73] dark:text-[#94a3b8] mt-1.5">Active bearer tokens</div>
                  </div>
                </div>
              </div>

              {/* Live Gateway Activity Section */}
              <div className="mt-8 bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-[#0f172a] dark:text-[#f1f5f9]">Active FastGem Agents</h3>
                  <button 
                    onClick={() => onOpenStudio()}
                    className="text-xs text-[#b45309] dark:text-[#f59e0b] hover:underline flex items-center gap-1 cursor-pointer font-mono font-semibold"
                  >
                    Launch Agent View →
                  </button>
                </div>

                <div className="space-y-3">
                  {agents.map((agent) => (
                    <div key={agent.id} className="p-4 bg-[#dce3ed] dark:bg-[#090d16] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7e22ce]/12 dark:bg-[#a855f7]/15 text-[#7e22ce] dark:text-[#a855f7] border border-[#7e22ce]/25 dark:border-[#a855f7]/30 flex items-center justify-center font-bold text-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9]">{agent.name}</div>
                          <div className="text-xs text-[#4b5b73] dark:text-[#94a3b8] mt-0.5">{agent.model}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const preset = AGENT_PRESETS.find(p => p.name.toLowerCase().includes(agent.name.toLowerCase())) || AGENT_PRESETS[0];
                            onOpenStudio(preset);
                          }}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-mono btn-spectrum-outline flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#7e22ce] dark:text-[#a855f7]" />
                          Launch Agent View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeNav === 'agents' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] tracking-tight">Agents</h1>
                  <p className="text-sm text-[#4b5b73] dark:text-[#94a3b8] mt-1">Manage SOUL.md agent runtime instances</p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2.5 btn-spectrum text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" /> Create Agent
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="p-5 bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold spectrum-badge px-2.5 py-1 rounded-md">
                        <span className="spectrum-gradient-text">{agent.model}</span>
                      </span>
                      <span className="text-[10px] text-[#047857] dark:text-[#10b981] font-bold tracking-wider">ACTIVE</span>
                    </div>
                    <h3 className="text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{agent.name}</h3>
                    <p className="text-xs text-[#4b5b73] dark:text-[#94a3b8]">SOUL.md system rules loaded. Persistent session memory enabled.</p>
                    <button
                      onClick={() => {
                        const preset = AGENT_PRESETS.find(p => p.name.toLowerCase().includes(agent.name.toLowerCase())) || AGENT_PRESETS[0];
                        onOpenStudio(preset);
                      }}
                      className="w-full mt-2 py-2.5 btn-spectrum-outline font-mono text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#7e22ce] dark:text-[#a855f7]" />
                      Launch Agent View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeNav === 'models' && (
            <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-150 text-[#0f172a] dark:text-[#f1f5f9]">
              <ModelsView agentName="Tester" />
            </div>
          )}

          {activeNav === 'channels' && (
            <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-150 text-[#0f172a] dark:text-[#f1f5f9]">
              <ChannelsView agentName="Tester" />
            </div>
          )}

          {activeNav === 'mcp' && (
            <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-150 text-[#0f172a] dark:text-[#f1f5f9]">
              <McpView agentName="Tester" />
            </div>
          )}

          {activeNav === 'skills' && (
            <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-150 text-[#0f172a] dark:text-[#f1f5f9]">
              <SkillsView agentName="Tester" />
            </div>
          )}

          {activeNav === 'tokenusage' && (
            <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-150 text-[#0f172a] dark:text-[#f1f5f9]">
              <TokenUsageView agentName="Tester" />
            </div>
          )}

          {activeNav === 'scheduler' && (
            <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-150 text-[#0f172a] dark:text-[#f1f5f9]">
              <SchedulerView agentName="Tester" />
            </div>
          )}

          {activeNav === 'apikeys' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] tracking-tight">API Keys</h1>
                  <p className="text-sm text-[#4b5b73] dark:text-[#94a3b8] mt-1.5">
                    Issue programmatic credentials. Each key is scoped to a subset of your agents.
                  </p>
                </div>
                <button
                  onClick={handleOpenApiKeyModal}
                  className="px-4 py-2.5 btn-spectrum text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" /> Add API Key
                </button>
              </div>

              {apiKeys.length === 0 ? (
                <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-12 sm:p-20 flex flex-col items-center justify-center text-center shadow-sm min-h-[380px]">
                  <div className="w-14 h-14 bg-[#047857]/12 dark:bg-[#10b981]/15 border border-[#047857]/25 dark:border-[#10b981]/30 rounded-2xl flex items-center justify-center mb-4 text-[#047857] dark:text-[#10b981]">
                    <Key className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-1">
                    No API keys yet
                  </h3>
                  <p className="text-sm text-[#4b5b73] dark:text-[#94a3b8] mb-6 max-w-sm">
                    Issue one to let an external client call your agents
                  </p>
                  <button
                    onClick={handleOpenApiKeyModal}
                    className="px-4 py-2 bg-[#dce3ed] dark:bg-[#1e2a45] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-xs font-medium text-[#0f172a] dark:text-[#f1f5f9] hover:bg-[#cdd7e5] dark:hover:bg-[#283656] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add API Key
                  </button>
                </div>
              ) : (
                <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl p-5 space-y-3 shadow-sm">
                  {apiKeys.map((k) => (
                    <div key={k.id} className="p-4 bg-[#dce3ed] dark:bg-[#090d16] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#0f172a] dark:text-[#f1f5f9]">{k.name}</div>
                        <div className="text-xs font-mono text-[#4b5b73] dark:text-[#94a3b8] mt-1">{k.key}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleCopyKey(k.key)}
                          title="Copy Key"
                          className="p-2 text-[#4b5b73] dark:text-[#94a3b8] hover:text-[#b45309] dark:hover:text-[#f59e0b] bg-[#eaeff6] dark:bg-[#1e2a45] rounded-lg transition-colors cursor-pointer"
                        >
                          {copiedKey === k.key ? <Check className="w-4 h-4 text-[#047857] dark:text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteApiKey(k.id)}
                          title="Delete Key"
                          className="p-2 text-[#4b5b73] dark:text-[#94a3b8] hover:text-[#dc2626] dark:hover:text-[#ef4444] bg-[#eaeff6] dark:bg-[#1e2a45] rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeNav === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h1 className="text-3xl font-semibold text-[#0f172a] dark:text-[#f1f5f9] tracking-tight">Settings</h1>
                <p className="text-sm text-[#4b5b73] dark:text-[#94a3b8] mt-1">Gateway and local storage configuration</p>
              </div>

              <div className="p-6 bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl space-y-4 max-w-xl">
                <div>
                  <label className="text-xs font-medium text-[#4b5b73] dark:text-[#94a3b8] block mb-1">Gateway Host</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="http://localhost:8000" 
                    className="w-full bg-[#dce3ed] dark:bg-[#090d16] border border-[#bcc8da] dark:border-[#2b3850] p-3 rounded-xl text-xs text-[#0f172a] dark:text-[#f1f5f9] font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#4b5b73] dark:text-[#94a3b8] block mb-1">Persistence Engine</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="Local JSON Persistence" 
                    className="w-full bg-[#dce3ed] dark:bg-[#090d16] border border-[#bcc8da] dark:border-[#2b3850] p-3 rounded-xl text-xs text-[#0f172a] dark:text-[#f1f5f9] font-mono"
                  />
                </div>
                <button 
                  onClick={onClose}
                  className="px-4 py-2 bg-[#dce3ed] dark:bg-[#1e2a45] text-[#dc2626] dark:text-[#ef4444] border border-[#dc2626]/35 dark:border-[#ef4444]/40 rounded-xl text-xs font-medium hover:bg-[#dc2626]/10 dark:hover:bg-[#ef4444]/10 transition-colors cursor-pointer"
                >
                  Sign Out & Exit Dashboard
                </button>
              </div>
            </div>
          )}

          {activeNav === 'account' && (
            <div className="animate-in fade-in duration-150">
              <AccountView userEmail={username || 'jeremycodjoe@gmail.com'} initialTab="account" />
            </div>
          )}

          {activeNav === 'general' && (
            <div className="animate-in fade-in duration-150">
              <AccountView userEmail={username || 'jeremycodjoe@gmail.com'} initialTab="general" />
            </div>
          )}
        </div>
      </main>

      {/* Add API Key Pop up Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 dark:bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#eaeff6] dark:bg-[#131d33] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-[#0f172a] dark:text-[#f1f5f9]">
            {/* Header */}
            <div className="p-6 pb-4 flex items-start justify-between border-b border-[#bcc8da] dark:border-[#2b3850] bg-[#d5dde8] dark:bg-[#0f172a]">
              <div>
                <h2 className="text-xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">Add API Key</h2>
                <p className="text-sm text-[#4b5b73] dark:text-[#94a3b8] mt-1">
                  Issue a new bearer token scoped to a subset of your agents.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsApiKeyModalOpen(false)}
                className="text-[#4b5b73] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white transition-colors p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. thinkany-web"
                  className="w-full px-4 py-2.5 bg-[#dce3ed] dark:bg-[#090d16] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-sm text-[#0f172a] dark:text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:border-[#7e22ce] dark:focus:border-[#a855f7] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-1.5">
                  API Key / Secret Token (Optional)
                </label>
                <input
                  type="text"
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                  placeholder="e.g. AIzaSy... or custom key (leave blank to auto-generate)"
                  className="w-full px-4 py-2.5 bg-[#dce3ed] dark:bg-[#090d16] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-sm text-[#0f172a] dark:text-[#f1f5f9] placeholder-[#64748b] focus:outline-none focus:border-[#7e22ce] dark:focus:border-[#a855f7] transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">
                  Type
                </label>
                <div className="space-y-3">
                  <div
                    onClick={() => setNewKeyType('User')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      newKeyType === 'User'
                        ? 'bg-[#dce3ed] dark:bg-[#1e2a45] border-[#7e22ce] dark:border-[#a855f7] shadow-xs'
                        : 'bg-[#dfe5ee] dark:bg-[#090d16] border-[#bcc8da] dark:border-[#2b3850] hover:border-[#1d4ed8] dark:hover:border-[#3b82f6]'
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
                      User
                    </div>
                    <p className="text-xs text-[#4b5b73] dark:text-[#94a3b8] mt-1">
                      Access all your agents (auto-includes future ones). Can create new agents.
                    </p>
                  </div>

                  <div
                    onClick={() => setNewKeyType('Agent')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      newKeyType === 'Agent'
                        ? 'bg-[#dce3ed] dark:bg-[#1e2a45] border-[#7e22ce] dark:border-[#a855f7] shadow-xs'
                        : 'bg-[#dfe5ee] dark:bg-[#090d16] border-[#bcc8da] dark:border-[#2b3850] hover:border-[#1d4ed8] dark:hover:border-[#3b82f6]'
                    }`}
                  >
                    <div className="text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
                      Agent
                    </div>
                    <p className="text-xs text-[#4b5b73] dark:text-[#94a3b8] mt-1">
                      Locked to specific agents. Cannot create new ones.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#d5dde8] dark:bg-[#0f172a] border-t border-[#bcc8da] dark:border-[#2b3850] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsApiKeyModalOpen(false)}
                className="px-5 py-2.5 bg-[#eaeff6] hover:bg-[#cdd7e5] dark:bg-[#1e2a45] dark:hover:bg-[#283656] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-xs font-semibold text-[#0f172a] dark:text-[#f1f5f9] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCreateApiKey}
                className="px-5 py-2.5 btn-spectrum text-white font-extrabold text-xs rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Create key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Provider Pop up Modal */}
      {isAddProviderOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#eaeff6] dark:bg-[#131b2e] border border-[#bcc8da] dark:border-[#2b3850] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="p-6 pb-4 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-normal text-[#0f172a] dark:text-[#dae2fd]">
                  {editingProviderId ? 'Edit Provider' : 'Add Provider'}
                </h2>
                <p className="text-sm text-[#4b5b73] dark:text-[#bacac5] mt-1">
                  Configure an LLM provider endpoint and authentication key.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProviderOpen(false)}
                className="text-[#4b5b73] hover:text-[#0f172a] dark:text-slate-400 dark:hover:text-white transition-colors p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 space-y-4 pb-6">
              <div>
                <label className="block text-sm font-medium text-[#0f172a] dark:text-slate-200 mb-1.5">
                  Provider Name
                </label>
                <input
                  type="text"
                  value={provNameInput}
                  onChange={(e) => setProvNameInput(e.target.value)}
                  placeholder="e.g. google-gemini"
                  className="w-full px-4 py-2.5 bg-[#dce3ed] dark:bg-[#0b1326] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-sm text-[#0f172a] dark:text-[#dae2fd] placeholder-[#64748b] dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/40 dark:focus:ring-[#ff6b00]/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0f172a] dark:text-slate-200 mb-1.5">
                  API Base URL
                </label>
                <input
                  type="text"
                  value={provBaseInput}
                  onChange={(e) => setProvBaseInput(e.target.value)}
                  placeholder="e.g. https://generativelanguage.googleapis.com"
                  className="w-full px-4 py-2.5 bg-[#dce3ed] dark:bg-[#0b1326] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-sm font-mono text-[#0f172a] dark:text-[#dae2fd] placeholder-[#64748b] dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/40 dark:focus:ring-[#ff6b00]/40 transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#0f172a] dark:text-slate-200 mb-1.5">
                    API Key / Secret
                  </label>
                  <input
                    type="text"
                    value={provKeyInput}
                    onChange={(e) => setProvKeyInput(e.target.value)}
                    placeholder="e.g. AIza****oXhP"
                    className="w-full px-4 py-2.5 bg-[#dce3ed] dark:bg-[#0b1326] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-sm font-mono text-[#0f172a] dark:text-[#dae2fd] placeholder-[#64748b] dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ea580c]/40 dark:focus:ring-[#ff6b00]/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0f172a] dark:text-slate-200 mb-1.5">
                    Models
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={provModelsCountInput}
                    onChange={(e) => setProvModelsCountInput(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2.5 bg-[#dce3ed] dark:bg-[#0b1326] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-sm font-mono text-[#0f172a] dark:text-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#ea580c]/40 dark:focus:ring-[#ff6b00]/40 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-[#d5dde8] dark:bg-[#0b1326]/60 border-t border-[#bcc8da] dark:border-[#2b3850] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsAddProviderOpen(false)}
                className="px-5 py-2 bg-[#eaeff6] dark:bg-[#1e2a45] border border-[#bcc8da] dark:border-[#2b3850] rounded-xl text-sm font-medium text-[#0f172a] dark:text-slate-200 hover:bg-[#cdd7e5] dark:hover:bg-[#283656] transition-colors cursor-pointer shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProvider}
                className="px-5 py-2 bg-[#ea580c] hover:bg-[#c2410c] dark:bg-[#ff6b00] dark:hover:bg-[#ea580c] text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer"
              >
                {editingProviderId ? 'Save changes' : 'Add provider'}
              </button>
            </div>
          </div>
        </div>
      )}

      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateAgent}
      />
    </div>
  );
};
