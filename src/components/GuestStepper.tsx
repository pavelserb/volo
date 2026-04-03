'use client';

import { Minus, Plus, Crown } from 'lucide-react';
import { useI18n } from '@/i18n/context';

interface GuestStepperProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  onChange: (value: number) => void;
  buyoutAvailable?: boolean;
  buyoutPrice?: number;
  isBuyout?: boolean;
  onBuyoutChange?: (v: boolean) => void;
}

export function GuestStepper({
  value,
  min,
  max,
  unit,
  onChange,
  buyoutAvailable,
  buyoutPrice,
  isBuyout,
  onBuyoutChange,
}: GuestStepperProps) {
  const { formatNumber, t } = useI18n();

  const caption = isBuyout
    ? t('components.guestPrivate', { max: String(max), unit })
    : t('components.guestCountLine', {
        value: String(value),
        unit,
        max: String(max),
      });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-volo-text">{t('components.guestCount')}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onChange(Math.max(min, value - 1))}
            disabled={value <= min || isBuyout}
            className="w-9 h-9 rounded-full border border-volo-border flex items-center justify-center
              text-volo-text transition-all duration-200
              hover:border-volo-accent hover:text-volo-accent
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-volo-border disabled:hover:text-volo-text
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volo-accent"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-lg font-heading font-bold text-volo-text tabular-nums">
            {isBuyout ? max : value}
          </span>
          <button
            onClick={() => onChange(Math.min(max, value + 1))}
            disabled={value >= max || isBuyout}
            className="w-9 h-9 rounded-full border border-volo-border flex items-center justify-center
              text-volo-text transition-all duration-200
              hover:border-volo-accent hover:text-volo-accent
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-volo-border disabled:hover:text-volo-text
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volo-accent"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <p className="text-caption">{caption}</p>

      {buyoutAvailable && buyoutPrice && onBuyoutChange && (
        <button
          onClick={() => onBuyoutChange(!isBuyout)}
          className={`
            w-full card-prominent p-4 text-left flex items-start gap-3
            transition-all duration-200 cursor-pointer
            ${isBuyout ? 'ring-2 ring-volo-accent' : 'hover:shadow-volo-md'}
          `}
        >
          <Crown size={20} className="text-volo-accent flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-volo-text">{t('components.privateFlight')}</span>
              <span className="text-sm font-bold text-volo-accent">{formatNumber(buyoutPrice)} PLN</span>
            </div>
            <p className="text-xs text-volo-muted mt-1">
              {t('components.privateSub', { max: String(max) })}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
