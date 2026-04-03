'use client';

import { useMemo } from 'react';
import { Shield, RotateCcw, Clock } from 'lucide-react';
import { useI18n } from '@/i18n/context';

interface TrustItem {
  icon: React.ReactNode;
  text: string;
}

interface TrustBarProps {
  items?: TrustItem[];
  variant?: 'horizontal' | 'vertical';
}

export function TrustBar({ items: itemsProp, variant = 'horizontal' }: TrustBarProps) {
  const { t } = useI18n();

  const defaultItems = useMemo<TrustItem[]>(
    () => [
      { icon: <Shield size={16} />, text: t('booking.trustPay') },
      { icon: <RotateCcw size={16} />, text: t('components.trustFreeCancel') },
      { icon: <Clock size={16} />, text: t('components.trustInstant') },
    ],
    [t],
  );

  const items = itemsProp ?? defaultItems;

  if (variant === 'vertical') {
    return (
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-volo-muted">
            <span className="text-volo-success flex-shrink-0">{item.icon}</span>
            <span className="min-w-0 break-words leading-snug">{item.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-1.5 text-xs sm:text-sm text-volo-muted max-w-full">
          <span className="text-volo-success flex-shrink-0">{item.icon}</span>
          <span className="min-w-0 break-words leading-snug">{item.text}</span>
        </div>
      ))}
    </div>
  );
}
