'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  Star,
  StarHalf,
  Check,
  Clock,
  Users,
  Gift,
  ChevronRight,
} from 'lucide-react';
import { ReviewCard } from '@/components/ReviewCard';
import { TrustBar } from '@/components/TrustBar';
import { PriceDisplay } from '@/components/PriceDisplay';
import { getSkuBySlug, type SKU } from '@/data/mock';
import { localizeSku } from '@/data/sku-locale';
import { useI18n } from '@/i18n/context';

function StarRatingDisplay({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const roundUp = rating - full >= 0.75;
  const displayFull = roundUp ? full + 1 : full;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < displayFull && !(hasHalf && i === full)) {
          return <Star key={i} size={18} className="fill-volo-accent text-volo-accent" />;
        }
        if (hasHalf && i === full) {
          return <StarHalf key={i} size={18} className="fill-volo-accent text-volo-accent" />;
        }
        return <Star key={i} size={18} className="text-volo-border" />;
      })}
    </div>
  );
}

function capacityLabelFor(sku: SKU, t: (k: string, v?: Record<string, string>) => string): string {
  if (sku.capacityModel === 'exclusive') {
    const isRide =
      sku.capacityUnit === 'przejazd' ||
      sku.capacityUnit === 'ride' ||
      sku.directionSlug === 'transfers';
    return isRide ? t('sku.capacityExclusiveRide') : t('sku.capacityExclusiveFlight');
  }
  if (sku.capacityModel === 'shared' || sku.capacityModel === 'shared_buyout') {
    const unit = sku.capacityUnit?.toLowerCase();
    if (unit === 'miejsce' || unit === 'seat' || unit === 'seats') {
      return t('sku.capacityShared', { total: String(sku.capacityTotal) });
    }
  }
  return t('sku.capacitySeats', { total: String(sku.capacityTotal) });
}

