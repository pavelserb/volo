'use client';

import { Star } from 'lucide-react';
import { useI18n } from '@/i18n/context';

interface ReviewCardProps {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export function ReviewCard({ author, rating, text, date }: ReviewCardProps) {
  const { formatDate } = useI18n();
  const initials = author
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const formattedDate = formatDate(date, {
    year: 'numeric',
    month: 'long',
  });

  return (
    <article className="card p-5">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-volo-accent-light flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-volo-accent">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm text-volo-text">{author}</span>
            <span className="text-xs text-volo-muted">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-0.5 mt-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < rating
                    ? 'text-volo-accent fill-volo-accent'
                    : 'text-volo-border'
                }
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-volo-text leading-relaxed">{text}</p>
    </article>
  );
}
