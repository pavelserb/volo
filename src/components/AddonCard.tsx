'use client';

import { Check, Plus } from 'lucide-react';

interface AddonCardProps {
  name: string;
  description: string;
  price: number;
  selected: boolean;
  onToggle: () => void;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('pl-PL').format(amount);

export function AddonCard({ name, description, price, selected, onToggle }: AddonCardProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        w-full text-left p-4 rounded-xl border-2 transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volo-accent focus-visible:ring-offset-2
        ${selected
          ? 'border-volo-accent bg-volo-accent-light'
          : 'border-volo-border bg-volo-surface hover:border-volo-accent/40'
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-volo-text">{name}</div>
          <p className="text-sm text-volo-muted mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-bold text-volo-text">
            {price === 0 ? 'Gratis' : `+${formatPrice(price)} PLN`}
          </span>
          <div
            className={`
              w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200
              ${selected
                ? 'bg-volo-accent text-white'
                : 'border-2 border-volo-border'
              }
            `}
          >
            {selected ? <Check size={14} /> : <Plus size={14} className="text-volo-muted" />}
          </div>
        </div>
      </div>
    </button>
  );
}