export default function SkuDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const { locale, t, formatNumber, formatDecimal } = useI18n();
  const rawSku = useMemo(() => getSkuBySlug(slug), [slug]);
  const sku = useMemo(
    () => (rawSku ? localizeSku(rawSku, locale) : null),
    [rawSku, locale],
  );

  const galleryImages = useMemo(() => {
    if (!sku) return [];
    return sku.gallery.length > 0 ? sku.gallery : [sku.image];
  }, [sku]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!sku) {
    return (
      <div className="section-padding container-narrow py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-volo-text mb-3">{t('sku.notFound')}</h1>
        <p className="text-volo-muted mb-8 max-w-md mx-auto">{t('sku.notFoundBody')}</p>
        <Link href="/" className="btn-primary">
          {t('sku.home')}
        </Link>
      </div>
    );
  }

  const mainSrc = galleryImages[activeIndex] ?? sku.image;
  const reviewCount = sku.reviews.length;
  const capLabel = capacityLabelFor(sku, t);
  const buyoutUnit = sku.buyoutPrice ? t('sku.buyoutUnitPrivate') : undefined;

  const trustItems = [
    {
      icon: <Check size={16} />,
      text: sku.confirmationModel === 'instant' ? t('sku.confirmInstant') : t('sku.confirmWithin'),
    },
    { icon: <Check size={16} />, text: t('sku.paySecure') },
    { icon: <Check size={16} />, text: t('sku.cancelHint') },
  ];

  return (
    <div className="pb-[5.5rem] sm:pb-24 lg:pb-0 min-w-0">
      <section className="w-full bg-volo-surface border-b border-volo-border">
        <div className="lg:section-padding lg:container-wide lg:pt-8 lg:pb-2">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/9] lg:rounded-2xl lg:overflow-hidden lg:border border-volo-border shadow-volo-sm bg-volo-bg">
            <Image
              src={mainSrc}
              alt={sku.name}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none lg:rounded-2xl" />
          </div>
        </div>
        <div className="section-padding container-wide py-3 lg:pb-8">
          <div className="flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory">
            {galleryImages.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 snap-start ${
                  i === activeIndex
                    ? 'border-volo-accent ring-2 ring-volo-accent/30 scale-[1.02]'
                    : 'border-volo-border opacity-80 hover:opacity-100 hover:border-volo-muted'
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="96px" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding container-wide py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] gap-8 sm:gap-10 lg:gap-14 items-start">
          <article className="min-w-0 space-y-6 sm:space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center rounded-full bg-volo-accent-light px-3 py-1 font-medium text-volo-accent">
                  {sku.direction}
                </span>
                <span className="inline-flex items-center gap-1 text-volo-muted">
                  <ChevronRight size={14} className="opacity-60" />
                  {sku.city}
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-volo-text leading-tight tracking-tight break-words">
                {sku.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <StarRatingDisplay rating={sku.averageRating} />
                  <span className="text-sm font-semibold text-volo-text tabular-nums">
                    {formatDecimal(sku.averageRating)}
                  </span>
                  <span className="text-sm text-volo-muted">
                    ({t('sku.reviewWord', { count: String(reviewCount) })})
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-volo-border bg-volo-bg px-3 py-1.5 text-sm text-volo-text">
                  <Clock size={16} className="text-volo-accent" /> {sku.durationMinutes}{' '}
                  {t('common.min')}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-volo-border bg-volo-bg px-3 py-1.5 text-sm text-volo-text">
                  <Users size={16} className="text-volo-accent" /> {capLabel}
                </span>
              </div>

              <div className="card-elevated p-5 sm:p-6 lg:hidden">
                <PriceDisplay
                  amount={sku.price}
                  unit={sku.priceLabel}
                  size="lg"
                  buyoutAmount={sku.buyoutPrice}
                  buyoutUnit={buyoutUnit}
                />
              </div>
            </header>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-semibold text-volo-text">{t('sku.about')}</h2>
              <p className="text-volo-text/90 leading-relaxed whitespace-pre-line">{sku.longDescription}</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-heading text-xl font-semibold text-volo-text">{t('sku.includes')}</h2>
              <ul className="space-y-3">
                {sku.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-volo-text">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-volo-accent-light text-volo-accent">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-heading text-xl font-semibold text-volo-text">{t('sku.cancellation')}</h2>
              <div className="card p-5">
                <p className="text-sm sm:text-base text-volo-text/90 leading-relaxed">{sku.cancellationPolicy}</p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-xl font-semibold text-volo-text">{t('sku.guestReviews')}</h2>
                {reviewCount > 0 && (
                  <span className="text-sm text-volo-muted tabular-nums">
                    {t('sku.avgShort', { value: formatDecimal(sku.averageRating) })}
                  </span>
                )}
              </div>
              {reviewCount === 0 ? (
                <p className="text-volo-muted text-sm">{t('sku.noReviews')}</p>
              ) : (
                <div className="grid gap-4">
                  {sku.reviews.map((r) => (
                    <ReviewCard key={r.id} author={r.author} rating={r.rating} text={r.text} date={r.date} />
                  ))}
                </div>
              )}
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="card-elevated p-6 space-y-5 sticky top-24">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-volo-muted mb-1">
                  {t('sku.priceFrom')}
                </p>
                <PriceDisplay
                  amount={sku.price}
                  unit={sku.priceLabel}
                  size="lg"
                  buyoutAmount={sku.buyoutPrice}
                  buyoutUnit={buyoutUnit}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Link href={`/book/${sku.id}`} className="btn-primary w-full text-center">
                  {t('sku.book')}
                </Link>
                <Link href={`/gift/${sku.id}`} className="btn-secondary w-full text-center gap-2">
                  <Gift size={18} strokeWidth={2} /> {t('sku.gift')}
                </Link>
              </div>

              <TrustBar variant="vertical" items={trustItems} />
            </div>
          </aside>
        </div>
      </div>

      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-volo-border bg-volo-surface/95 backdrop-blur-md shadow-volo-xl safe-bottom-pad"
      >
        <div className="section-padding flex items-center gap-3 py-3 min-w-0">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-volo-muted">{t('sku.mobileFrom')}</p>
            <div className="flex flex-wrap items-baseline gap-x-1">
              <span className="text-lg font-heading font-bold text-volo-text tabular-nums">
                {formatNumber(sku.price)}
              </span>
              <span className="text-price-unit">{sku.priceLabel}</span>
            </div>
          </div>
          <Link href={`/book/${sku.id}`} className="btn-primary shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base">
            {t('sku.book')}
          </Link>
        </div>
      </div>
    </div>
  );
}
