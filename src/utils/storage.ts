import { Task, TimerSettings, PomodoroStats } from '../types';

const STORAGE_KEYS = {
  TASKS: 'pomofocus_tasks',
  ACTIVE_TASK_ID: 'pomofocus_active_task_id',
  SETTINGS: 'pomofocus_settings',
  STATS: 'pomofocus_stats',
  THEME: 'pomofocus_theme',
  COOKIE_CONSENT: 'pomofocus_cookie_consent',
};

export const defaultSettings: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartWork: false,
  soundVolume: 70,
  alarmSound: 'bell',
  tickingSound: 'none',
  notificationsEnabled: true,
};

export const defaultStats: PomodoroStats = {
  totalPomodoros: 0,
  totalWorkMinutes: 0,
  completedTasksCount: 0,
};

export const storage = {
  getTasks: (): Task[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TASKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks', e);
    }
  },

  getActiveTaskId: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_TASK_ID);
  },
  saveActiveTaskId: (id: string | null): void => {
    if (id) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TASK_ID, id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_TASK_ID);
    }
  },

  getSettings: (): TimerSettings => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  },
  saveSettings: (settings: TimerSettings): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },

  getStats: (): PomodoroStats => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STATS);
      return data ? { ...defaultStats, ...JSON.parse(data) } : defaultStats;
    } catch {
      return defaultStats;
    }
  },
  saveStats: (stats: PomodoroStats): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save stats', e);
    }
  },

  getTheme: (): 'light' | 'dark' => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) as 'light' | 'dark' | null;
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },
  saveTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  hasConsent: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT) === 'accepted';
  },
  giveConsent: (): void => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'accepted');
  },
};
