import React from 'react';
import { useTranslation } from 'react-i18next';
import { TimerMode } from '../types';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';

interface TimerDisplayProps {
  mode: TimerMode;
  timeLeft: number;
  totalDuration: number;
  progressPercent: number;
  isRunning: boolean;
  pomodoroCount: number;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onSwitchMode: (mode: TimerMode) => void;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({
  mode,
  timeLeft,
  progressPercent,
  isRunning,
  pomodoroCount,
  onStart,
  onPause,
  onReset,
  onSkip,
  onSwitchMode,
}) => {
  const { t } = useTranslation();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Mode-based accent colors
  const modeTheme = {
    work: {
      activeTab: 'bg-rose-500 text-white shadow-rose-500/25',
      primaryBtn: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30 ring-rose-500/40',
      progressBar: 'bg-rose-500',
      glow: 'shadow-rose-500/10',
    },
    shortBreak: {
      activeTab: 'bg-teal-600 text-white shadow-teal-600/25',
      primaryBtn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/30 ring-teal-500/40',
      progressBar: 'bg-teal-500',
      glow: 'shadow-teal-500/10',
    },
    longBreak: {
      activeTab: 'bg-blue-600 text-white shadow-blue-600/25',
      primaryBtn: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30 ring-blue-500/40',
      progressBar: 'bg-blue-500',
      glow: 'shadow-blue-500/10',
    },
  }[mode];

  return (
    <div className={`w-full max-w-xl mx-auto rounded-3xl p-6 sm:p-8 bg-white/70 dark:bg-stone-900/70 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800/80 shadow-xl ${modeTheme.glow} transition-all duration-500`}>
      {/* Mode Switch Tabs */}
      <div className="flex items-center justify-center p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-800/60 max-w-sm mx-auto mb-8 border border-stone-200/50 dark:border-stone-700/50">
        <button
          onClick={() => onSwitchMode('work')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            mode === 'work'
              ? modeTheme.activeTab + ' shadow-md'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          {t('timer.work')}
        </button>

        <button
          onClick={() => onSwitchMode('shortBreak')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            mode === 'shortBreak'
              ? modeTheme.activeTab + ' shadow-md'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          {t('timer.shortBreak')}
        </button>

        <button
          onClick={() => onSwitchMode('longBreak')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            mode === 'longBreak'
              ? modeTheme.activeTab + ' shadow-md'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          {t('timer.longBreak')}
        </button>
      </div>

      {/* Main Countdown Time */}
      <div className="text-center my-4 sm:my-6 select-none">
        <span className="font-mono text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-stone-900 dark:text-white tabular-nums drop-shadow-sm">
          {formattedTime}
        </span>
      </div>

      {/* Smooth Progress Bar */}
      <div className="w-full max-w-md mx-auto h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden mb-8">
        <div
          className={`h-full ${modeTheme.progressBar} transition-all duration-300 ease-out`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Action Controls */}
      <div className="flex items-center justify-center gap-4">
        {/* Reset Button */}
        <button
          onClick={onReset}
          title={t('timer.reset')}
          className="p-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700/80 text-stone-700 dark:text-stone-300 transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Primary Start / Pause Button */}
        <button
          onClick={isRunning ? onPause : onStart}
          className={`px-10 py-4 rounded-2xl font-black text-lg sm:text-xl tracking-wider flex items-center gap-2.5 shadow-lg ring-4 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${modeTheme.primaryBtn}`}
        >
          {isRunning ? (
            <>
              <Pause className="w-6 h-6 fill-current" />
              <span>{t('timer.pause')}</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
              <span>{t('timer.start')}</span>
            </>
          )}
        </button>

        {/* Skip Button */}
        <button
          onClick={onSkip}
          title={t('timer.skip')}
          className="p-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700/80 text-stone-700 dark:text-stone-300 transition-all hover:scale-105 active:scale-95"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Session Counter Sub-bar */}
      <div className="mt-8 pt-4 border-t border-stone-200/60 dark:border-stone-800/60 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-stone-500 dark:text-stone-400">
        <span>#{pomodoroCount + 1} {t('timer.session')}</span>
        <span>•</span>
        <span>{pomodoroCount} {t('timer.completed')}</span>
      </div>
    </div>
  );
};
