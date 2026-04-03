'use client';

import { Building2, Crown, PartyPopper, Users } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { SectionHeading } from '@/components/SectionHeading';

const features = [
  {
    title: 'Team building',
    text: 'Loty widokowe i wyjazdy integracyjne z logistyką od drzwi do drzwi — bezpiecznie, z klasą i z pamiątką na lata.',
    icon: Users,
  },
  {
    title: 'Nagrody dla pracowników',
    text: 'Vouchery na przeżycia zamiast standardowych bonusów. Personalizacja, faktura zbiorcza i elastyczne terminy.',
    icon: PartyPopper,
  },
  {
    title: 'Eventy VIP',
    text: 'Transfery premium, powitania na lotnisku i loty helikopterem dla gości specjalnych — dopasujemy scenariusz do marki.',
    icon: Crown,
  },
] as const;

export default function CorporatePage() {
  return (
    <>
      {/* Hero */}
      <Hero
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop"
        alt="Widok z helikoptera na panoramę"
        overlay="center"
        minHeight="min-h-[400px] lg:min-h-[480px]"
      >
        <div className="text-center max-w-3xl mx-auto">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
            <Building2 size={14} />
            B2B
          </p>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight text-white leading-tight">
            Volo dla firm
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl max-w-2xl mx-auto">
            Team building w chmurach, nagrody dla zespołu i eventy VIP z transferami
            oraz lotami helikopterem w Krakowie.
          </p>
        </div>
      </Hero>

      {/* Features */}
      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-surface border-b border-volo-border">
        <div className="container-wide mx-auto">
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {features.map(({ title, text, icon: Icon }) => (
              <article key={title} className="card-elevated p-6 sm:p-8 flex flex-col h-full">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-volo-accent-light text-volo-accent">
                  <Icon size={24} strokeWidth={2} />
                </span>
                <h2 className="font-heading text-xl font-bold text-volo-text mb-3">{title}</h2>
                <p className="text-sm sm:text-base text-volo-muted leading-relaxed flex-1">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-bg">
        <div className="container-narrow mx-auto max-w-2xl">
          <SectionHeading
            title="Zapytanie ofertowe"
            subtitle="Wypełnij formularz — odezwiemy się z propozycją w ciągu 1–2 dni roboczych (formularz demonstracyjny)."
            align="center"
          />
          <form className="card-elevated p-6 sm:p-8 space-y-5 mt-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="company" className="text-sm font-medium text-volo-text">Nazwa firmy</label>
                <input id="company" className="input" placeholder="np. Acme Sp. z o.o." />
              </div>
              <div className="space-y-2">
                <label htmlFor="person" className="text-sm font-medium text-volo-text">Osoba kontaktowa</label>
                <input id="person" className="input" placeholder="Imię i nazwisko" />
              </div>
              <div className="space-y-2">
                <label htmlFor="cemail" className="text-sm font-medium text-volo-text">E-mail służbowy</label>
                <input id="cemail" type="email" className="input" placeholder="kontakt@firma.pl" />
              </div>
              <div className="space-y-2">
                <label htmlFor="cphone" className="text-sm font-medium text-volo-text">Telefon</label>
                <input id="cphone" type="tel" className="input" placeholder="+48 …" />
              </div>
              <div className="space-y-2">
                <label htmlFor="etype" className="text-sm font-medium text-volo-text">Typ wydarzenia</label>
                <select id="etype" className="input">
                  <option>Team building / integracja</option>
                  <option>Nagrody / vouchery</option>
                  <option>Event VIP / goście specjalni</option>
                  <option>Inne</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="participants" className="text-sm font-medium text-volo-text">Szacowana liczba uczestników</label>
                <input id="participants" type="number" min={1} className="input" placeholder="np. 12" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="cmsg" className="text-sm font-medium text-volo-text">Wiadomość</label>
                <textarea id="cmsg" className="input min-h-[120px] resize-y" placeholder="Opisz potrzeby, termin, budżet…" />
              </div>
            </div>
            <button type="button" className="btn-primary w-full sm:w-auto">
              Wyślij zapytanie
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
