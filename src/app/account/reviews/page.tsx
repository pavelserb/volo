'use client';

import { MessageSquareQuote } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export default function AccountReviewsPage() {
  const { t } = useI18n();

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-heading text-3xl font-bold text-volo-text tracking-tight">{t('account.reviewsTitle')}</h1>
        <p className="text-volo-muted mt-2 max-w-xl leading-relaxed">{t('account.reviewsSub')}</p>
      </header>

      <div className="card border-volo-border overflow-hidden">
        <div className="grid sm:grid-cols-[1fr_200px] gap-0">
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <p className="text-volo-text text-lg leading-relaxed font-medium">{t('account.reviewsEmpty')}</p>
            <p className="text-volo-muted text-sm mt-4 leading-relaxed max-w-md">{t('account.reviewsEmptySub')}</p>
          </div>
          <div
            className="relative min-h-[180px] sm:min-h-0 bg-gradient-to-br from-volo-accent-light via-volo-bg to-volo-surface border-t sm:border-t-0 sm:border-l border-volo-border flex items-center justify-center p-8"
            aria-hidden
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-volo-accent/10 blur-2xl scale-150" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-volo-border bg-volo-surface shadow-md text-volo-accent">
                <MessageSquareQuote size={44} strokeWidth={1.25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
