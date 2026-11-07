import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TimerSettings } from '../types';
import { playAlarmSound } from '../utils/sound';
import { defaultSettings } from '../utils/storage';
import { X, Volume2, Bell, Clock, Sliders, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: TimerSettings;
  onSaveSettings: (settings: TimerSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const { t } = useTranslation();
  const [localSettings, setLocalSettings] = useState<TimerSettings>(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings(localSettings);
    onClose();
  };

  const handleReset = () => {
    setLocalSettings(defaultSettings);
  };

  const testCurrentSound = () => {
    playAlarmSound(localSettings.alarmSound, localSettings.soundVolume);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 dark:border-stone-800 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200/80 dark:border-stone-800/80">
          <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-lg">
            <Sliders className="w-5 h-5 text-rose-500" />
            <span>{t('settings.title')}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-6">
          {/* Section: Durations */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
              <Clock className="w-4 h-4 text-rose-500" />
              {t('settings.durations')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {t('settings.workDuration')}
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={localSettings.workDuration}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, workDuration: Math.max(1, Number(e.target.value)) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold text-center text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {t('settings.shortBreakDuration')}
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={localSettings.shortBreakDuration}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, shortBreakDuration: Math.max(1, Number(e.target.value)) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold text-center text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {t('settings.longBreakDuration')}
                </label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={localSettings.longBreakDuration}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, longBreakDuration: Math.max(1, Number(e.target.value)) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold text-center text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
              <span>{t('settings.longBreakInterval')}</span>
              <input
                type="number"
                min="1"
                max="12"
                value={localSettings.longBreakInterval}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, longBreakInterval: Math.max(1, Number(e.target.value)) })
                }
                className="w-16 px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-semibold text-center text-stone-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Section: Automation */}
          <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
              {t('settings.automation')}
            </label>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  {t('settings.autoStartBreaks')}
                </span>
                <input
                  type="checkbox"
                  checked={localSettings.autoStartBreaks}
                  onChange={(e) => setLocalSettings({ ...localSettings, autoStartBreaks: e.target.checked })}
                  className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 accent-rose-600 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  {t('settings.autoStartWork')}
                </span>
                <input
                  type="checkbox"
                  checked={localSettings.autoStartWork}
                  onChange={(e) => setLocalSettings({ ...localSettings, autoStartWork: e.target.checked })}
                  className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 accent-rose-600 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Section: Audio & Notifications */}
          <div className="pt-4 border-t border-stone-200/60 dark:border-stone-800/60">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
              <Volume2 className="w-4 h-4 text-rose-500" />
              {t('settings.sound')}
            </label>

            {/* Sound Choice */}
            <div className="flex items-center justify-between gap-3">
              <select
                value={localSettings.alarmSound}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, alarmSound: e.target.value as 'bell' | 'chime' | 'digital' })
                }
                className="flex-1 px-3 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-medium text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="bell">{t('settings.soundBell')}</option>
                <option value="chime">{t('settings.soundChime')}</option>
                <option value="digital">{t('settings.soundDigital')}</option>
              </select>

              <button
                type="button"
                onClick={testCurrentSound}
                className="px-3 py-2 rounded-xl bg-stone-200 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
              >
                {t('settings.testSound')}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                <span>{t('settings.volume')}</span>
                <span>{localSettings.soundVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={localSettings.soundVolume}
                onChange={(e) => setLocalSettings({ ...localSettings, soundVolume: Number(e.target.value) })}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Notifications Toggle */}
            <div className="mt-4 pt-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-medium text-stone-700 dark:text-stone-300">
                <Bell className="w-4 h-4 text-stone-400" />
                {t('settings.desktopNotifications')}
              </span>
              <input
                type="checkbox"
                checked={localSettings.notificationsEnabled}
                onChange={(e) => setLocalSettings({ ...localSettings, notificationsEnabled: e.target.checked })}
                className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 accent-rose-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-7 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-300 transition-colors"
          >
            {t('settings.resetDefaults')}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{t('settings.save')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
