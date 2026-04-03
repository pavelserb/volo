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

const helicopterSkus = skus.filter((s) => s.directionSlug === 'helicopters');

const STEP_KEYS = [
  { step: '01', titleKey: 'steps.heli1Title' as const, textKey: 'steps.heli1Text' as const },
  { step: '02', titleKey: 'steps.heli2Title' as const, textKey: 'steps.heli2Text' as const },
  { step: '03', titleKey: 'steps.heli3Title' as const, textKey: 'steps.heli3Text' as const },
];

const FAQ_KEYS = [
  { q: 'faq.q1' as const, a: 'faq.a1' as const },
  { q: 'faq.q2' as const, a: 'faq.a2' as const },
  { q: 'faq.q3' as const, a: 'faq.a3' as const },
  { q: 'faq.q4' as const, a: 'faq.a4' as const },
];

export default function KrakowHelicoptersPage() {
  const { locale, t } = useI18n();
  const primaryHeli = helicopterSkus[0];
  const heliSkuLoc = useMemo(
    () => (primaryHeli ? localizeSku(primaryHeli, locale) : null),
    [locale],
  );
  const reviews = heliSkuLoc?.reviews ?? [];

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1600&h=900&fit=crop"
        alt={t('landing.heliHeroAlt')}
        overlay="left"
      >
        <div className="max-w-2xl min-w-0">
          <p className="mb-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-volo-accent">
            {t('landing.heliBadge')}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-tight">
            {t('landing.heliTitle')}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/85 md:text-xl max-w-xl">
            {t('landing.heliSub')}
          </p>
          <div className="mt-6 sm:mt-8">
            <Link
              href={heliSkuLoc ? `/s/${heliSkuLoc.slug}` : '/s/lot-widokowy-nad-krakowem'}
              className="btn-primary text-base px-6 sm:px-8 py-3.5 w-full sm:w-auto justify-center"
            >
              {t('landing.heliCta')}
            </Link>
          </div>
        </div>
      </Hero>

      <div className="border-b border-volo-border bg-volo-surface/80 backdrop-blur-sm">
        <div className="container-wide section-padding mx-auto py-4">
          <p className="text-center text-xs sm:text-sm font-medium text-volo-muted md:text-base px-1 leading-snug">
            {t('landing.heliStrip')}
          </p>
        </div>
      </div>

      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-bg">
        <div className="container-wide mx-auto lg:max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {helicopterSkus.map((sku) => {
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
                  capacityLabel={`${t('common.upTo')} ${l.capacityTotal} ${t('common.people')}`}
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
            subtitle={t('landing.heliHowSub')}
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
          <SectionHeading title={t('landing.reviewsHeli')} subtitle={t('landing.reviewsHeliSub')} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-surface border-t border-volo-border">
        <div className="container-narrow mx-auto max-w-2xl">
          <SectionHeading
            title={t('landing.faqTitle')}
            subtitle={t('landing.faqSub')}
            align="center"
          />
          <div className="mt-10 flex flex-col gap-4">
            {FAQ_KEYS.map(({ q, a }) => (
              <details
                key={q}
                className="card group overflow-hidden motion-safe:open:shadow-volo-md transition-shadow"
              >
                <summary className="cursor-pointer list-none px-5 py-4 sm:px-6 sm:py-5 font-heading font-semibold text-volo-text flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-left">{t(q)}</span>
                  <span className="shrink-0 text-volo-accent text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 -mt-1">
                  <p className="text-sm sm:text-base leading-relaxed text-volo-muted border-t border-volo-border pt-4">
                    {t(a)}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
