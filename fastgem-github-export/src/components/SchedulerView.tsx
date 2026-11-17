import React, { useState } from 'react';
import { Clock, Plus, X, Trash2, Calendar, Play } from 'lucide-react';

interface SchedulerViewProps {
  agentName?: string;
  onClose?: () => void;
  standalone?: boolean;
}

export const SchedulerView: React.FC<SchedulerViewProps> = ({
  agentName = 'Tester',
  onClose,
  standalone = false,
}) => {
  const [tasks, setTasks] = useState<Array<{
    id: string;
    title: string;
    cron: string;
    lastRun?: string;
    nextRun: string;
    status: 'active' | 'paused';
  }>>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCron, setTaskCron] = useState('0 9 * * *');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: taskTitle,
        cron: taskCron,
        nextRun: 'In 12 hours (09:00 UTC)',
        status: 'active',
      },
    ]);
    setTaskTitle('');
    setIsAddModalOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className={`w-full ${standalone ? 'p-6 sm:p-8' : ''} text-[#0f172a] dark:text-[#f1f5f9] antialiased`}>
      {/* ------------ HEADER ------------ */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-slate-700 dark:text-[#f1f5f9] stroke-[1.75]" />
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0f172a] dark:text-[#f1f5f9]">
              Scheduler
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#64748b] dark:text-[#94a3b8] mt-2 font-sans">
            Scheduled tasks for <span className="font-semibold text-[#0f172a] dark:text-white">{agentName}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-white dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl text-xs sm:text-sm font-medium text-slate-800 dark:text-[#f1f5f9] hover:bg-slate-50 dark:hover:bg-[#1e2a45] transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>New Task</span>
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
      {tasks.length === 0 ? (
        /* Empty dashed container exactly like reference screenshot */
        <div className="w-full rounded-2xl border border-dashed border-slate-200 dark:border-[#2b3850]/80 p-16 sm:p-24 flex flex-col items-center justify-center text-center bg-transparent">
          {/* Subtle circle clock icon */}
          <div className="w-12 h-12 rounded-full border border-slate-200 dark:border-[#2b3850] flex items-center justify-center mb-4 text-slate-400 dark:text-[#8fa3a8]">
            <Clock className="w-6 h-6 stroke-[1.5]" />
          </div>

          <p className="text-sm sm:text-base text-slate-500 dark:text-[#94a3b8] font-sans">
            No scheduled tasks yet.
          </p>

          <button
            type="button"
            onClick={() => {
              setTasks([
                {
                  id: 'demo-1',
                  title: 'Daily Market Briefing Digest',
                  cron: '0 8 * * *',
                  lastRun: 'Today, 08:00 UTC',
                  nextRun: 'Tomorrow, 08:00 UTC',
                  status: 'active',
                },
              ]);
            }}
            className="mt-6 text-xs text-slate-400 hover:text-slate-600 dark:text-[#64748b] dark:hover:text-[#94a3b8] font-mono underline cursor-pointer"
          >
            Create sample cron task
          </button>
        </div>
      ) : (
        /* Task List */
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#2b3850]">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#94a3b8]">
              Scheduled Tasks ({tasks.length})
            </span>
            <button
              onClick={() => setTasks([])}
              className="text-xs text-slate-500 hover:text-rose-500 dark:text-[#94a3b8] dark:hover:text-rose-400 font-mono"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tasks.map((t) => (
              <div
                key={t.id}
                className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-[#ff6b00]/15 border border-orange-200/60 dark:border-[#ff6b00]/30 flex items-center justify-center shrink-0 text-[#ea580c] dark:text-[#ff8c00]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-[#f1f5f9]">{t.title}</h4>
                      <span className="text-[10px] font-mono bg-slate-100 dark:bg-[#18233a] px-2 py-0.5 rounded text-slate-700 dark:text-[#dae2fd] border border-slate-200 dark:border-[#2b3850]">
                        {t.cron}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#94a3b8] mt-1 font-sans">
                      Next run: <span className="font-medium text-slate-700 dark:text-slate-300">{t.nextRun}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => handleDeleteTask(t.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------ ADD TASK MODAL ------------ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b3850] rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-[#f1f5f9]">Schedule New Task</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Daily Market Summary, Sync CRM Contacts"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-[#f1f5f9] focus:outline-none focus:border-amber-500 dark:focus:border-[#ff6b00]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Cron Expression
                </label>
                <input
                  type="text"
                  placeholder="0 9 * * *"
                  value={taskCron}
                  onChange={(e) => setTaskCron(e.target.value)}
                  className="w-full font-mono bg-slate-50 dark:bg-[#131d33] border border-slate-200 dark:border-[#2b3850] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 dark:text-[#f1f5f9] focus:outline-none focus:border-amber-500 dark:focus:border-[#ff6b00]"
                  required
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
