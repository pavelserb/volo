interface PriceDisplayProps {
  amount: number;
  unit: string;
  size?: 'lg' | 'sm';
  buyoutAmount?: number;
  buyoutUnit?: string;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('pl-PL').format(amount);

export function PriceDisplay({
  amount,
  unit,
  size = 'lg',
  buyoutAmount,
  buyoutUnit,
}: PriceDisplayProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-baseline">
        <span className={size === 'lg' ? 'text-price-lg' : 'text-price-sm'}>
          {formatPrice(amount)}
        </span>
        <span className="text-price-unit">{unit}</span>
      </div>
      {buyoutAmount && buyoutUnit && (
        <div className="flex items-baseline mt-1">
          <span className="text-sm text-volo-muted">
            lub {formatPrice(buyoutAmount)}
          </span>
          <span className="text-price-unit">{buyoutUnit}</span>
        </div>
      )}
    </div>
  );
}
