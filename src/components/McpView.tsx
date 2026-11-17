import React, { useState } from 'react';
import { Plus, Server, X, Trash2, Check, ExternalLink } from 'lucide-react';

interface McpViewProps {
  agentName?: string;
  onClose?: () => void;
  standalone?: boolean;
}

export const McpView: React.FC<McpViewProps> = ({
  agentName = 'Tester',
  onClose,
  standalone = false,
}) => {
  const [servers, setServers] = useState<Array<{
    id: string;
    name: string;
    type: 'stdio' | 'sse';
    commandOrUrl: string;
    status: 'connected' | 'disconnected';
    toolsCount: number;
  }>>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [serverName, setServerName] = useState('');
  const [serverType, setServerType] = useState<'stdio' | 'sse'>('sse');
  const [commandOrUrl, setCommandOrUrl] = useState('');

  const handleAddServer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverName) return;
    setServers((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: serverName,
        type: serverType,
        commandOrUrl: commandOrUrl || (serverType === 'sse' ? 'http://localhost:8080/sse' : 'npx -y @modelcontextprotocol/server-memory'),
        status: 'connected',
        toolsCount: 3,
      },
    ]);
    setServerName('');
    setCommandOrUrl('');
    setIsAddModalOpen(false);
  };

  const handleDeleteServer = (id: string) => {
    setServers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className={`w-full ${standalone ? 'p-6 sm:p-8' : ''} text-[#0f172a] dark:text-[#f1f5f9] antialiased`}>
      {/* ------------ HEADER ------------ */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
            MCP Servers
          </h1>
          <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-2 font-sans max-w-3xl leading-relaxed">
            Connect external tool servers via Model Context Protocol. Tools from MCP servers are available to <span className="font-semibold text-[#0f172a] dark:text-white">{agentName}</span> in every conversation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-amber-600 dark:bg-[#c2410c] hover:bg-amber-700 dark:hover:bg-[#9a3412] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Server</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1e2a45] rounded-xl transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ------------ CONTENT ------------ */}
      {servers.length === 0 ? (
        /* Empty dashed container matching reference image */
        <div className="w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-[#2b3850]/80 p-16 sm:p-24 flex flex-col items-center justify-center text-center bg-transparent transition-all">
          {/* Stacked Server Outline Icon */}
          <div className="w-12 h-12 rounded-xl bg-slate-100/80 dark:bg-[#18233a]/60 border border-slate-200/60 dark:border-[#2b3850] flex items-center justify-center mb-4 text-slate-400 dark:text-[#64748b]">
            <Server className="w-6 h-6 stroke-[1.5]" />
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-[#dae2fd] mb-1.5">
            No MCP servers configured.
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8fa3a8] font-sans max-w-md leading-relaxed">
            Add an MCP server to extend this agent with external tools.
          </p>

          <button
            type="button"
            onClick={() => {
              setServers([
                {
                  id: 'demo-1',
                  name: 'Memory Server (MCP)',
                  type: 'stdio',
                  commandOrUrl: 'npx -y @modelcontextprotocol/server-memory',
                  status: 'connected',
                  toolsCount: 4,
                },
                {
                  id: 'demo-2',
                  name: 'PostgreSQL DB Inspector',
                  type: 'sse',
                  commandOrUrl: 'http://localhost:8080/mcp/sse',
                  status: 'connected',
                  toolsCount: 6,
                },
              ]);
            }}
            className="mt-6 text-xs text-slate-400 hover:text-slate-600 dark:text-[#64748b] dark:hover:text-[#94a3b8] font-mono underline"
          >
            Load sample MCP server
          </button>
        </div>
      ) : (
        /* List of Configured MCP Servers */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#2b3850]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8fa3a8]">
              Active Servers ({servers.length})
            </span>
            <button
              onClick={() => setServers([])}
              className="text-xs text-slate-500 hover:text-rose-500 dark:text-[#8fa3a8] dark:hover:text-rose-400 font-mono"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {servers.map((s) => (
              <div
                key={s.id}
                className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#1e2a45] border border-slate-200 dark:border-[#2b3850] flex items-center justify-center shrink-0 text-slate-700 dark:text-[#f1f5f9] mt-0.5">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-semibold text-slate-900 dark:text-[#dae2fd]">{s.name}</h4>
                      <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-[#1e2a45] px-2 py-0.5 rounded text-slate-600 dark:text-[#bacac5] border border-slate-200 dark:border-[#2b3850]">
                        {s.type}
                      </span>
                      <span className="text-[10px] font-mono bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {s.status}
                      </span>
                    </div>
                    <code className="text-xs text-slate-500 dark:text-[#8fa3a8] font-mono mt-1 block">
                      {s.commandOrUrl}
                    </code>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-mono text-slate-500 dark:text-[#8fa3a8]">
                    {s.toolsCount} tools exposed
                  </span>
                  <button
                    onClick={() => handleDeleteServer(s.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove server"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------ ADD SERVER MODAL ------------ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f1f5f9]">Add MCP Server</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddServer} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Server Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Memory Server, Postgres DB"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 dark:text-[#f1f5f9] focus:outline-none focus:border-amber-500 dark:focus:border-[#ff6b00]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Transport Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setServerType('sse')}
                    className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                      serverType === 'sse'
                        ? 'bg-amber-50 dark:bg-[#1e2a45] border-amber-500 dark:border-[#ff6b00] text-slate-900 dark:text-white font-semibold'
                        : 'bg-slate-50 dark:bg-[#131d33] border-slate-200 dark:border-[#2b3850] text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    SSE (HTTP)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServerType('stdio')}
                    className={`py-2 text-xs font-medium rounded-xl border transition-all ${
                      serverType === 'stdio'
                        ? 'bg-amber-50 dark:bg-[#1e2a45] border-amber-500 dark:border-[#ff6b00] text-slate-900 dark:text-white font-semibold'
                        : 'bg-slate-50 dark:bg-[#131d33] border-slate-200 dark:border-[#2b3850] text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    STDIO (Command)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {serverType === 'sse' ? 'Server SSE Endpoint URL' : 'Command Executable'}
                </label>
                <input
                  type="text"
                  placeholder={serverType === 'sse' ? 'http://localhost:8080/sse' : 'npx -y @modelcontextprotocol/server-memory'}
                  value={commandOrUrl}
                  onChange={(e) => setCommandOrUrl(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 dark:text-[#f1f5f9] focus:outline-none focus:border-amber-500 dark:focus:border-[#ff6b00]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-[#94a3b8] hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 dark:bg-[#c2410c] hover:bg-amber-700 dark:hover:bg-[#9a3412] text-white font-medium text-xs rounded-xl shadow-xs"
                >
                  Connect Server
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
