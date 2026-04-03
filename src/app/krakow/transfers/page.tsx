'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Hero } from '@/components/Hero';
import { SectionHeading } from '@/components/SectionHeading';
import { SkuCard } from '@/components/SkuCard';
import { ReviewCard } from '@/components/ReviewCard';
import { skus } from '@/data/mock';
import { localizeSku } from '@/data/sku-locale';
import { useI18n } from '@/i18n/context';

const transferSkus = skus.filter((s) => s.directionSlug === 'transfers');

const STEP_KEYS = [
  { step: '01', titleKey: 'steps.tr1Title' as const, textKey: 'steps.tr1Text' as const },
  { step: '02', titleKey: 'steps.tr2Title' as const, textKey: 'steps.tr2Text' as const },
  { step: '03', titleKey: 'steps.tr3Title' as const, textKey: 'steps.tr3Text' as const },
];

export default function KrakowTransfersPage() {
  const { locale, t } = useI18n();
  const primaryTransfer = transferSkus[0];
  const transferSkuLoc = useMemo(
    () => (primaryTransfer ? localizeSku(primaryTransfer, locale) : null),
    [locale],
  );
  const reviews = transferSkuLoc?.reviews ?? [];

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&h=900&fit=crop"
        alt={t('landing.transferHeroAlt')}
        overlay="left"
      >
        <div className="max-w-2xl min-w-0">
          <p className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-volo-accent">
            {t('landing.transferBadge')}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-tight">
            {t('landing.transferTitle')}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/85 md:text-xl max-w-xl">
            {t('landing.transferSub')}
          </p>
          <div className="mt-6 sm:mt-8">
            <Link
              href={transferSkuLoc ? `/s/${transferSkuLoc.slug}` : '/s/vip-transfer-lotnisko'}
              className="btn-primary text-base px-6 sm:px-8 py-3.5 w-full sm:w-auto justify-center"
            >
              {t('landing.transferCta')}
            </Link>
          </div>
        </div>
      </Hero>

      <div className="border-b border-volo-border bg-volo-surface/80 backdrop-blur-sm">
        <div className="container-wide section-padding mx-auto py-4">
          <p className="text-center text-xs sm:text-sm font-medium text-volo-muted md:text-base px-1 leading-snug">
            {t('landing.transferStrip')}
          </p>
        </div>
      </div>

      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-bg">
        <div className="container-wide mx-auto lg:max-w-3xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {transferSkus.map((sku) => {
              const l = localizeSku(sku, locale);
              return (
                <SkuCard
                  key={sku.id}
                  slug={l.slug}
                  name={l.name}
                  image={l.image}
                  price={l.price}
                  priceLabel={l.priceLabel}
                  durationMinutes={l.durationMinutes}
                  capacityTotal={l.capacityTotal}
                  capacityUnit={l.capacityUnit}
                  capacityLabel={`${t('common.upTo')} 4 ${t('common.passengers')}`}
                  averageRating={l.averageRating}
                  reviewCount={l.reviews.length}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-surface border-y border-volo-border">
        <div className="container-narrow mx-auto max-w-2xl">
          <SectionHeading
            title={t('landing.howTitle')}
            subtitle={t('landing.transferHowSub')}
            align="center"
          />
          <div className="mt-10 sm:mt-12 relative">
            <div className="absolute left-[1.375rem] sm:left-6 top-0 bottom-0 w-px bg-volo-border" />
            <div className="space-y-8 sm:space-y-10">
              {STEP_KEYS.map(({ step, titleKey, textKey }) => (
                <div key={step} className="flex gap-4 sm:gap-6 min-w-0">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-volo-accent flex items-center justify-center text-white font-heading font-bold text-xs sm:text-sm shadow-volo-md ring-4 ring-volo-accent-light">
                      {step}
                    </div>
                  </div>
                  <div className="pt-1 sm:pt-2.5 min-w-0">
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-volo-text break-words">
                      {t(titleKey)}
                    </h3>
                    <p className="mt-1 text-sm text-volo-muted leading-relaxed break-words">{t(textKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-bg">
        <div className="container-wide mx-auto">
          <SectionHeading
            title={t('landing.reviewsTransfer')}
            subtitle={t('landing.reviewsTransferSub')}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                author={review.author}
                rating={review.rating}
                text={review.text}
                date={review.date}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
