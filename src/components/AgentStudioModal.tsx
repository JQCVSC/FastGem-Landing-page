import React, { useState, useEffect } from 'react';
import { AGENT_PRESETS } from '../data/mockData';
import { AgentPreset } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ChannelsView } from './ChannelsView';
import { PluginsView } from './PluginsView';
import { ContextView } from './ContextView';
import { ModelsView } from './ModelsView';
import { AccountView } from './AccountView';
import { McpView } from './McpView';
import { SkillsView } from './SkillsView';
import { TokenUsageView } from './TokenUsageView';
import { SchedulerView } from './SchedulerView';
import { runAgent } from '../lib/fastgemApi';
import { 
  X, Send, Bot, Terminal, Cpu, Database, RefreshCw, Sparkles, Check, Copy, Code2, 
  ArrowLeft, Trash2, MessageSquare, Plus, ChevronDown, ChevronRight, Settings, 
  Paperclip, PanelLeft, Folder, ChevronsUpDown, User, Sliders, Layers, BookOpen,
  Server, Plug, Radio, Clock, PieChart, UserCheck, Globe, Save, Zap, Key, ShieldCheck,
  Activity, SlidersHorizontal, Sun, Moon
} from 'lucide-react';

interface AgentStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAgent?: AgentPreset | null;
}

interface ChatThread {
  id: string;
  title: string;
  agentId: string;
  messages: Array<{ sender: 'user' | 'agent'; text: string; timestamp: string; toolsUsed?: string[] }>;
}

