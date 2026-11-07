import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { storage } from '../utils/storage';
import { Cookie } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const { t } = useTranslation();
  const [accepted, setAccepted] = useState<boolean>(() => storage.hasConsent());

  if (accepted) return null;

  const handleAccept = () => {
    storage.giveConsent();
    setAccepted(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 p-4 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-2.5">
        <Cookie className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
          {t('legal.cookieText')}{' '}
          <button
            onClick={onOpenPrivacy}
            className="text-rose-600 dark:text-rose-400 font-semibold underline underline-offset-2 hover:opacity-80"
          >
            {t('legal.cookiePolicy')}
          </button>
        </p>
      </div>

      <button
        onClick={handleAccept}
        className="px-4 py-2 w-full sm:w-auto rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold transition-colors flex-shrink-0"
      >
        {t('legal.cookieAccept')}
      </button>
    </div>
  );
};
