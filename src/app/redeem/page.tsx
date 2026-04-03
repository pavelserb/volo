'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Gift, Sparkles } from 'lucide-react';
import { getSkuById } from '@/data/mock';
import { localizeSku } from '@/data/sku-locale';
import { useI18n } from '@/i18n/context';

export default function RedeemPage() {
  const { locale, t } = useI18n();
  const successSku = useMemo(() => {
    const raw = getSkuById('heli-scenic-20');
    return raw ? localizeSku(raw, locale) : null;
  }, [locale]);

  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const trimmed = code.trim();
  const isInvalid = submitted && trimmed === 'invalid';
  const isSuccess = submitted && trimmed.length > 0 && !isInvalid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="section-padding py-14 sm:py-20 lg:py-24">
      <div className="container-narrow mx-auto max-w-lg">
        <div className="text-center mb-10">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-volo-accent-light text-volo-accent">
            <Gift size={28} strokeWidth={2} />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-volo-text tracking-tight">
            {t('redeem.title')}
          </h1>
          <p className="mt-3 text-volo-muted leading-relaxed">{t('redeem.sub')}</p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium text-volo-text">
              {t('redeem.codeLabel')}
            </label>
            <input
              id="code"
              className={`input font-mono text-base tracking-wide uppercase ${
                isInvalid ? 'border-volo-error ring-2 ring-volo-error/20' : ''
              }`}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setSubmitted(false);
              }}
              placeholder={t('redeem.codePlaceholder')}
              autoComplete="off"
              spellCheck={false}
            />
            {isInvalid && (
              <p className="text-sm text-volo-error flex items-center gap-1.5" role="alert">
                {t('redeem.invalid')}
              </p>
            )}
          </div>
          <button type="submit" className="btn-primary w-full">
            {t('redeem.submit')}
          </button>
        </form>

        {isSuccess && (
          <div className="mt-8 card p-6 sm:p-8 border-volo-accent/30 bg-gradient-to-br from-volo-surface to-volo-accent-light/40">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-volo-accent text-white">
                <CheckCircle2 size={26} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-volo-accent mb-1 flex items-center gap-1">
                  <Sparkles size={12} />
                  {t('redeem.success')}
                </p>
                <h2 className="font-heading text-xl font-bold text-volo-text">
                  {successSku?.name ?? t('common.scenicFlight')}
                </h2>
                <p className="text-sm text-volo-muted mt-2 leading-relaxed">{t('redeem.activatedFor')}</p>
                <Link
                  href="/book/heli-scenic-20"
                  className="btn-primary mt-6 inline-flex w-full sm:w-auto text-center justify-center"
                >
                  {t('redeem.bookSlot')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
