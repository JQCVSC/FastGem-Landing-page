import React, { useState } from 'react';
import { 
  Radio, X, Plus, Check, Send, MessageSquare, Hash, MessageCircle, 
  MessagesSquare, Share2, PhoneCall, Webhook, ExternalLink, ShieldCheck,
  Terminal, Play, RefreshCw, Copy, CheckCircle2, Zap, ArrowRight, Code
} from 'lucide-react';

interface ChannelConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  badgeBg: string;
  badgeText: string;
  docUrl?: string;
  placeholder?: string;
  inputLabel?: string;
}

interface ChannelsViewProps {
  agentName?: string;
  onClose?: () => void;
  standalone?: boolean;
}

interface TestMessageLog {
  id: string;
  sender: 'user' | 'agent' | 'system';
  channel: string;
  text: string;
  timestamp: string;
  payload?: any;
}

export const ChannelsView: React.FC<ChannelsViewProps> = ({ 
  agentName = 'Tester', 
  onClose,
  standalone = false 
}) => {
  const [connectedIds, setConnectedIds] = useState<string[]>(['telegram', 'discord']);
  const [activeModalChannel, setActiveModalChannel] = useState<ChannelConfig | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Testing Sandbox State
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [selectedSimChannel, setSelectedSimChannel] = useState('telegram');
  const [simInput, setSimInput] = useState('');
  const [isSimSending, setIsSimSending] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  const [testLogs, setTestLogs] = useState<TestMessageLog[]>([
    {
      id: 'log-1',
      sender: 'system',
      channel: 'telegram',
      text: 'Connected to Telegram Bot (@FastGemAgentBot). Listening for webhook events...',
      timestamp: '17:42:01'
    },
    {
      id: 'log-2',
      sender: 'user',
      channel: 'telegram',
      text: 'Hello from Telegram! Is the agent active?',
      timestamp: '17:42:15',
      payload: { event: 'message_created', channel: 'telegram', user_id: 'tg_883019', chat_id: 'chat_9918' }
    },
    {
      id: 'log-3',
      sender: 'agent',
      channel: 'telegram',
      text: `Hello! Yes, ${agentName} is online and processing messages via FastGem Gemini 3.6 Flash engine.`,
      timestamp: '17:42:16',
      payload: { status: 200, response_time_ms: 128, tokens_used: 42 }
    }
  ]);

  const channels: ChannelConfig[] = [
    {
      id: 'telegram',
      name: 'Telegram',
      description: 'Connect a Telegram bot to relay messages to this agent.',
      badgeBg: 'bg-[#0088cc]/10 dark:bg-[#0088cc]/20 border border-[#0088cc]/30',
      badgeText: 'text-[#0088cc]',
      inputLabel: 'Bot Token (from @BotFather)',
      placeholder: '5938491048:AAH3k892kLq...',
      icon: (
        <svg className="w-5 h-5 fill-current text-[#0088cc]" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.38-.27-2.05-.49-.83-.27-1.49-.42-1.43-.89.03-.25.38-.51 1.07-.78 4.18-1.82 6.97-3.02 8.37-3.61 3.99-1.66 4.82-1.95 5.36-1.96.12 0 .38.03.55.17.14.12.18.28.2.43-.02.07-.02.21-.04.38z" />
        </svg>
      )
    },
    {
      id: 'discord',
      name: 'Discord',
      description: "Connect a Discord bot — works in DMs and servers it's invited to.",
      badgeBg: 'bg-[#5865f2]/10 dark:bg-[#5865f2]/20 border border-[#5865f2]/30',
      badgeText: 'text-[#5865f2]',
      inputLabel: 'Bot Token',
      placeholder: 'MTI5ODMy...NzQ5Mg.Gz9x...',
      icon: (
        <svg className="w-5 h-5 fill-current text-[#5865f2]" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      )
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Connect a Slack app via Socket Mode (bot token + app token).',
      badgeBg: 'bg-[#e01e5a]/10 dark:bg-[#e01e5a]/20 border border-[#e01e5a]/30',
      badgeText: 'text-[#e01e5a]',
      inputLabel: 'Bot User OAuth Token',
      placeholder: 'xoxb-829104819-...',
      icon: (
        <svg className="w-5 h-5 fill-current text-[#e01e5a]" viewBox="0 0 24 24">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.527 2.527 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.521A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.523v-2.521h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
        </svg>
      )
    },
    {
      id: 'line',
      name: 'LINE',
      description: 'Connect a LINE Messaging API channel via webhook (channel access token + channel secret).',
      badgeBg: 'bg-[#00b900]/10 dark:bg-[#00b900]/20 border border-[#00b900]/30',
      badgeText: 'text-[#00b900]',
      inputLabel: 'Channel Access Token',
      placeholder: 'eyJhbGciOiJIUzI1NiIs...',
      icon: (
        <svg className="w-5 h-5 fill-current text-[#00b900]" viewBox="0 0 24 24">
          <path d="M19.34 10.03c0-4.41-4.18-8-9.34-8S.66 5.62.66 10.03c0 3.95 3.32 7.27 7.82 7.87.3.07.72.2.82.47.1.25.06.63.03.88l-.13.78c-.04.25-.19.98.86.53 1.05-.44 5.67-3.34 7.74-5.72 1.5-1.57 1.54-3.26 1.54-4.83z"/>
        </svg>
      )
    },
    {
      id: 'wechat',
      name: 'WeChat',
      description: 'Scan a QR code with the WeChat phone app to relay messages to this agent.',
      badgeBg: 'bg-[#07c160]/10 dark:bg-[#07c160]/20 border border-[#07c160]/30',
      badgeText: 'text-[#07c160]',
      inputLabel: 'AppID / Developer Secret',
      placeholder: 'wx892810381023...',
      icon: (
        <svg className="w-5 h-5 fill-current text-[#07c160]" viewBox="0 0 24 24">
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.06 5.558l-.78 2.34 2.83-1.415c1.07.295 2.21.461 3.38.461 4.8 0 8.69-3.288 8.69-7.343s-3.89-7.343-8.49-7.343zm-2.5 4.5c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2zm5 0c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2zm8.5 4.643c-3.9 0-7.06 2.67-7.06 5.965 0 1.8.95 3.414 2.49 4.514l-.63 1.9 2.3-1.15c.87.24 1.79.375 2.74.375 3.9 0 7.06-2.67 7.06-5.965s-3.16-5.965-6.9-5.965zm-2.03 3.657c.54 0 .98.44.98.98s-.44.98-.98.98-.98-.44-.98-.98.44-.98.98-.98zm4.06 0c.54 0 .98.44.98.98s-.44.98-.98.98-.98-.44-.98-.98.44-.98.98-.98z"/>
        </svg>
      )
    },
    {
      id: 'feishu',
      name: 'Feishu',
      description: 'Connect a Feishu custom-app bot via webhook (App ID + App Secret).',
      badgeBg: 'bg-[#00d6b9]/10 dark:bg-[#00d6b9]/20 border border-[#00d6b9]/30',
      badgeText: 'text-[#00d6b9]',
      inputLabel: 'App ID & App Secret',
      placeholder: 'cli_a839103810...',
      icon: (
        <svg className="w-5 h-5 fill-current text-[#00d6b9]" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Connect WhatsApp Business API via Cloud API or Twilio integration.',
      badgeBg: 'bg-[#25d366]/10 dark:bg-[#25d366]/20 border border-[#25d366]/30',
      badgeText: 'text-[#25d366]',
      inputLabel: 'Phone Number ID / System User Token',
      placeholder: 'EAAG10938491...',
      icon: (
        <svg className="w-5 h-5 fill-current text-[#25d366]" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      )
    },
    {
      id: 'webhook',
      name: 'HTTP Webhook',
      description: 'Connect an HTTP webhook endpoint to relay JSON payloads.',
      badgeBg: 'bg-[#3b82f6]/10 dark:bg-[#3b82f6]/20 border border-[#3b82f6]/30',
      badgeText: 'text-[#3b82f6]',
      inputLabel: 'Endpoint Secret / Callback URL',
      placeholder: 'https://my-domain.com/api/agent/webhook',
      icon: <Webhook className="w-5 h-5 text-[#3b82f6]" />
    }
  ];

  const handleToggleConnect = (channel: ChannelConfig) => {
    if (connectedIds.includes(channel.id)) {
      setConnectedIds(prev => prev.filter(id => id !== channel.id));
    } else {
      setActiveModalChannel(channel);
      setInputValue('');
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalChannel) return;

    setIsSaving(true);
    setTimeout(() => {
      setConnectedIds(prev => [...prev, activeModalChannel.id]);
      setIsSaving(false);
      setActiveModalChannel(null);
    }, 400);
  };

  const handleOpenSimulator = (channelId?: string) => {
    if (channelId) setSelectedSimChannel(channelId);
    setIsSimulatorOpen(true);
  };

  const handleSendSimMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!simInput.trim() || isSimSending) return;

    const userMsgText = simInput.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const userLog: TestMessageLog = {
      id: `log-${Date.now()}`,
      sender: 'user',
      channel: selectedSimChannel,
      text: userMsgText,
      timestamp: timeStr,
      payload: {
        event: 'message_received',
        channel: selectedSimChannel,
        sender_id: `user_${Math.floor(Math.random() * 899999 + 100000)}`,
        content: userMsgText
      }
    };

    setTestLogs(prev => [...prev, userLog]);
    setSimInput('');
    setIsSimSending(true);

    // Simulate Agent processing & reply
    setTimeout(() => {
      const agentReplies: Record<string, string> = {
        telegram: `[Telegram Webhook Response]: Received your message "${userMsgText}". ${agentName} processed this with Gemini 3.6 Flash engine. Everything is functioning normally!`,
        discord: `[Discord Bot Payload]: Hello from ${agentName}! Message "${userMsgText}" received and processed in channel #general.`,
        slack: `[Slack Event API]: Message "${userMsgText}" acknowledged. Agent reply dispatched via Socket Mode.`,
        whatsapp: `[WhatsApp Cloud API]: Message delivered to user. "${userMsgText}" processed successfully.`,
        line: `[LINE Messaging API]: Reply token valid. ${agentName} responded to your request.`,
        wechat: `[WeChat Official Acc]: Message acknowledged. ${agentName} live loop responsive.`,
        feishu: `[Feishu Open Platform]: Webhook callback OK. Reply posted to chat group.`,
        webhook: `[HTTP Webhook 200 OK]: Payload consumed successfully. Data verified.`
      };

      const agentLog: TestMessageLog = {
        id: `log-agent-${Date.now()}`,
        sender: 'agent',
        channel: selectedSimChannel,
        text: agentReplies[selectedSimChannel] || `[${selectedSimChannel.toUpperCase()}]: Message processed successfully by ${agentName}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        payload: {
          status: 200,
          status_text: 'OK',
          latency_ms: Math.floor(Math.random() * 80 + 90),
          agent_name: agentName,
          model: 'Gemini 3.6 Flash'
        }
      };

      setTestLogs(prev => [...prev, agentLog]);
      setIsSimSending(false);
    }, 800);
  };

  const curlCommand = `curl -X POST https://api.fastgem.io/v1/channels/${selectedSimChannel}/webhook \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer fc_live_demo123456" \\
  -d '{"message": "Hello ${agentName}!", "sender": "test_user"}'`;

  const copyCurl = () => {
    navigator.clipboard?.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className={`w-full ${standalone ? 'p-6 sm:p-8' : ''} text-[#0f172a] dark:text-[#f1f5f9] antialiased`}>
      {/* ------------ HEADER ------------ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff6b00]/10 dark:bg-[#ff6b00]/20 border border-[#ff6b00]/30 flex items-center justify-center text-[#ff6b00]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
              Channels
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#bacac5] mt-2 font-sans max-w-2xl leading-relaxed">
            Connect messaging platforms to <span className="font-semibold text-[#0f172a] dark:text-white">{agentName}</span> so people can chat with it on Telegram, Discord, Slack, and more.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* TEST MESSAGING SANDBOX BUTTON */}
          <button
            onClick={() => handleOpenSimulator()}
            className="px-4 py-2.5 bg-[#ff6b00] hover:bg-[#ea580c] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#ff6b00]/20 flex items-center gap-2 cursor-pointer active:scale-95 shrink-0"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Test Messaging Service</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-[#64748b] dark:text-[#bacac5] hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e2a45] rounded-xl transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ------------ LIVE SANDBOX QUICK BANNER ------------ */}
      <div className="mb-8 p-5 bg-[#131d33] border border-[#2b3850] rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#10b981] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Live Webhook Endpoint & Channel Relay</h3>
              <span className="text-[10px] font-mono font-bold bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded-full border border-[#10b981]/30 uppercase">
                Active
              </span>
            </div>
            <p className="text-xs text-[#bacac5] mt-0.5">
              Simulate instant messages or send raw HTTP webhook payloads to verify response latency and bot logic.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => handleOpenSimulator('webhook')}
            className="w-full md:w-auto px-3.5 py-2 bg-[#1e2a45] hover:bg-[#28385b] border border-[#2b3850] text-xs font-semibold text-white rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#ff6b00]" />
            <span>Webhook Tester</span>
          </button>
        </div>
      </div>

      {/* ------------ CHANNELS GRID ------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {channels.map((channel) => {
          const isConnected = connectedIds.includes(channel.id);
          return (
            <div
              key={channel.id}
              className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] hover:border-slate-300 dark:hover:border-[#ff6b00]/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md group relative"
            >
              <div>
                {/* Header row: Icon + Name */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${channel.badgeBg}`}>
                      {channel.icon}
                    </div>
                    <h2 className="text-base font-bold text-[#0f172a] dark:text-[#dae2fd] group-hover:text-[#ff6b00] transition-colors">
                      {channel.name}
                    </h2>
                  </div>

                  {isConnected && (
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold bg-[#10b981]/15 text-[#10b981] px-2.5 py-1 rounded-full border border-[#10b981]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                      Live
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-[#64748b] dark:text-[#bacac5] leading-relaxed mb-6 min-h-[40px] font-sans">
                  {channel.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleConnect(channel)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                    isConnected
                      ? 'border border-emerald-300 dark:border-[#10b981]/40 bg-emerald-50 dark:bg-[#10b981]/15 text-emerald-700 dark:text-[#10b981] hover:bg-emerald-100 dark:hover:bg-[#10b981]/25'
                      : 'border border-slate-200 dark:border-[#2b3850] bg-slate-50 dark:bg-[#131d33] hover:bg-slate-100 dark:hover:bg-[#1e2a45] text-slate-700 dark:text-[#dae2fd] hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 dark:text-[#10b981]" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-slate-400 dark:text-[#bacac5]" />
                      <span>Connect</span>
                    </>
                  )}
                </button>

                {/* Quick Test Button */}
                <button
                  onClick={() => handleOpenSimulator(channel.id)}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold border border-[#2b3850] bg-[#131d33] hover:bg-[#1e2a45] text-[#bacac5] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  title={`Send test message on ${channel.name}`}
                >
                  <Send className="w-3.5 h-3.5 text-[#ff6b00]" />
                  <span>Test</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ------------ CONNECT CREDENTIALS MODAL ------------ */}
      {activeModalChannel && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className="w-full max-w-md bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-6 shadow-2xl relative text-[#0f172a] dark:text-[#f1f5f9]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalChannel(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeModalChannel.badgeBg}`}>
                {activeModalChannel.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                  Connect {activeModalChannel.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#bacac5]">
                  Relay messages between {agentName} and {activeModalChannel.name}.
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-[#dae2fd] mb-1.5 block">
                  {activeModalChannel.inputLabel || 'API Token / Key'}
                </label>
                <input
                  type="text"
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={activeModalChannel.placeholder}
                  className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-4 py-2.5 text-xs text-[#0f172a] dark:text-[#f1f5f9] focus:outline-none focus:border-[#ff6b00] font-mono transition-colors"
                />
              </div>

              <div className="bg-slate-50 dark:bg-[#131d33] p-3 rounded-xl border border-slate-200/80 dark:border-[#2b3850] text-[11px] text-slate-500 dark:text-[#bacac5] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Credentials are encrypted and stored in your secure workspace environment configuration.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalChannel(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-[#bacac5] hover:bg-slate-100 dark:hover:bg-[#1e2a45] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-[#ff6b00] hover:bg-[#ea580c] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  {isSaving ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  <span>{isSaving ? 'Connecting...' : 'Save & Connect'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------ MESSAGING SERVICE TESTER SIMULATOR MODAL ------------ */}
      {isSimulatorOpen && (
        <div className="fixed inset-0 z-[220] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="w-full max-w-3xl bg-[#0f172a] border border-[#2b3850] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[650px] max-h-[90vh] text-[#f1f5f9] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-[#131d33] border-b border-[#2b3850] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ff6b00]/20 border border-[#ff6b00]/40 flex items-center justify-center text-[#ff6b00]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Messaging Service Test Sandbox
                    <span className="text-[10px] font-mono font-bold bg-[#ff6b00]/20 text-[#ff8c00] px-2 py-0.5 rounded border border-[#ff6b00]/30 uppercase">
                      Live Relay
                    </span>
                  </h3>
                  <p className="text-xs text-[#bacac5]">
                    Simulate messages sent via IM bots or Webhooks to test {agentName}'s auto-responses.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSimulatorOpen(false)}
                className="p-2 text-[#bacac5] hover:text-white hover:bg-[#1e2a45] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Top Channel Selector Tabs */}
            <div className="p-3 bg-[#090d16] border-b border-[#2b3850] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
              <span className="text-xs font-mono text-[#bacac5] px-2 uppercase shrink-0 font-semibold">Channel:</span>
              {channels.map((ch) => {
                const isActive = selectedSimChannel === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedSimChannel(ch.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#1e2a45] text-white border border-[#ff6b00]/50 shadow-xs'
                        : 'text-[#bacac5] hover:text-white hover:bg-[#131d33]'
                    }`}
                  >
                    <div className="w-4 h-4 shrink-0">{ch.icon}</div>
                    <span>{ch.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Log & Test Conversation Canvas */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#090d16]/80">
              {testLogs.map((log) => {
                if (log.sender === 'system') {
                  return (
                    <div key={log.id} className="flex justify-center my-2">
                      <div className="bg-[#131d33] border border-[#2b3850] px-3 py-1.5 rounded-full text-[11px] font-mono text-[#bacac5] flex items-center gap-2 shadow-xs">
                        <Terminal className="w-3.5 h-3.5 text-[#ff6b00]" />
                        <span>{log.text}</span>
                        <span className="text-[#bacac5]/50">[{log.timestamp}]</span>
                      </div>
                    </div>
                  );
                }

                const isUser = log.sender === 'user';
                return (
                  <div key={log.id} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div className="text-[10px] font-mono text-[#bacac5] mb-1 px-1 flex items-center gap-2">
                      <span>{isUser ? 'Test Client' : agentName}</span>
                      <span className="uppercase text-[#ff6b00] font-bold">({log.channel})</span>
                      <span>• {log.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-md ${
                        isUser
                          ? 'bg-[#1e2a45] text-white border border-[#ff6b00]/30'
                          : 'bg-[#131d33] text-[#dae2fd] border border-[#2b3850]'
                      }`}
                    >
                      <p className="font-sans font-medium">{log.text}</p>

                      {/* Optional Raw Payload expansion */}
                      {log.payload && (
                        <div className="mt-2.5 pt-2 border-t border-[#2b3850]/80">
                          <details className="group">
                            <summary className="text-[10px] font-mono text-[#ff8c00] cursor-pointer flex items-center gap-1 hover:underline select-none">
                              <Code className="w-3 h-3" />
                              <span>View JSON Webhook Event</span>
                            </summary>
                            <pre className="mt-1.5 p-2 bg-[#090d16] border border-[#2b3850] rounded-lg text-[10px] font-mono text-[#10b981] overflow-x-auto">
                              {JSON.stringify(log.payload, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isSimSending && (
                <div className="flex items-center gap-3 bg-[#131d33] p-3 rounded-2xl border border-[#ff6b00]/30 w-fit animate-pulse text-xs text-[#ff8c00] font-mono">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#ff6b00]" />
                  <span>Relaying event to {agentName} webhook processor...</span>
                </div>
              )}
            </div>

            {/* Bottom cURL Helper Drawer / Accordion */}
            <div className="px-4 py-2.5 bg-[#0f172a] border-t border-[#2b3850] flex items-center justify-between text-xs text-[#bacac5]">
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-[#ff6b00] font-bold">POST Endpoint:</span>
                <span className="font-mono text-white text-[11px] truncate">https://api.fastgem.io/v1/channels/{selectedSimChannel}/webhook</span>
              </div>
              <button
                onClick={copyCurl}
                className="px-2.5 py-1 bg-[#131d33] hover:bg-[#1e2a45] border border-[#2b3850] text-[#dae2fd] rounded-lg font-mono text-[11px] flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
              >
                {copiedCurl ? <CheckCircle2 className="w-3 h-3 text-[#10b981]" /> : <Copy className="w-3 h-3 text-[#ff6b00]" />}
                <span>{copiedCurl ? 'Copied cURL!' : 'Copy cURL Request'}</span>
              </button>
            </div>

            {/* Bottom Input bar for typing test message */}
            <form onSubmit={handleSendSimMessage} className="p-4 bg-[#131d33] border-t border-[#2b3850] flex items-center gap-3 shrink-0">
              <input
                type="text"
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                placeholder={`Type a test message for ${selectedSimChannel.toUpperCase()} channel...`}
                className="flex-1 bg-[#090d16] border border-[#2b3850] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#bacac5]/50 focus:outline-none focus:border-[#ff6b00] font-sans transition-colors"
              />
              <button
                type="submit"
                disabled={!simInput.trim() || isSimSending}
                className="px-5 py-2.5 bg-[#ff6b00] hover:bg-[#ea580c] disabled:opacity-40 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
