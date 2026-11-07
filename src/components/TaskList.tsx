import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Task, TaskFilter } from '../types';
import { Plus, Check, Trash2, Edit2, CheckCircle2, Circle, Target } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  allTasksCount: number;
  activeTaskId: string | null;
  filter: TaskFilter;
  setFilter: (f: TaskFilter) => void;
  onAddTask: (title: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
  onClearCompleted: () => void;
  onSelectActiveTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  allTasksCount,
  activeTaskId,
  filter,
  setFilter,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onClearCompleted,
  onSelectActiveTask,
}) => {
  const { t } = useTranslation();
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onAddTask(newTitle);
      setNewTitle('');
    }
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const saveEdit = (id: string) => {
    if (editTitle.trim()) {
      onEditTask(id, editTitle);
    }
    setEditingId(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-stone-200/80 dark:border-stone-800/80 shadow-md">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/60 dark:border-stone-800/60">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            {t('tasks.heading')}
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
            {allTasksCount}
          </span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/60 p-1 rounded-xl self-start sm:self-auto border border-stone-200/40 dark:border-stone-700/40">
          {(['all', 'active', 'completed'] as TaskFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {f === 'all'
                ? t('tasks.filterAll')
                : f === 'active'
                ? t('tasks.filterActive')
                : t('tasks.filterCompleted')}
            </button>
          ))}
        </div>
      </div>

      {/* Task Input Form */}
      <form onSubmit={handleAddSubmit} className="mt-5 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={t('tasks.addPlaceholder')}
          className="flex-1 px-4 py-3 rounded-2xl bg-stone-100/80 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={!newTitle.trim()}
          className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-1.5 shadow-sm shadow-rose-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">{t('tasks.addButton')}</span>
        </button>
      </form>

      {/* Tasks List */}
      <div className="mt-5 space-y-2 max-h-96 overflow-y-auto pr-1">
        {tasks.length === 0 ? (
          <div className="py-8 text-center text-stone-400 dark:text-stone-500 text-xs sm:text-sm">
            {t('tasks.empty')}
          </div>
        ) : (
          tasks.map((task) => {
            const isActive = task.id === activeTaskId;

            return (
              <div
                key={task.id}
                className={`group flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/50 shadow-sm'
                    : 'bg-white dark:bg-stone-900/60 border-stone-200/70 dark:border-stone-800/70 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                {/* Left check & title */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="flex-shrink-0 text-stone-400 hover:text-emerald-500 transition-colors"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300 dark:text-stone-600 hover:text-stone-500" />
                    )}
                  </button>

                  {editingId === task.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit(task.id)}
                        autoFocus
                        className="w-full px-2 py-1 text-sm bg-stone-100 dark:bg-stone-800 rounded-lg border border-stone-300 dark:border-stone-600 text-stone-900 dark:text-white focus:outline-none"
                      />
                      <button
                        onClick={() => saveEdit(task.id)}
                        className="p-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span
                      onClick={() => onSelectActiveTask(task.id)}
                      className={`text-sm sm:text-base cursor-pointer truncate select-none ${
                        task.completed
                          ? 'line-through text-stone-400 dark:text-stone-500'
                          : 'text-stone-800 dark:text-stone-100 font-medium'
                      }`}
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Focus Target Button */}
                  <button
                    onClick={() => onSelectActiveTask(task.id)}
                    title={isActive ? t('activeTask.unselect') : t('activeTask.focusingOn')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40'
                        : 'text-stone-400 hover:text-rose-500 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    <Target className="w-4 h-4" />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => startEditing(task)}
                    title="Edit"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    title="Delete"
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Clear Completed */}
      {tasks.some((t) => t.completed) && (
        <div className="mt-4 pt-3 border-t border-stone-200/50 dark:border-stone-800/50 flex justify-end">
          <button
            onClick={onClearCompleted}
            className="text-xs font-semibold text-stone-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            {t('tasks.clearCompleted')}
          </button>
        </div>
      )}
    </div>
  );
};
