export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface TimerSettings {
  workDuration: number;       // in minutes
  shortBreakDuration: number; // in minutes
  longBreakDuration: number;  // in minutes
  longBreakInterval: number;  // every X pomodoros
  autoStartBreaks: boolean;
  autoStartWork: boolean;
  soundVolume: number;        // 0 to 100
  alarmSound: 'bell' | 'chime' | 'digital';
  tickingSound: 'none' | 'clock' | 'rain';
  notificationsEnabled: boolean;
}

export interface PomodoroStats {
  totalPomodoros: number;
  totalWorkMinutes: number;
  completedTasksCount: number;
}
