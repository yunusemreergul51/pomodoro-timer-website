import React from 'react';
import { useTranslation } from 'react-i18next';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'skyscraper';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'horizontal',
  className = '',
}) => {
  const { t } = useTranslation();

  const isSkyscraper = format === 'skyscraper';
  const isHorizontal = format === 'horizontal';

  return (
    <aside
      aria-label="Advertisement"
      className={`flex flex-col items-center justify-center ${
        isSkyscraper ? 'w-full' : 'w-full max-w-3xl mx-auto my-6'
      } ${className}`}
    >
      <div className="text-[10px] uppercase font-bold tracking-widest text-stone-400 dark:text-stone-600 mb-1 select-none">
        {t('ad.sponsored')}
      </div>

      <div
        className={`w-full rounded-3xl bg-stone-100/70 dark:bg-stone-900/40 border border-dashed border-stone-300/80 dark:border-stone-800 flex items-center justify-center p-4 text-center transition-all ${
          isSkyscraper
            ? 'h-[600px]'
            : isHorizontal
            ? 'h-24 sm:h-28 max-w-2xl'
            : 'h-64 max-w-xs'
        }`}
      >
        {/* Placeholder container: Once AdSense is active, insert your <ins class="adsbygoogle"> snippet here */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
            {t('ad.bannerText')}
          </p>
          <p className="text-[11px] text-stone-400 dark:text-stone-500">
            {isSkyscraper ? 'Google AdSense 160x600 / Skyscraper' : 'Google AdSense 728x90 / Responsive'}
          </p>
        </div>
      </div>
    </aside>
  );
};
