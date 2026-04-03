'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star } from 'lucide-react';
import { useI18n } from '@/i18n/context';

interface SkuCardProps {
  slug: string;
  name: string;
  image: string;
  price: number;
  priceLabel: string;
  durationMinutes: number;
  capacityTotal: number;
  /** Legacy: used when capacityLabel is omitted */
  capacityUnit: string;
  /** Full capacity line, e.g. "up to 3 ppl" — preferred for i18n */
  capacityLabel?: string;
  averageRating: number;
  reviewCount: number;
}

export function SkuCard({
  slug,
  name,
  image,
  price,
  priceLabel,
  durationMinutes,
  capacityTotal,
  capacityUnit,
  capacityLabel,
  averageRating,
  reviewCount,
}: SkuCardProps) {
  const { t, formatNumber } = useI18n();
  const cap =
    capacityLabel ??
    `${t('common.upTo')} ${capacityTotal} ${capacityUnit}`;

  return (
    <Link href={`/s/${slug}`} className="group block">
      <article className="card-elevated overflow-hidden">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover motion-safe:group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1">
            <Star size={14} className="text-volo-accent fill-volo-accent" />
            <span className="text-white text-sm font-semibold">{averageRating}</span>
            <span className="text-white/70 text-xs">({reviewCount})</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 min-w-0">
          <h3 className="text-base sm:text-lg font-heading font-semibold text-volo-text group-hover:text-volo-accent transition-colors duration-200 line-clamp-2">
            {name}
          </h3>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1 mt-3 text-sm text-volo-muted">
            <span className="flex items-center gap-1 min-w-0">
              <Clock size={15} className="shrink-0" /> {durationMinutes} {t('common.min')}
            </span>
            <span className="flex items-center gap-1 min-w-0 line-clamp-2">
              <Users size={15} className="shrink-0 mt-0.5 sm:mt-0" /> {cap}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-volo-border flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-1 min-w-0">
              <span className="text-price-sm">{formatNumber(price)}</span>
              <span className="text-price-unit">{priceLabel}</span>
            </div>
            <span className="text-sm font-medium text-volo-accent group-hover:underline shrink-0">
              {t('common.check')} →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
