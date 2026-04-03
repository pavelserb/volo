'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Gift, Star, ArrowRight, Shield, Clock, Users, ChevronRight } from 'lucide-react';
import { skus } from '@/data/mock';

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('pl-PL').format(amount);

export default function HomePage() {
  const heliSku = skus.find((s) => s.directionSlug === 'helicopters')!;
  const transferSku = skus.find((s) => s.directionSlug === 'transfers')!;
  const featuredReview = heliSku.reviews[0];

  return (
    <>
      {/* ─── CINEMATIC HERO ─── */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1524508268646-56d1359f5167?w=1920&h=1080&fit=crop"
          alt="Lot helikopterem — widok z pokładu"
          fill
          className="object-cover motion-safe:animate-[kenburns_20s_ease-in-out_infinite_alternate]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="relative z-10 section-padding container-wide w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-volo-accent animate-pulse" />
              <span className="text-xs font-medium uppercase tracking-widest text-white/90">
                Kraków · Doświadczenia premium
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight text-white leading-[0.95]">
              Poczuj
              <br />
              <span className="text-volo-accent">wysokość</span>
            </h1>

            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-white/75 max-w-xl">
              Loty helikopterem nad Krakowem, transfery VIP
              i przeżycia, które zostają na zawsze. Jeden serwis,
              zero kompromisów.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/krakow/helicopters" className="btn-primary text-base px-8 py-4 text-lg">
                Odkryj loty
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/krakow/transfers"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-base px-4 py-4 transition-colors duration-200"
              >
                Transfery VIP
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-volo-accent" />
                Licencjonowani operatorzy
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-volo-accent" />
                Bezpłatna anulacja do 48h
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-volo-accent fill-volo-accent" />
                Ocena 4.7 / 5
              </span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 motion-safe:animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-white/50" />
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF STRIP ─── */}
      <section className="bg-volo-text">
        <div className="container-wide section-padding mx-auto py-8 sm:py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '4.7', label: 'Średnia ocena', suffix: '/ 5' },
              { value: '500+', label: 'Zrealizowanych lotów', suffix: '' },
              { value: '100%', label: 'Ubezpieczonych przeżyć', suffix: '' },
              { value: '48h', label: 'Bezpłatna anulacja', suffix: '' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-heading font-bold text-white tabular-nums">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-lg text-white/40 ml-1">{stat.suffix}</span>
                  )}
                </div>
                <p className="mt-1 text-xs sm:text-sm text-white/40 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE SHOWCASE: HELICOPTER ─── */}
      <section className="bg-volo-bg">
        <div className="container-wide section-padding mx-auto py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
            {/* Image */}
            <div className="relative lg:-mr-8 z-10">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-volo-xl">
                <Image
                  src={heliSku.image}
                  alt={heliSku.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Star size={14} className="text-volo-accent fill-volo-accent" />
                  <span className="text-white text-sm font-bold">{heliSku.averageRating}</span>
                  <span className="text-white/60 text-xs">({heliSku.reviews.length} opinii)</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:bg-volo-surface lg:rounded-2xl lg:p-10 xl:p-14 lg:shadow-volo-lg lg:ml-0 lg:-ml-4 relative">
              <span className="text-xs font-semibold uppercase tracking-widest text-volo-accent mb-3 block">
                Flagowe doświadczenie
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-volo-text leading-tight">
                {heliSku.name}
              </h2>
              <p className="mt-4 text-volo-muted leading-relaxed">
                {heliSku.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-volo-bg px-3.5 py-1.5 text-sm text-volo-text border border-volo-border">
                  <Clock size={14} className="text-volo-accent" /> {heliSku.durationMinutes} min
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-volo-bg px-3.5 py-1.5 text-sm text-volo-text border border-volo-border">
                  <Users size={14} className="text-volo-accent" /> do {heliSku.capacityTotal} os.
                </span>
              </div>

              <div className="mt-8 flex items-end justify-between gap-4 pt-6 border-t border-volo-border">
                <div>
                  <p className="text-xs text-volo-muted uppercase tracking-wider mb-1">Od</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-heading font-bold text-volo-text">
                      {formatPrice(heliSku.price)}
                    </span>
                    <span className="text-sm text-volo-muted ml-1.5">{heliSku.priceLabel}</span>
                  </div>
                </div>
                <Link href={`/s/${heliSku.slug}`} className="btn-primary px-6 py-3">
                  Sprawdź
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED TESTIMONIAL ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-volo-text" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        />
        <div className="relative section-padding container-narrow mx-auto py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-0.5 mb-6">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < featuredReview.rating ? 'text-volo-accent fill-volo-accent' : 'text-white/20'}
                />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-heading text-white leading-snug font-medium italic">
              &ldquo;{featuredReview.text}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-volo-accent/20 flex items-center justify-center">
                <span className="text-sm font-bold text-volo-accent">
                  {featuredReview.author.split(' ').map(w => w[0]).join('')}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{featuredReview.author}</p>
                <p className="text-xs text-white/40">Lot widokowy nad Krakowem</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE SHOWCASE: TRANSFER (reversed) ─── */}
      <section className="bg-volo-surface">
        <div className="container-wide section-padding mx-auto py-16 sm:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-center">
            {/* Content (left on desktop) */}
            <div className="lg:bg-volo-bg lg:rounded-2xl lg:p-10 xl:p-14 lg:shadow-volo-lg lg:mr-0 lg:-mr-4 relative order-2 lg:order-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-volo-accent mb-3 block">
                Komfort bez kompromisów
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-volo-text leading-tight">
                {transferSku.name}
              </h2>
              <p className="mt-4 text-volo-muted leading-relaxed">
                {transferSku.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-volo-surface px-3.5 py-1.5 text-sm text-volo-text border border-volo-border">
                  <Clock size={14} className="text-volo-accent" /> ok. {transferSku.durationMinutes} min
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-volo-surface px-3.5 py-1.5 text-sm text-volo-text border border-volo-border">
                  <Users size={14} className="text-volo-accent" /> do 4 pasażerów
                </span>
              </div>

              <div className="mt-8 flex items-end justify-between gap-4 pt-6 border-t border-volo-border">
                <div>
                  <p className="text-xs text-volo-muted uppercase tracking-wider mb-1">Cena</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-heading font-bold text-volo-text">
                      {formatPrice(transferSku.price)}
                    </span>
                    <span className="text-sm text-volo-muted ml-1.5">{transferSku.priceLabel}</span>
                  </div>
                </div>
                <Link href={`/s/${transferSku.slug}`} className="btn-primary px-6 py-3">
                  Sprawdź
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative lg:-ml-8 z-10 order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-volo-xl">
                <Image
                  src={transferSku.image}
                  alt={transferSku.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Star size={14} className="text-volo-accent fill-volo-accent" />
                  <span className="text-white text-sm font-bold">{transferSku.averageRating}</span>
                  <span className="text-white/60 text-xs">({transferSku.reviews.length} opinii)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY VOLO ─── */}
      <section className="bg-volo-bg border-y border-volo-border">
        <div className="container-wide section-padding mx-auto py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-volo-accent mb-3 block">
              Zaufanie
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-volo-text">
              Dlaczego warto z Volo
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 lg:gap-10">
            {[
              {
                icon: <Shield size={28} strokeWidth={1.5} />,
                title: 'Sprawdzeni operatorzy',
                text: 'Licencjonowani piloci, ubezpieczeni pasażerowie, serwisowane maszyny. Każdy lot zgodny z najwyższymi normami.',
              },
              {
                icon: <Clock size={28} strokeWidth={1.5} />,
                title: 'Rezerwacja bez stresu',
                text: 'Wybierz datę i potwierdź. Elastyczna anulacja do 48h. Przy złej pogodzie — bezpłatne przełożenie.',
              },
              {
                icon: <Gift size={28} strokeWidth={1.5} />,
                title: 'Idealny prezent',
                text: 'Voucher gotowy w minutę — PDF, email lub link. Obdarowany sam wybierze termin.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center group">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-volo-accent-light text-volo-accent mb-5 motion-safe:group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg font-semibold text-volo-text mb-2">{item.title}</h3>
                <p className="text-sm text-volo-muted leading-relaxed max-w-xs mx-auto">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GIFT CTA — CINEMATIC ─── */}
      <section className="relative min-h-[400px] lg:min-h-[480px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop"
          alt="Prezent — widoki z lotu ptaka"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />

        <div className="relative z-10 section-padding container-wide w-full">
          <div className="max-w-xl">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-volo-accent/20 backdrop-blur-sm text-volo-accent mb-5">
              <Gift size={28} strokeWidth={1.75} />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
              Podaruj
              <br />
              <span className="text-volo-accent">niezapomniane chwile</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70 max-w-md">
              Elegancki voucher na lot widokowy lub transfer VIP — gotowy natychmiast.
              Obdarowany sam wybierze datę.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/gift/heli-scenic-20" className="btn-primary text-base px-8 py-3.5">
                Kup voucher
                <ArrowRight size={18} />
              </Link>
              <span className="text-sm text-white/40">
                PDF · email · link
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
