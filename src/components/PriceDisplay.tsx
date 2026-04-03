'use client';

import { useI18n } from '@/i18n/context';

interface PriceDisplayProps {
  amount: number;
  unit: string;
  size?: 'lg' | 'sm';
  buyoutAmount?: number;
  buyoutUnit?: string;
}

export function PriceDisplay({
  amount,
  unit,
  size = 'lg',
  buyoutAmount,
  buyoutUnit,
}: PriceDisplayProps) {
  const { formatNumber, t } = useI18n();

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline">
        <span className={size === 'lg' ? 'text-price-lg' : 'text-price-sm'}>
          {formatNumber(amount)}
        </span>
        <span className="text-price-unit">{unit}</span>
      </div>
      {buyoutAmount && buyoutUnit && (
        <div className="flex items-baseline mt-1">
          <span className="text-sm text-volo-muted">
            {t('sku.priceOr')} {formatNumber(buyoutAmount)}
          </span>
          <span className="text-price-unit">{buyoutUnit}</span>
        </div>
      )}
    </div>
  );
}
