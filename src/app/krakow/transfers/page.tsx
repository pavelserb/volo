import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { SectionHeading } from '@/components/SectionHeading';
import { SkuCard } from '@/components/SkuCard';
import { ReviewCard } from '@/components/ReviewCard';
import { skus } from '@/data/mock';

const transferSkus = skus.filter((s) => s.directionSlug === 'transfers');
const transferSku = transferSkus[0];

const timeline = [
  {
    step: '01',
    title: 'Wybierz transfer',
    text: 'Zarezerwuj przejazd z lotniska do centrum lub w drugą stronę — jedna cena za cały przejazd premium.',
  },
  {
    step: '02',
    title: 'Podaj lot i godzinę',
    text: 'Operator dopasuje kierowcę do Twojego przylotu lub odlotu. Potwierdzenie i dane kontaktowe otrzymasz e-mailem.',
  },
  {
    step: '03',
    title: 'Podróżuj komfortowo',
    text: 'Kierowca czeka z tabliczką, w aucie woda i Wi-Fi. Bez stresu po długim locie.',
  },
];

export default function KrakowTransfersPage() {
  const reviews = transferSku?.reviews ?? [];

  return (
    <>
      {/* Hero with photo */}
      <Hero
        image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&h=900&fit=crop"
        alt="Luksusowy sedan Mercedes"
        overlay="left"
      >
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-volo-accent">
            Kraków · Transfery VIP
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-tight">
            Transfery VIP w Krakowie
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl max-w-xl">
            Komfort premium od drzwi lotniska do hotelu — dyskretnie, punktualnie i z klasą.
          </p>
          <div className="mt-8">
            <Link href="/s/vip-transfer-lotnisko" className="btn-primary text-base px-8 py-3.5">
              Zarezerwuj transfer
            </Link>
          </div>
        </div>
      </Hero>

      {/* Price strip */}
      <div className="border-b border-volo-border bg-volo-surface/80 backdrop-blur-sm">
        <div className="container-wide section-padding mx-auto py-4">
          <p className="text-center text-sm font-medium text-volo-muted sm:text-base">
            Kraków · Mercedes E-klasa · od 349 PLN / przejazd
          </p>
        </div>
      </div>

      {/* Catalog */}
      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-bg">
        <div className="container-wide mx-auto lg:max-w-3xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {transferSkus.map((sku) => (
              <SkuCard
                key={sku.id}
                slug={sku.slug}
                name={sku.name}
                image={sku.image}
                price={sku.price}
                priceLabel={sku.priceLabel}
                durationMinutes={sku.durationMinutes}
                capacityTotal={sku.capacityTotal}
                capacityUnit={sku.capacityUnit}
                averageRating={sku.averageRating}
                reviewCount={sku.reviews.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works — vertical timeline */}
      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-surface border-y border-volo-border">
        <div className="container-narrow mx-auto max-w-2xl">
          <SectionHeading
            title="Jak to działa?"
            subtitle="Trzy kroki — od rezerwacji po spokojną podróż bez kolejek."
            align="center"
          />
          <div className="mt-12 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-volo-border hidden sm:block" />
            <div className="space-y-10">
              {timeline.map(({ step, title, text }) => (
                <div key={step} className="flex gap-5 sm:gap-6">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-volo-accent flex items-center justify-center text-white font-heading font-bold text-sm shadow-volo-md ring-4 ring-volo-accent-light">
                      {step}
                    </div>
                  </div>
                  <div className="pt-2.5">
                    <h3 className="font-heading text-lg font-semibold text-volo-text">{title}</h3>
                    <p className="mt-1 text-sm text-volo-muted leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-bg">
        <div className="container-wide mx-auto">
          <SectionHeading
            title="Opinie o transferach"
            subtitle="Doświadczenia osób, które skorzystały z naszego transferu VIP."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                author={review.author}
                rating={review.rating}
                text={review.text}
                date={review.date}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
