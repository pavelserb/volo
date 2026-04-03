import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star } from 'lucide-react';

interface SkuCardProps {
  slug: string;
  name: string;
  image: string;
  price: number;
  priceLabel: string;
  durationMinutes: number;
  capacityTotal: number;
  capacityUnit: string;
  averageRating: number;
  reviewCount: number;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('pl-PL').format(amount);

export function SkuCard({
  slug,
  name,
  image,
  price,
  priceLabel,
  durationMinutes,
  capacityTotal,
  capacityUnit,
  averageRating,
  reviewCount,
}: SkuCardProps) {
  return (
    <Link href={`/s/${slug}`} className="group block">
      <article className="card-elevated overflow-hidden">
        <div className="relative h-56 overflow-hidden">
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

        <div className="p-5">
          <h3 className="text-lg font-heading font-semibold text-volo-text group-hover:text-volo-accent transition-colors duration-200">
            {name}
          </h3>

          <div className="flex items-center gap-4 mt-3 text-sm text-volo-muted">
            <span className="flex items-center gap-1">
              <Clock size={15} /> {durationMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <Users size={15} /> do {capacityTotal} {capacityUnit}
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-volo-border flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-price-sm">{formatPrice(price)}</span>
              <span className="text-price-unit">{priceLabel}</span>
            </div>
            <span className="text-sm font-medium text-volo-accent group-hover:underline">
              Sprawdź →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
