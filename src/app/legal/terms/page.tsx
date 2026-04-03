'use client';

import { useI18n } from '@/i18n/context';

export default function TermsPage() {
  const { t } = useI18n();

  return (
    <div className="section-padding py-14 sm:py-20 lg:py-24">
      <div className="container-narrow mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-volo-text tracking-tight mb-8">
          {t('legal.termsTitle')}
        </h1>
        <div className="max-w-none space-y-6 text-volo-text/90 leading-relaxed">
          <p>{t('legal.lorem1')}</p>
          <p>{t('legal.lorem2')}</p>
          <p>{t('legal.lorem3')}</p>
        </div>
        <p className="mt-12 text-sm text-volo-muted border-t border-volo-border pt-8 leading-relaxed">
          {t('legal.demoNote')}
        </p>
      </div>
    </div>
  );
}
