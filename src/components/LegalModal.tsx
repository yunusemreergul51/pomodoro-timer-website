import React from 'react';
import { useTranslation } from 'react-i18next';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { t } = useTranslation();

  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-lg">
            {isPrivacy ? (
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            ) : (
              <FileText className="w-5 h-5 text-blue-500" />
            )}
            <span>{isPrivacy ? t('legal.privacyTitle') : t('legal.termsTitle')}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                <strong>Effective Date:</strong> November 2026
              </p>
              <h4 className="font-bold text-stone-900 dark:text-white text-base">1. Zero Account / Local Storage</h4>
              <p>
                PomoFocus Pro respects your personal data. We do not require account registration, passwords, or personal email addresses. Your tasks, timer durations, theme preferences, and completed pomodoro stats are stored exclusively inside your local device web browser using HTML5 LocalStorage.
              </p>

              <h4 className="font-bold text-stone-900 dark:text-white text-base">2. Cookies and Third-Party Advertising</h4>
              <p>
                This website may use third-party advertising partners such as Google AdSense. Google and third-party vendors use cookies (such as the DoubleClick cookie) to serve relevant advertisements based on a user's prior visits to this website or other websites across the Internet.
              </p>
              <p>
                Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer" className="text-rose-500 underline">Google Ads Settings</a>.
              </p>

              <h4 className="font-bold text-stone-900 dark:text-white text-base">3. Analytics & Logs</h4>
              <p>
                Standard anonymized server logs (IP address, browser type, referral URL) may be collected for security, server performance, and DDoS prevention.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated:</strong> November 2026
              </p>
              <h4 className="font-bold text-stone-900 dark:text-white text-base">1. Acceptance of Terms</h4>
              <p>
                By accessing and using PomoFocus Pro, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the service.
              </p>

              <h4 className="font-bold text-stone-900 dark:text-white text-base">2. Free Use & License</h4>
              <p>
                PomoFocus Pro is provided free of charge for personal, educational, and professional productivity purposes.
              </p>

              <h4 className="font-bold text-stone-900 dark:text-white text-base">3. Disclaimer of Warranties</h4>
              <p>
                The service is provided on an "as is" and "as available" basis without warranties of any kind. We are not liable for any lost data resulting from clearing browser cache or changing devices.
              </p>
            </>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs sm:text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
