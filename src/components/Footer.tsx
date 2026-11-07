import React from 'react';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full max-w-3xl mx-auto px-4 py-8 mt-6 border-t border-stone-200/60 dark:border-stone-800/60 text-xs text-stone-500 dark:text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-1.5">
        <span>&copy; {year} {t('app.title')}.</span>
        <span>{t('footer.rights')}</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => onOpenLegal('privacy')}
          className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors underline underline-offset-2"
        >
          {t('footer.privacy')}
        </button>
        <span>•</span>
        <button
          onClick={() => onOpenLegal('terms')}
          className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors underline underline-offset-2"
        >
          {t('footer.terms')}
        </button>
      </div>
    </footer>
  );
};
