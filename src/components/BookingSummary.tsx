'use client';

import Image from 'next/image';
import { Clock, Users, Calendar, MapPin } from 'lucide-react';
import { useI18n } from '@/i18n/context';

interface BookingSummaryProps {
  image: string;
  skuName: string;
  city: string;
  date?: string;
  time?: string;
  guests?: number;
  guestUnit?: string;
  durationMinutes: number;
  basePrice: number;
  addonsTotal?: number;
  totalPrice: number;
  /** Kept for callers; summary shows PLN totals */
  priceLabel?: string;
  isBuyout?: boolean;
}

export function BookingSummary({
  image,
  skuName,
  city,
  date,
  time,
  guests,
  guestUnit,
  durationMinutes,
  basePrice,
  addonsTotal = 0,
  totalPrice,
  isBuyout,
}: BookingSummaryProps) {
  const { formatNumber, t } = useI18n();

  const guestLine =
    guests != null && guestUnit
      ? isBuyout
        ? t('booking.privateGuests', { guests: String(guests), guestUnit })
        : `${guests} ${guestUnit}`
      : null;

  return (
    <div className="card-elevated overflow-hidden min-w-0">
      <div className="relative h-40 sm:h-48 w-full">
        <Image
          src={image}
          alt={skuName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <div className="p-4 sm:p-5 space-y-4 min-w-0">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-heading font-semibold text-volo-text line-clamp-2">{skuName}</h3>
          <div className="flex items-center gap-1 mt-1 text-caption">
            <MapPin size={14} />
            <span>{city}</span>
          </div>
        </div>

        <div className="space-y-2.5 text-sm">
          {date && (
            <div className="flex items-center gap-2 text-volo-text">
              <Calendar size={16} className="text-volo-muted" />
              <span>
                {date}
                {time ? `, ${time}` : ''}
              </span>
            </div>
          )}
          {guestLine && (
            <div className="flex items-center gap-2 text-volo-text">
              <Users size={16} className="text-volo-muted" />
              <span>{guestLine}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-volo-text">
            <Clock size={16} className="text-volo-muted" />
            <span>
              {durationMinutes} {t('common.min')}
            </span>
          </div>
        </div>

        <div className="border-t border-volo-border pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-volo-muted">{t('booking.summaryService')}</span>
            <span className="text-volo-text">{formatNumber(basePrice)} PLN</span>
          </div>
          {addonsTotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-volo-muted">{t('booking.summaryAddons')}</span>
              <span className="text-volo-text">+{formatNumber(addonsTotal)} PLN</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-dashed border-volo-border">
            <span className="font-semibold text-volo-text">{t('booking.summaryTotal')}</span>
            <div className="text-right">
              <span className="text-price-lg">{formatNumber(totalPrice)}</span>
              <span className="text-price-unit">PLN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
