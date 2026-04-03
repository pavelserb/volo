import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { SectionHeading } from '@/components/SectionHeading';
import { SkuCard } from '@/components/SkuCard';
import { ReviewCard } from '@/components/ReviewCard';
import { skus } from '@/data/mock';

const helicopterSkus = skus.filter((s) => s.directionSlug === 'helicopters');
const heliSku = helicopterSkus[0];

const timeline = [
  {
    step: '01',
    title: 'Wybierz lot',
    text: 'Przeglądaj dostępne trasy i pakiety — od krótkich widokowych po dłuższe przeżycia nad Krakowem.',
  },
  {
    step: '02',
    title: 'Zarezerwuj termin',
    text: 'Wybierz dogodną datę i godzinę, podaj liczbę osób. Potwierdzenie otrzymasz e-mailem.',
  },
  {
    step: '03',
    title: 'Ciesz się przeżyciem',
    text: 'Staw się na lądowisku na briefing, wsiądź na pokład i zobacz miasto z perspektywy ptaka.',
  },
];

const faqItems = [
  {
    q: 'Czy lot helikopterem jest bezpieczny?',
    a: 'Tak. Współpracujemy z certyfikowanymi operatorami, a piloci posiadają uprawnienia komercyjne. Przed lotem odbywa się briefing BHP; przy złej pogodzie lot może zostać przełożony z pełnym zwrotem.',
  },
  {
    q: 'Ile osób zmieści się w helikopterze?',
    a: 'Przy lotach współdzielonych rezerwujesz miejsca dla siebie i towarzystwa; dostępna jest też opcja wykupu całego pokładu. Szczegóły na stronie konkretnego doświadczenia.',
  },
  {
    q: 'Co jeśli pogoda się pogorszy?',
    a: 'Bezpieczeństwo jest priorytetem. Operator skontaktuje się w sprawie bezpłatnego przełożenia lub pełnego zwrotu środków.',
  },
  {
    q: 'Czy mogę podarować lot w prezencie?',
    a: 'Oczywiście. W ofercie są vouchery podarunkowe — obdarowany sam wybierze termin.',
  },
];

export default function KrakowHelicoptersPage() {
  const reviews = heliSku?.reviews ?? [];

  return (
    <>
      {/* Hero with photo */}
      <Hero
        image="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1600&h=900&fit=crop"
        alt="Helikopter nad Krakowem"
        overlay="left"
      >
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-volo-accent">
            Kraków · Loty widokowe
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white leading-tight">
            Loty helikopterem w Krakowie
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl max-w-xl">
            Unikalne widoki na Stare Miasto, Wawel i dolinę Wisły — zaplanuj lot, który na zawsze
            zostanie w albumie wspomnień.
          </p>
          <div className="mt-8">
            <Link href="/s/lot-widokowy-nad-krakowem" className="btn-primary text-base px-8 py-3.5">
              Zarezerwuj lot
            </Link>
          </div>
        </div>
      </Hero>

      {/* Price strip */}
      <div className="border-b border-volo-border bg-volo-surface/80 backdrop-blur-sm">
        <div className="container-wide section-padding mx-auto py-4">
          <p className="text-center text-sm font-medium text-volo-muted sm:text-base">
            Kraków · Loty helikopterem · od 899 PLN / os.
          </p>
        </div>
      </div>

      {/* Catalog */}
      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-bg">
        <div className="container-wide mx-auto lg:max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {helicopterSkus.map((sku) => (
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
            subtitle="Trzy proste kroki dzielą Cię od widoków, które zapamiętasz na lata."
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
            title="Opinie pasażerów"
            subtitle="Co mówią ci, którzy już wzbili się nad Kraków."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* FAQ */}
      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-surface border-t border-volo-border">
        <div className="container-narrow mx-auto max-w-2xl">
          <SectionHeading
            title="Najczęstsze pytania"
            subtitle="Krótkie odpowiedzi przed rezerwacją."
            align="center"
          />
          <div className="mt-10 flex flex-col gap-4">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="card group overflow-hidden motion-safe:open:shadow-volo-md transition-shadow"
              >
                <summary className="cursor-pointer list-none px-5 py-4 sm:px-6 sm:py-5 font-heading font-semibold text-volo-text flex items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <span className="text-left">{item.q}</span>
                  <span className="shrink-0 text-volo-accent text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 -mt-1">
                  <p className="text-sm sm:text-base leading-relaxed text-volo-muted border-t border-volo-border pt-4">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
