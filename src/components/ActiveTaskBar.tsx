import React from 'react';
import { useTranslation } from 'react-i18next';
import { Task } from '../types';
import { Target, X, CheckCircle2 } from 'lucide-react';

interface ActiveTaskBarProps {
  activeTask: Task | null;
  onClearActive: () => void;
  onToggleActiveComplete: () => void;
}

export const ActiveTaskBar: React.FC<ActiveTaskBarProps> = ({
  activeTask,
  onClearActive,
  onToggleActiveComplete,
}) => {
  const { t } = useTranslation();

  if (!activeTask) {
    return (
      <div className="w-full max-w-xl mx-auto mt-4 px-4 py-3 rounded-2xl bg-stone-100/60 dark:bg-stone-900/40 border border-dashed border-stone-300 dark:border-stone-800 text-center text-xs sm:text-sm text-stone-500 dark:text-stone-400">
        <span className="flex items-center justify-center gap-1.5">
          <Target className="w-4 h-4 text-stone-400" />
          {t('activeTask.noActive')}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-4 p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between gap-3 animate-in fade-in duration-300">
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onToggleActiveComplete}
          title={activeTask.completed ? t('tasks.markUndone') : t('tasks.markDone')}
          className="text-stone-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex-shrink-0"
        >
          <CheckCircle2
            className={`w-5 h-5 ${
              activeTask.completed ? 'text-emerald-500 fill-emerald-500/20' : ''
            }`}
          />
        </button>

        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-rose-500 dark:text-rose-400">
            {t('activeTask.focusingOn')}
          </div>
          <div
            className={`text-sm sm:text-base font-medium truncate text-stone-800 dark:text-stone-100 ${
              activeTask.completed ? 'line-through text-stone-400 dark:text-stone-500' : ''
            }`}
          >
            {activeTask.title}
          </div>
        </div>
      </div>

      <button
        onClick={onClearActive}
        title={t('activeTask.unselect')}
        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
