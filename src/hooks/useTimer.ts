import { useState, useEffect, useRef, useCallback } from 'react';
import { TimerMode, TimerSettings } from '../types';
import { storage } from '../utils/storage';
import { playAlarmSound } from '../utils/sound';
import { fireCelebration } from '../utils/confetti';
import { createTimerWorker } from '../workers/timerWorker';

export function useTimer(settings: TimerSettings) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);

  // Duration in seconds for current mode
  const getDurationForMode = useCallback(
    (m: TimerMode): number => {
      switch (m) {
        case 'work':
          return settings.workDuration * 60;
        case 'shortBreak':
          return settings.shortBreakDuration * 60;
        case 'longBreak':
          return settings.longBreakDuration * 60;
      }
    },
    [settings]
  );

  const [timeLeft, setTimeLeft] = useState<number>(() => getDurationForMode('work'));

  const workerRef = useRef<Worker | null>(null);
  const endTimeRef = useRef<number | null>(null);

  // Sync timeLeft when duration settings change if timer is not running
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getDurationForMode(mode));
    }
  }, [mode, settings, isRunning, getDurationForMode]);

  // Request browser desktop notification permissions
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (e) {
        console.error('Notification permission error', e);
      }
    }
  }, []);

  const sendNotification = useCallback(
    (title: string, body: string) => {
      if (
        settings.notificationsEnabled &&
        'Notification' in window &&
        Notification.permission === 'granted'
      ) {
        try {
          new Notification(title, {
            body,
            icon: '/favicon.svg',
          });
        } catch (e) {
          console.error('Failed to trigger notification', e);
        }
      }
    },
    [settings.notificationsEnabled]
  );

  // Switch to next mode
  const handleSessionComplete = useCallback(() => {
    playAlarmSound(settings.alarmSound, settings.soundVolume);

    if (mode === 'work') {
      fireCelebration();
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);

      // Save stats
      const stats = storage.getStats();
      storage.saveStats({
        ...stats,
        totalPomodoros: stats.totalPomodoros + 1,
        totalWorkMinutes: stats.totalWorkMinutes + settings.workDuration,
      });

      const isLongBreak = newCount % settings.longBreakInterval === 0;
      const nextMode: TimerMode = isLongBreak ? 'longBreak' : 'shortBreak';
      const nextDuration = getDurationForMode(nextMode);

      setMode(nextMode);
      setTimeLeft(nextDuration);

      sendNotification(
        isLongBreak ? 'Long Break Time!' : 'Short Break Time!',
        'Great job! Take a well-deserved breath and step away from your desk.'
      );

      if (settings.autoStartBreaks) {
        setIsRunning(true);
        endTimeRef.current = Date.now() + nextDuration * 1000;
        if (workerRef.current) {
          workerRef.current.postMessage({ action: 'start', interval: 250 });
        }
      } else {
        setIsRunning(false);
        endTimeRef.current = null;
      }
    } else {
      // Break completed, back to work
      const workDuration = getDurationForMode('work');
      setMode('work');
      setTimeLeft(workDuration);

      sendNotification(
        'Break is Over!',
        'Time to get back in the zone and continue your pomodoro session.'
      );

      if (settings.autoStartWork) {
        setIsRunning(true);
        endTimeRef.current = Date.now() + workDuration * 1000;
        if (workerRef.current) {
          workerRef.current.postMessage({ action: 'start', interval: 250 });
        }
      } else {
        setIsRunning(false);
        endTimeRef.current = null;
      }
    }
  }, [
    mode,
    pomodoroCount,
    settings,
    getDurationForMode,
    sendNotification,
  ]);

  // Keep a stable ref to handleSessionComplete to avoid re-creating worker on state updates
  const handleSessionCompleteRef = useRef(handleSessionComplete);
  useEffect(() => {
    handleSessionCompleteRef.current = handleSessionComplete;
  }, [handleSessionComplete]);

  // Setup Web Worker once on mount for drift-free background ticking
  useEffect(() => {
    try {
      const worker = createTimerWorker();
      workerRef.current = worker;

      worker.onmessage = (e) => {
        if (e.data.type === 'tick') {
          if (endTimeRef.current) {
            const now = Date.now();
            const diffSeconds = Math.max(0, Math.round((endTimeRef.current - now) / 1000));
            setTimeLeft(diffSeconds);

            if (diffSeconds <= 0) {
              worker.postMessage({ action: 'stop' });
              endTimeRef.current = null;
              handleSessionCompleteRef.current();
            }
          }
        }
      };
    } catch (e) {
      console.warn('Worker initialization fallback to interval', e);
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  // Start / Pause control
  const startTimer = () => {
    requestNotificationPermission();
    endTimeRef.current = Date.now() + timeLeft * 1000;
    setIsRunning(true);
    if (workerRef.current) {
      workerRef.current.postMessage({ action: 'start', interval: 250 });
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (workerRef.current) {
      workerRef.current.postMessage({ action: 'stop' });
    }
    endTimeRef.current = null;
  };

  const resetTimer = () => {
    pauseTimer();
    setTimeLeft(getDurationForMode(mode));
  };

  const skipTimer = () => {
    pauseTimer();
    handleSessionComplete();
  };

  const switchMode = (newMode: TimerMode) => {
    pauseTimer();
    setMode(newMode);
    setTimeLeft(getDurationForMode(newMode));
  };

  // Sync browser tab title
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    const modeLabel = mode === 'work' ? 'Pomodoro' : mode === 'shortBreak' ? 'Short Break' : 'Long Break';

    document.title = `${formatted} - ${modeLabel} | PomoFocus Pro`;
  }, [timeLeft, mode]);

  const totalDuration = getDurationForMode(mode);
  const progressPercent = Math.min(100, Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100));

  return {
    mode,
    timeLeft,
    totalDuration,
    progressPercent,
    isRunning,
    pomodoroCount,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    switchMode,
  };
}