export const AgentStudioModal: React.FC<AgentStudioModalProps> = ({ 
  isOpen, 
  onClose,
  initialAgent 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [selectedAgent, setSelectedAgent] = useState<AgentPreset>(initialAgent || AGENT_PRESETS[0]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [agentDropdownOpen, setAgentDropdownOpen] = useState(false);
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [chatsExpanded, setChatsExpanded] = useState(true);
  const [memoryDrawerOpen, setMemoryDrawerOpen] = useState(false);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>();

  // Settings page view state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<string>('Profile');
  const [agentName, setAgentName] = useState<string>('Tester');
  const [agentDescription, setAgentDescription] = useState<string>('Testing');
  const [isPublicAccess, setIsPublicAccess] = useState<boolean>(false);
  const [savedToast, setSavedToast] = useState<boolean>(false);

  // Additional settings state
  const [systemInstruction, setSystemInstruction] = useState<string>(selectedAgent.systemInstruction);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [selectedModel, setSelectedModel] = useState<string>(selectedAgent.model);

  // Customize sub-tabs state
  type CustomizeTabType = 'Soul' | 'Identity' | 'User' | 'Tools' | 'Bootstrap' | 'Heartbeat' | 'Memory' | 'Agents';
  const [activeCustomizeTab, setActiveCustomizeTab] = useState<CustomizeTabType>('Soul');
  const [customizeFiles, setCustomizeFiles] = useState<Record<CustomizeTabType, string>>({
    Soul: '# SOUL.md\n\nWrite your content here...',
    Identity: '# IDENTITY.md\n\nWrite your content here...',
    User: '# USER.md\n\nWrite your content here...',
    Tools: '# TOOLS.md\n\nWrite your content here...',
    Bootstrap: '# BOOTSTRAP.md\n\nWrite your content here...',
    Heartbeat: '# HEARTBEAT.md\n\nWrite your content here...',
    Memory: '# MEMORY.md\n\nWrite your content here...',
    Agents: '# AGENTS.md\n\nWrite your content here...',
  });

  // Chat threads state
  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: 'thread-1',
      title: 'how are you day',
      agentId: AGENT_PRESETS[0].id,
      messages: []
    }
  ]);
  const [activeThreadId, setActiveThreadId] = useState<string>('thread-1');

  // Sync initial state when modal opens or initialAgent prop changes
  useEffect(() => {
    if (initialAgent) {
      setSelectedAgent(initialAgent);
      setAgentName(initialAgent.name);
      setAgentDescription(initialAgent.description);
      setSystemInstruction(initialAgent.systemInstruction);
      setSelectedModel(initialAgent.model);
    }
  }, [initialAgent, isOpen]);

  if (!isOpen) return null;

  const currentThread = threads.find(t => t.id === activeThreadId) || threads[0];
  const messages = currentThread?.messages || [];

  const handleSelectAgent = (agent: AgentPreset) => {
    setSelectedAgent(agent);
    setAgentName(agent.name);
    setAgentDescription(agent.description);
    setSystemInstruction(agent.systemInstruction);
    setSelectedModel(agent.model);
    setAgentDropdownOpen(false);
  };

  const handleNewChat = () => {
    const newThreadId = `thread-${Date.now()}`;
    const newThread: ChatThread = {
      id: newThreadId,
      title: 'New conversation',
      agentId: selectedAgent.id,
      messages: []
    };
    setThreads(prev => [newThread, ...prev]);
    setActiveThreadId(newThreadId);
    setIsSettingsOpen(false);
  };

  const handleSaveSettings = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || userInput;
    if (!textToSend.trim() || isProcessing) return;

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThreadId) {
        const isFirst = t.messages.length === 0;
        return {
          ...t,
          title: isFirst ? (textToSend.length > 25 ? textToSend.substring(0, 25) + '...' : textToSend) : t.title,
          messages: [...t.messages, userMsg]
        };
      }
      return t;
    }));

    if (!promptText) setUserInput('');
    setIsProcessing(true);
    setRuntimeError(null);
    try {
      const result = await runAgent(selectedAgent.id, textToSend, sessionId);
      setSessionId(result.sessionId);
      const agentMsg = {
        sender: 'agent' as const,
        text: result.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolsUsed: ['gemini', `model:${result.model}`]
      };
      setThreads(prev => prev.map(t => t.id === activeThreadId ? { ...t, messages: [...t.messages, agentMsg] } : t));
    } catch (error) {
      setRuntimeError(error instanceof Error ? error.message : 'FastGem runtime is unavailable');
    } finally {
      setIsProcessing(false);
    }
  };

  const agentSettingsTabs = [
    { id: 'Profile', label: 'Profile', icon: User },
    { id: 'Customize', label: 'Customize', icon: SlidersHorizontal },
    { id: 'Models', label: 'Models', icon: Cpu },
    { id: 'Context', label: 'Context', icon: Layers },
    { id: 'Knowledge', label: 'Knowledge', icon: BookOpen },
    { id: 'Skills', label: 'Skills', icon: Sparkles },
    { id: 'MCP', label: 'MCP', icon: Server },
    { id: 'Plugins', label: 'Plugins', icon: Plug },
    { id: 'Channels', label: 'Channels', icon: Radio },
    { id: 'Scheduler', label: 'Scheduler', icon: Clock },
    { id: 'Token Usage', label: 'Token Usage', icon: PieChart },
  ];

  const userSettingsTabs = [
    { id: 'Account', label: 'Account', icon: UserCheck },
  ];

  const renderTabSubtitle = (tab: string) => {
    switch (tab) {
      case 'Profile': return "Update your agent's name, description, and avatar.";
      case 'Customize': return `Personality, memory, and behavior files for ${agentName || 'Tester'}`;
      case 'Models': return "Manage Gemini model selections and inference parameters.";
      case 'Context': return `What the LLM sees for ${agentName || 'Tester'}. The prompt mode picks both the framework prompt profile and the built-in tool set. Custom tools come from plugins — always exposed regardless of mode.`;
      case 'Knowledge': return "Connect knowledge bases, vector embeddings, and documents.";
      case 'Skills': return "Manage function calling tools and capabilities.";
      case 'MCP': return "Connect Model Context Protocol server integrations.";
      case 'Plugins': return "Enable extensions, Slack/Discord integrations, and tools.";
      case 'Channels': return "Deploy agent to web chat widgets, API webhooks, or messaging.";
      case 'Scheduler': return "Automate agent runs, cron triggers, and background jobs.";
      case 'Token Usage': return "View token consumption, rate limits, and cost metrics.";
      case 'Account': return "Manage your user profile and subscription tier.";
      case 'General': return "Workspace preferences, theme, and application settings.";
      default: return "Configure agent settings.";
    }
  };

  return (
    <div className="fixed inset-0 z-[150] bg-[#090d16] text-[#dae2fd] flex font-sans antialiased overflow-hidden animate-in fade-in duration-200">
      {/* Ambient Landing Page Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#ef4444]/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] bg-[#3b82f6]/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[30%] w-[40%] h-[40%] bg-[#a855f7]/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* ----------------- SETTINGS PAGE OVERLAY VIEW ----------------- */}
      {isSettingsOpen ? (
        <div className="w-full h-full bg-[#090d16] flex overflow-hidden animate-in fade-in duration-200 relative z-10">
          {/* Settings Left Sidebar */}
          <aside className="w-[230px] sm:w-[250px] bg-[#0f172a] border-r border-[#2b3850] flex flex-col justify-between shrink-0 p-4 select-none">
            <div className="space-y-6 overflow-y-auto">
              
              {/* AGENT Section */}
              <div>
                <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#ff8c00] px-3 mb-2">
                  AGENT
                </div>
                <div className="space-y-1">
                  {agentSettingsTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSettingsTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSettingsTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#1e2a45] text-white shadow-sm border-l-2 border-[#ff6b00]'
                            : 'text-[#bacac5] hover:bg-[#131d33] hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff6b00]' : 'text-[#bacac5]'}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* USER Section */}
              <div>
                <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#ff8c00] px-3 mb-2">
                  USER
                </div>
                <div className="space-y-1">
                  {userSettingsTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSettingsTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSettingsTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#1e2a45] text-white shadow-sm border-l-2 border-[#ff6b00]'
                            : 'text-[#bacac5] hover:bg-[#131d33] hover:text-white'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff6b00]' : 'text-[#bacac5]'}`} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-[#2b3850]">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-2 px-3 bg-[#131d33] hover:bg-[#1e2a45] border border-[#2b3850] text-xs text-[#bacac5] hover:text-white rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#ff6b00]" />
                <span>Back to Chat</span>
              </button>
            </div>
          </aside>

          {/* Settings Right Main Area */}
          <main className="flex-1 bg-[#090d16] flex flex-col h-full overflow-hidden">
            {/* Top Bar Header */}
            <header className="p-6 sm:p-8 pb-4 flex items-center justify-between shrink-0 border-b border-[#2b3850]">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#f1f5f9] tracking-tight">
                  {activeSettingsTab}
                </h1>
                <p className="text-xs sm:text-sm text-[#bacac5] mt-1 font-sans">
                  {renderTabSubtitle(activeSettingsTab)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveSettings}
                  className="bg-[#ff6b00] hover:bg-[#ea580c] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider font-mono flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-[#ff6b00]/20 active:scale-95"
                >
                  {savedToast ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
                  <span>{savedToast ? 'Saved!' : 'Save'}</span>
                </button>

                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 text-[#bacac5] hover:text-white hover:bg-[#1e2a45] rounded-xl transition-colors cursor-pointer"
                  title="Close Settings"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Main Tab Content Canvas */}
            <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-4xl space-y-6">
              
              {/* ------------ PROFILE TAB ------------ */}
              {activeSettingsTab === 'Profile' && (
                <>
                  <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 space-y-6 shadow-md">
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                      {/* Avatar Square */}
                      <div className="w-20 h-20 rounded-2xl bg-[#131d33] border border-[#2b3850] flex items-center justify-center shrink-0 shadow-inner">
                        <Bot className="w-9 h-9 text-[#ff6b00]" />
                      </div>

                      {/* Name Input & ID */}
                      <div className="flex-1 w-full space-y-3">
                        <div>
                          <label className="text-sm font-medium text-[#f1f5f9] mb-1.5 block">
                            Name
                          </label>
                          <input
                            type="text"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                            className="w-full bg-[#131d33] border border-[#2b3850] rounded-xl px-4 py-2.5 text-sm text-[#f1f5f9] focus:outline-none focus:border-[#ff6b00] transition-colors font-sans"
                            placeholder="Agent Name"
                          />
                        </div>
                        <div>
                          <span className="font-mono text-xs text-[#ff6b00] bg-[#131d33] px-3 py-1 rounded-md inline-block border border-[#2b3850]">
                            ID: agt_f96f4f078be5220abece
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                      <label className="text-sm font-medium text-[#f1f5f9] mb-1.5 block">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={agentDescription}
                        onChange={(e) => setAgentDescription(e.target.value)}
                        className="w-full bg-[#131d33] border border-[#2b3850] rounded-xl p-4 text-sm text-[#f1f5f9] focus:outline-none focus:border-[#ff6b00] transition-colors resize-none font-sans"
                        placeholder="Agent Description"
                      />
                    </div>
                  </div>

                  {/* Public Access Toggle Card */}
                  <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 flex items-center justify-between shadow-md">
                    <div>
                      <div className="text-base font-medium text-[#f1f5f9]">Public access</div>
                      <div className="text-xs text-[#bacac5] mt-0.5">Only you can use this agent.</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPublicAccess(!isPublicAccess)}
                      className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer flex items-center ${
                        isPublicAccess ? 'bg-[#ff6b00] justify-end' : 'bg-[#1e2a45] justify-start'
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${isPublicAccess ? 'bg-white' : 'bg-[#bacac5]'}`} />
                    </button>
                  </div>
                </>
              )}

              {/* ------------ CUSTOMIZE TAB ------------ */}
              {activeSettingsTab === 'Customize' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  {/* Sub-navigation Menu Items above system instructions */}
                  <div className="border-b border-[#2b3850] pb-0">
                    <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none">
                      {(['Soul', 'Identity', 'User', 'Tools', 'Bootstrap', 'Heartbeat', 'Memory', 'Agents'] as CustomizeTabType[]).map((tab) => {
                        const isActive = activeCustomizeTab === tab;
                        return (
                          <button
                            key={tab}
                            onClick={() => setActiveCustomizeTab(tab)}
                            className={`pb-3 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap cursor-pointer ${
                              isActive
                                ? 'text-[#ff6b00] font-semibold'
                                : 'text-[#bacac5] hover:text-white'
                            }`}
                          >
                            <span>{tab}</span>
                            {isActive && (
                              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff6b00] rounded-full" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Markdown File Editor Box */}
                  <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-md flex flex-col min-h-[420px] transition-all">
                    <div className="text-xs sm:text-sm font-mono text-[#bacac5] mb-4 select-none font-medium">
                      # {activeCustomizeTab.toUpperCase()}.md
                    </div>
                    <textarea
                      rows={14}
                      value={customizeFiles[activeCustomizeTab]}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomizeFiles(prev => ({ ...prev, [activeCustomizeTab]: val }));
                        if (activeCustomizeTab === 'Soul') {
                          setSystemInstruction(val);
                        }
                      }}
                      placeholder="Write your content here..."
                      className="w-full flex-1 bg-[#131d33] border border-[#2b3850] rounded-xl p-4 text-[#dae2fd] font-mono text-xs sm:text-sm focus:outline-none focus:border-[#ff6b00] resize-none leading-relaxed placeholder:text-[#bacac5]/40"
                    />
                  </div>
                </div>
              )}

              {/* ------------ MODELS TAB ------------ */}
              {activeSettingsTab === 'Models' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-md">
                  <ModelsView agentName={agentName || selectedAgent.name} />
                </div>
              )}

              {/* ------------ CONTEXT TAB ------------ */}
              {activeSettingsTab === 'Context' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-md">
                  <ContextView agentName={agentName || selectedAgent.name} />
                </div>
              )}

              {/* ------------ CHANNELS TAB ------------ */}
              {activeSettingsTab === 'Channels' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 shadow-md">
                  <ChannelsView agentName={agentName || selectedAgent.name} />
                </div>
              )}

              {/* ------------ PLUGINS TAB ------------ */}
              {activeSettingsTab === 'Plugins' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 shadow-md">
                  <PluginsView agentName={agentName || selectedAgent.name} />
                </div>
              )}

              {/* ------------ ACCOUNT TAB ------------ */}
              {activeSettingsTab === 'Account' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-md">
                  <AccountView />
                </div>
              )}

              {/* ------------ MCP TAB ------------ */}
              {activeSettingsTab === 'MCP' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-md">
                  <McpView agentName={agentName || selectedAgent.name} />
                </div>
              )}

              {/* ------------ SKILLS TAB ------------ */}
              {activeSettingsTab === 'Skills' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-md">
                  <SkillsView agentName={agentName || selectedAgent.name} />
                </div>
              )}

              {/* ------------ TOKEN USAGE TAB ------------ */}
              {activeSettingsTab === 'Token Usage' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-md">
                  <TokenUsageView agentName={agentName || selectedAgent.name} />
                </div>
              )}

              {/* ------------ SCHEDULER TAB ------------ */}
              {activeSettingsTab === 'Scheduler' && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-6 sm:p-8 shadow-md">
                  <SchedulerView agentName={agentName || selectedAgent.name} />
                </div>
              )}

              {/* ------------ GENERIC FALLBACK FOR OTHER TABS ------------ */}
              {['Knowledge', 'General'].includes(activeSettingsTab) && (
                <div className="bg-[#0f172a] border border-[#2b3850] rounded-2xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#131d33] border border-[#2b3850] text-[#ff6b00] flex items-center justify-center mx-auto">
                    <Sliders className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-medium text-[#f1f5f9]">{activeSettingsTab} Configuration</h3>
                  <p className="text-xs text-[#bacac5] max-w-md mx-auto">
                    Settings and parameters for {activeSettingsTab.toLowerCase()} are loaded and active under FastGem Gemini 3.6 engine runtime.
                  </p>
                  <div className="pt-2">
                    <span className="font-mono text-xs text-[#ff6b00] bg-[#131d33] px-3 py-1.5 rounded-lg border border-[#ff6b00]/30">
                      Status: Active & Configured
                    </span>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      ) : (
        /* ----------------- STANDARD AGENT CHAT VIEW ----------------- */
        <>
          {/* ----------------- LEFT SIDEBAR ----------------- */}
          <aside 
            className={`${
              sidebarOpen ? 'w-[260px] sm:w-[280px]' : 'w-0'
            } bg-[#0f172a] border-r border-[#2b3850] flex flex-col shrink-0 transition-all duration-300 overflow-hidden relative z-20 select-none`}
          >
            <div className="p-3 flex flex-col gap-3 h-full overflow-y-auto">
              
              {/* Top Dropdown Agent Selector */}
              <div className="relative">
                <button
                  onClick={() => setAgentDropdownOpen(!agentDropdownOpen)}
                  className="w-full p-2.5 bg-[#131d33] hover:bg-[#1e2a45] border border-[#2b3850] rounded-xl flex items-center justify-between text-xs text-[#f1f5f9] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-base">{selectedAgent.avatarEmoji}</span>
                    <span className="font-semibold truncate">{agentName || selectedAgent.name}</span>
                  </div>
                  <ChevronsUpDown className="w-4 h-4 text-[#bacac5] shrink-0 ml-1" />
                </button>

                {/* Agent Selector Dropdown Overlay */}
                {agentDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-[#0f172a] border border-[#2b3850] rounded-xl shadow-2xl p-1.5 space-y-1 max-h-60 overflow-y-auto">
                    <div className="px-2.5 py-1 text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#ff8c00]">Switch Agent</div>
                    {AGENT_PRESETS.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => handleSelectAgent(agent)}
                        className={`w-full p-2 rounded-lg text-left text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                          selectedAgent.id === agent.id 
                            ? 'bg-[#1e2a45] text-[#ff6b00] font-semibold' 
                            : 'text-[#bacac5] hover:bg-[#131d33] hover:text-white'
                        }`}
                      >
                        <span className="text-sm">{agent.avatarEmoji}</span>
                        <div className="truncate">
                          <div className="truncate">{agent.name}</div>
                          <div className="text-[10px] text-[#bacac5]/70 font-mono">{agent.model}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#ff8c00] px-1 pt-1">
                AGENT
              </div>

              {/* + New Chat Button */}
              <button
                onClick={handleNewChat}
                className="w-full py-2.5 px-3 bg-[#131d33] hover:bg-[#1e2a45] border border-[#2b3850] hover:border-[#ff6b00]/40 text-white rounded-xl text-xs font-medium flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#ff6b00]" />
                <span>New chat</span>
              </button>

              {/* Collapsible Projects Section */}
              <div className="mt-2">
                <div 
                  onClick={() => setProjectsExpanded(!projectsExpanded)}
                  className="flex items-center justify-between text-xs text-[#bacac5] hover:text-white px-1 py-1 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {projectsExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    <span className="font-medium text-[11px] uppercase tracking-wider">Projects</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="hover:text-[#ff6b00] p-0.5" 
                    title="Create Project"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {projectsExpanded && (
                  <div className="pl-5 pt-1 pb-1 text-xs text-[#bacac5]/60 font-mono text-[11px]">
                    No projects yet
                  </div>
                )}
              </div>

              {/* Collapsible Chats Section */}
              <div className="mt-1">
                <div 
                  onClick={() => setChatsExpanded(!chatsExpanded)}
                  className="flex items-center justify-between text-xs text-[#bacac5] hover:text-white px-1 py-1 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    {chatsExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    <span className="font-medium text-[11px] uppercase tracking-wider">Chats</span>
                  </div>
                </div>

                {chatsExpanded && (
                  <div className="mt-1 space-y-1">
                    {threads.map((thread) => (
                      <button
                        key={thread.id}
                        onClick={() => setActiveThreadId(thread.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs truncate transition-all cursor-pointer ${
                          activeThreadId === thread.id
                            ? 'bg-[#1e2a45] text-white font-medium border-l-2 border-[#ff6b00]'
                            : 'text-[#bacac5] hover:bg-[#131d33] hover:text-white'
                        }`}
                      >
                        {thread.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto pt-3 border-t border-[#2b3850] space-y-2">
                {/* Settings Button */}
                <button 
                  onClick={() => {
                    setIsSettingsOpen(true);
                    setActiveSettingsTab('Profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs text-[#bacac5] hover:text-white hover:bg-[#131d33] rounded-xl transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-[#bacac5]" />
                  <span>Settings</span>
                </button>

                {/* Bottom User Badge */}
                <div className="p-2 bg-[#131d33] rounded-xl border border-[#2b3850] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-7 h-7 rounded-full bg-[#ff6b00]/20 text-[#ff8c00] border border-[#ff6b00]/40 flex items-center justify-center font-bold text-xs shrink-0">
                      JE
                    </div>
                    <div className="truncate text-left">
                      <div className="text-xs font-semibold text-white truncate">jembuildz</div>
                      <div className="text-[10px] text-[#bacac5] truncate">user</div>
                    </div>
                  </div>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-[#bacac5] shrink-0" />
                </div>
              </div>

            </div>
          </aside>

          {/* ----------------- MAIN CHAT CANVAS ----------------- */}
          <main className="flex-1 flex flex-col bg-[#090d16] h-full overflow-hidden relative z-10">
            
            {/* Top Header Navigation Bar */}
            <header className="h-14 border-b border-[#2b3850] bg-[#090d16]/90 backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 text-[#bacac5] hover:text-white hover:bg-[#1e2a45] rounded-lg transition-colors cursor-pointer"
                  title="Toggle sidebar"
                >
                  <PanelLeft className="w-5 h-5" />
                </button>

                <span className="text-sm font-medium text-[#f1f5f9] flex items-center gap-2">
                  Chat with {agentName || selectedAgent.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-[#bacac5] hover:text-white hover:bg-[#1e2a45] rounded-lg transition-colors cursor-pointer"
                  title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-amber-300" />
                  ) : (
                    <Moon className="w-5 h-5 text-[#ea580c]" />
                  )}
                </button>
                <button 
                  onClick={() => setMemoryDrawerOpen(!memoryDrawerOpen)}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    memoryDrawerOpen ? 'bg-[#1e2a45] text-[#ff6b00]' : 'text-[#bacac5] hover:text-white hover:bg-[#1e2a45]'
                  }`}
                  title="Toggle MEMORY.md & SOUL.md Drawer"
                >
                  <Folder className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-[#bacac5] hover:text-white hover:bg-[#1e2a45] rounded-lg transition-colors cursor-pointer"
                  title="Close View"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Content Area */}
            <div className="flex-1 flex overflow-hidden">
              
              <div className="flex-1 flex flex-col overflow-hidden relative">
                {runtimeError && (
                  <div className="mx-4 mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs text-red-200">
                    <strong className="font-semibold">Runtime unavailable:</strong> {runtimeError}
                  </div>
                )}
                {messages.length === 0 ? (
                  /* ------------- INITIAL EMPTY STATE ------------- */
                  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto w-full animate-in fade-in duration-300">
                    <div className="mb-6 flex flex-col items-center gap-3">
                      <img 
                        src="https://i.imgur.com/hkRlTDp.png" 
                        alt="FastGem Logo" 
                        className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,107,0,0.4)]"
                        referrerPolicy="no-referrer"
                      />
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f1f5f9] tracking-tight mt-1">
                        What can I do for you?
                      </h1>
                    </div>

                    {/* Big Center Prompt Box */}
                    <div className="w-full max-w-xl bg-[#131d33] border border-[#2b3850] rounded-2xl p-4 shadow-2xl transition-all focus-within:border-[#ff6b00]/60 focus-within:ring-1 focus-within:ring-[#ff6b00]/30 text-left">
                      <textarea
                        rows={3}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder={`Message ${agentName || selectedAgent.name}... ("/" to pick a skill)`}
                        className="w-full bg-transparent text-sm text-[#f1f5f9] placeholder-[#bacac5]/60 focus:outline-none resize-none font-sans"
                      />

                      <div className="flex items-center justify-between pt-3 border-t border-[#2b3850] mt-2">
                        <button
                          type="button"
                          className="p-2 text-[#bacac5] hover:text-white hover:bg-[#1e2a45] rounded-lg transition-colors cursor-pointer"
                          title="Attach file or code snippet"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleSendMessage()}
                          disabled={!userInput.trim() || isProcessing}
                          className="w-9 h-9 rounded-full bg-[#ff6b00] hover:bg-[#ea580c] text-white flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer shrink-0 shadow-md shadow-[#ff6b00]/25"
                          title="Send message"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Sample Prompt Pills */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-xl">
                      {selectedAgent.samplePrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="px-3.5 py-1.5 bg-[#131d33] hover:bg-[#1e2a45] border border-[#2b3850] rounded-full text-xs text-[#bacac5] hover:text-white transition-all cursor-pointer font-sans shadow-xs"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ------------- ACTIVE CHAT FEED ------------- */
                  <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
                      {messages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                        >
                          <div className="text-[11px] text-[#bacac5] mb-1.5 px-1 font-mono">
                            {msg.sender === 'user' ? 'You' : (agentName || selectedAgent.name)} • {msg.timestamp}
                          </div>

                          <div
                            className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-[#1e2a45] text-white border border-[#ff6b00]/30 shadow-md'
                                : 'bg-[#131d33] border border-[#2b3850] text-[#dae2fd] shadow-md'
                            }`}
                          >
                            {msg.toolsUsed && msg.toolsUsed.length > 0 && (
                              <div className="mb-3 pb-2 border-b border-[#2b3850] flex items-center gap-2 font-mono text-xs text-[#ff6b00]">
                                <Terminal className="w-3.5 h-3.5 text-[#ff6b00]" />
                                <span className="text-[#bacac5]">Tool Execution:</span>
                                {msg.toolsUsed.map((t, tidx) => (
                                  <span key={tidx} className="bg-[#ff6b00]/10 px-2 py-0.5 rounded text-[11px] border border-[#ff6b00]/30 text-[#ff8c00]">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="whitespace-pre-wrap">{msg.text}</div>
                          </div>
                        </div>
                      ))}

                      {isProcessing && (
                        <div className="flex items-center gap-3 spectrum-gradient-text font-mono text-xs bg-[#131d33] p-4 rounded-2xl border border-[#a855f7]/40 w-fit animate-pulse shadow-md">
                          <RefreshCw className="w-4 h-4 animate-spin text-[#3b82f6]" />
                          <span>{agentName || selectedAgent.name} is thinking & executing tools...</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Input Box for active chat */}
                    <div className="p-4 bg-[#090d16] border-t border-[#2b3850] shrink-0">
                      <div className="max-w-4xl mx-auto w-full bg-[#131d33] border border-[#2b3850] rounded-2xl p-3 shadow-xl transition-all focus-within:border-[#ff6b00]/70">
                        <textarea
                          rows={2}
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder={`Message ${agentName || selectedAgent.name}...`}
                          className="w-full bg-transparent text-sm text-[#f1f5f9] placeholder-[#bacac5]/60 focus:outline-none resize-none font-sans"
                        />

                        <div className="flex items-center justify-between pt-2 border-t border-[#2b3850] mt-1">
                          <button
                            type="button"
                            className="p-1.5 text-[#bacac5] hover:text-white hover:bg-[#1e2a45] rounded-lg transition-colors cursor-pointer"
                            title="Attach file"
                          >
                            <Paperclip className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleSendMessage()}
                            disabled={!userInput.trim() || isProcessing}
                            className="w-8 h-8 rounded-full bg-[#ff6b00] hover:bg-[#ea580c] text-white font-bold flex items-center justify-center transition-all disabled:opacity-30 cursor-pointer shrink-0 shadow-md shadow-[#ff6b00]/25"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Optional Right Memory Drawer */}
              {memoryDrawerOpen && (
                <div className="w-[300px] bg-[#0f172a] border-l border-[#2b3850] p-4 flex flex-col gap-4 overflow-y-auto shrink-0 animate-in slide-in-from-right duration-200">
                  <div className="flex items-center justify-between border-b border-[#2b3850] pb-2">
                    <span className="font-mono text-xs uppercase text-[#ff6b00] font-bold flex items-center gap-1.5">
                      <Database className="w-4 h-4" /> Agent Context
                    </span>
                    <button onClick={() => setMemoryDrawerOpen(false)} className="text-[#bacac5] hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="text-xs text-[#bacac5] mb-1 block font-mono">SOUL.md System Rules</label>
                    <div className="p-2.5 bg-[#131d33] border border-[#2b3850] rounded-xl text-xs text-[#dae2fd] font-mono leading-relaxed">
                      {systemInstruction}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#bacac5] mb-1 block font-mono">MEMORY.md Window</label>
                    <pre className="p-2.5 bg-[#131d33] border border-[#2b3850] rounded-xl text-[11px] text-[#ff8c00] font-mono leading-relaxed whitespace-pre-wrap">
                      {`- Active Agent: ${agentName || selectedAgent.name}\n- Model: ${selectedModel}\n- Context Window: 2M Tokens\n- Active Tools: [${selectedAgent.tools.join(', ')}]`}
                    </pre>
                  </div>
                </div>
              )}

            </div>
          </main>
        </>
      )}

    </div>
  );
};
;
