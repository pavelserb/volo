'use client';

import { Minus, Plus, Crown } from 'lucide-react';

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

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('pl-PL').format(amount);

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
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-volo-text">Liczba gości</span>
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

      <p className="text-caption">
        {isBuyout
          ? `Prywatny — do ${max} ${unit}`
          : `${value} ${unit} (max. ${max})`}
      </p>

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
              <span className="text-sm font-semibold text-volo-text">Prywatny lot</span>
              <span className="text-sm font-bold text-volo-accent">{formatPrice(buyoutPrice)} PLN</span>
            </div>
            <p className="text-xs text-volo-muted mt-1">
              Całość dla siebie — bez obcych pasażerów, do {max} osób
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
