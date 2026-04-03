import { Shield, RotateCcw, Clock } from 'lucide-react';

interface TrustItem {
  icon: React.ReactNode;
  text: string;
}

interface TrustBarProps {
  items?: TrustItem[];
  variant?: 'horizontal' | 'vertical';
}

const defaultItems: TrustItem[] = [
  { icon: <Shield size={16} />, text: 'Bezpieczna płatność' },
  { icon: <RotateCcw size={16} />, text: 'Bezpłatna anulacja' },
  { icon: <Clock size={16} />, text: 'Natychmiastowe potwierdzenie' },
];

export function TrustBar({ items = defaultItems, variant = 'horizontal' }: TrustBarProps) {
  if (variant === 'vertical') {
    return (
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-volo-muted">
            <span className="text-volo-success flex-shrink-0">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5 text-sm text-volo-muted">
          <span className="text-volo-success flex-shrink-0">{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
