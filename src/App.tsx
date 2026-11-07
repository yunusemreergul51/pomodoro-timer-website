import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useTimer } from './hooks/useTimer';
import { useTasks } from './hooks/useTasks';
import { storage } from './utils/storage';
import { TimerSettings } from './types';

import { Header } from './components/Header';
import { TimerDisplay } from './components/TimerDisplay';
import { ActiveTaskBar } from './components/ActiveTaskBar';
import { TaskList } from './components/TaskList';
import { AdBanner } from './components/AdBanner';
import { GuideSection } from './components/GuideSection';
import { SettingsModal } from './components/SettingsModal';
import { LegalModal } from './components/LegalModal';
import { CookieConsent } from './components/CookieConsent';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<TimerSettings>(() => storage.getSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const timer = useTimer(settings);
  const tasks = useTasks();

  const handleSaveSettings = (newSettings: TimerSettings) => {
    storage.saveSettings(newSettings);
    setSettings(newSettings);
  };

  // Ambient gradient backdrop based on active mode
  const bgAura = {
    work: 'from-rose-500/10 via-rose-500/5 to-transparent',
    shortBreak: 'from-teal-500/10 via-teal-500/5 to-transparent',
    longBreak: 'from-blue-500/10 via-blue-500/5 to-transparent',
  }[timer.mode];

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Dynamic Background Glow */}
      <div
        className={`pointer-events-none fixed inset-0 bg-gradient-to-b ${bgAura} transition-colors duration-700 -z-10`}
      />

      {/* Main Container */}
      <div className="w-full">
        {/* Navigation Header */}
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* 3-Column Layout: Left Skyscraper, Center Content, Right Skyscraper */}
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 flex justify-center items-start gap-6 mt-2 sm:mt-4">
          {/* Left Skyscraper Banner (Visible on large screens) */}
          <aside className="hidden xl:block w-40 2xl:w-48 sticky top-6 flex-shrink-0">
            <AdBanner format="skyscraper" className="my-0" />
          </aside>

          {/* Main Content Area */}
          <main className="w-full max-w-xl sm:max-w-2xl min-w-0">
            {/* Pomodoro Timer */}
            <TimerDisplay
              mode={timer.mode}
              timeLeft={timer.timeLeft}
              totalDuration={timer.totalDuration}
              progressPercent={timer.progressPercent}
              isRunning={timer.isRunning}
              pomodoroCount={timer.pomodoroCount}
              onStart={timer.startTimer}
              onPause={timer.pauseTimer}
              onReset={timer.resetTimer}
              onSkip={timer.skipTimer}
              onSwitchMode={timer.switchMode}
            />

            {/* Active Focusing Task Sub-bar */}
            <ActiveTaskBar
              activeTask={tasks.activeTask}
              onClearActive={() => tasks.selectActiveTask('')}
              onToggleActiveComplete={() => {
                if (tasks.activeTask) {
                  tasks.toggleTask(tasks.activeTask.id);
                }
              }}
            />

            {/* To-Do List */}
            <TaskList
              tasks={tasks.tasks}
              allTasksCount={tasks.allTasksCount}
              activeTaskId={tasks.activeTaskId}
              filter={tasks.filter}
              setFilter={tasks.setFilter}
              onAddTask={tasks.addTask}
              onToggleTask={tasks.toggleTask}
              onDeleteTask={tasks.deleteTask}
              onEditTask={tasks.editTask}
              onClearCompleted={tasks.clearCompleted}
              onSelectActiveTask={tasks.selectActiveTask}
            />

            {/* Bottom Ad Banner */}
            <AdBanner format="horizontal" className="px-4 mt-12" />

            {/* Rich Content & SEO Guide */}
            <GuideSection />
          </main>

          {/* Right Skyscraper Banner (Visible on large screens) */}
          <aside className="hidden xl:block w-40 2xl:w-48 sticky top-6 flex-shrink-0">
            <AdBanner format="skyscraper" className="my-0" />
          </aside>
        </div>
      </div>

      {/* Modals & Cookie Banner */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <CookieConsent onOpenPrivacy={() => setLegalModalType('privacy')} />

      {/* Footer */}
      <Footer onOpenLegal={(type) => setLegalModalType(type)} />
    </div>
  );
};

export default App;
