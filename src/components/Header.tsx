import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Settings, Timer, Globe } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  onOpenSettings,
}) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('tr') ? 'en' : 'tr';
    i18n.changeLanguage(nextLang);
  };

  const currentLang = i18n.language.startsWith('tr') ? 'TR' : 'EN';

  return (
    <header className="w-full max-w-3xl mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
          <Timer className="w-5 h-5 animate-pulse-subtle" />
        </div>
        <div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-stone-900 to-stone-700 dark:from-white dark:to-stone-300 bg-clip-text text-transparent">
            {t('app.title')}
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          title="Change language"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-800/80 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
          <span>{currentLang}</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-2 rounded-lg bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-800/80 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          title={t('settings.title')}
          className="p-2 rounded-lg bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-800/80 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
