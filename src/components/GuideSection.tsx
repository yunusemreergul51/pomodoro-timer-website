import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, ChevronDown, CheckCircle, HelpCircle } from 'lucide-react';

export const GuideSection: React.FC = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const steps = [
    { title: t('guide.step1Title'), desc: t('guide.step1Desc') },
    { title: t('guide.step2Title'), desc: t('guide.step2Desc') },
    { title: t('guide.step3Title'), desc: t('guide.step3Desc') },
    { title: t('guide.step4Title'), desc: t('guide.step4Desc') },
  ];

  const faqs = [
    { q: t('guide.faq1Q'), a: t('guide.faq1A') },
    { q: t('guide.faq2Q'), a: t('guide.faq2A') },
    { q: t('guide.faq3Q'), a: t('guide.faq3A') },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto mt-14 px-4 pb-12">
      {/* Intro Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 mb-3 border border-rose-200 dark:border-rose-900/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('guide.badge')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
          {t('guide.heading')}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
          {t('guide.intro')}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
                {step.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <div className="mt-12 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800/80 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="w-5 h-5 text-rose-500" />
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
            {t('guide.faqHeading')}
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-stone-200/70 dark:border-stone-800/70 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 bg-stone-50/50 dark:bg-stone-800/30 hover:bg-stone-100/50 dark:hover:bg-stone-800/60 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base text-stone-800 dark:text-stone-200">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-200/40 dark:border-stone-800/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
