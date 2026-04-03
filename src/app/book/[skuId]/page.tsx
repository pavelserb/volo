'use client';

import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getSkuById, getSlotsForSku, type Slot } from '@/data/mock';
import { ChevronLeft, CheckCircle, Shield, CalendarCheck, Clock } from 'lucide-react';
import { StepIndicator } from '@/components/StepIndicator';
import { SlotButton } from '@/components/SlotButton';
import { GuestStepper } from '@/components/GuestStepper';
import { AddonCard } from '@/components/AddonCard';
import { BookingSummary } from '@/components/BookingSummary';
import { TrustBar } from '@/components/TrustBar';

const STEP_LABELS = ['Data i czas', 'Szczegóły', 'Płatność', 'Potwierdzenie'];

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('pl-PL').format(amount);

export default function BookingPage() {
  const { skuId } = useParams<{ skuId: string }>();
  const sku = getSkuById(skuId);
  const allSlots = useMemo(() => (sku ? getSlotsForSku(sku.id) : []), [sku]);

  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [guests, setGuests] = useState(1);
  const [isBuyout, setIsBuyout] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [consent, setConsent] = useState(false);

  if (!sku) {
    return (
      <div className="container-narrow section-padding py-20 text-center">
        <h1 className="text-2xl font-heading font-bold mb-4">Nie znaleziono oferty</h1>
        <Link href="/" className="btn-primary">Strona główna</Link>
      </div>
    );
  }

  const dates = useMemo(() => {
    const unique = [...new Set(allSlots.map((s) => s.date))];
    return unique.slice(0, 14);
  }, [allSlots]);

  const slotsForDate = useMemo(
    () => allSlots.filter((s) => s.date === selectedDate),
    [allSlots, selectedDate],
  );

  const isShared = sku.capacityModel === 'shared' || sku.capacityModel === 'shared_buyout';
  const hasBuyout = sku.capacityModel === 'shared_buyout' && sku.buyoutPrice;
  const maxGuests = isBuyout ? sku.capacityTotal : (selectedSlot?.remaining ?? sku.capacityTotal);

  const basePrice = (() => {
    if (sku.priceModel === 'per_slot') return sku.price;
    if (isBuyout && sku.buyoutPrice) return sku.buyoutPrice;
    return sku.price * guests;
  })();

  const addonsTotal = sku.addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const total = basePrice + addonsTotal;

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const canProceedStep0 = selectedDate && selectedSlot;
  const canProceedStep2 = contact.name && contact.email && contact.phone && consent;

  const formatDate = (d: string) => {
    const date = new Date(d + 'T00:00:00');
    const day = date.toLocaleDateString('pl-PL', { weekday: 'short' });
    const num = date.getDate();
    const month = date.toLocaleDateString('pl-PL', { month: 'short' });
    return { day, num, month };
  };

  const bookingRef = useMemo(
    () => 'BK-DEMO-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    [],
  );

  return (
    <div className="container-narrow section-padding py-8">
      {/* Step indicator */}
      {step < 3 && (
        <div className="mb-10">
          <StepIndicator steps={STEP_LABELS} currentStep={step} />
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10">
        {/* Main form area */}
        <div>
          {/* Step 0 — Date & time */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-heading font-bold mb-1">Wybierz datę i godzinę</h2>
              <p className="text-sm text-volo-muted mb-6">{sku.name}</p>

              {/* Date chips */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 snap-x snap-mandatory">
                {dates.map((d) => {
                  const { day, num, month } = formatDate(d);
                  const active = d === selectedDate;
                  return (
                    <button
                      key={d}
                      onClick={() => { setSelectedDate(d); setSelectedSlot(null); }}
                      className={`snap-start shrink-0 flex flex-col items-center px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                        active
                          ? 'border-volo-accent bg-volo-accent-light text-volo-accent font-semibold'
                          : 'border-volo-border bg-volo-surface hover:border-volo-accent/50'
                      }`}
                    >
                      <span className="text-xs uppercase">{day}</span>
                      <span className="text-lg font-heading font-bold">{num}</span>
                      <span className="text-xs">{month}</span>
                    </button>
                  );
                })}
              </div>

              {/* Slot grid */}
              {selectedDate && (
                <div>
                  <h3 className="text-sm font-semibold mb-3">Dostępne godziny</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {slotsForDate.map((slot) => (
                      <SlotButton
                        key={slot.id}
                        time={slot.time}
                        remaining={slot.remaining}
                        total={slot.total}
                        selected={selectedSlot?.id === slot.id}
                        onClick={() => { setSelectedSlot(slot); setGuests(1); setIsBuyout(false); }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button className="btn-primary" disabled={!canProceedStep0} onClick={() => setStep(1)}>
                  Dalej
                </button>
              </div>
            </div>
          )}

          {/* Step 1 — Details */}
          {step === 1 && (
            <div>
              <button onClick={() => setStep(0)} className="btn-ghost text-sm mb-4 -ml-2">
                <ChevronLeft size={16} /> Zmień datę
              </button>
              <h2 className="text-xl font-heading font-bold mb-1">Szczegóły rezerwacji</h2>
              <p className="text-sm text-volo-muted mb-6">{selectedDate} · {selectedSlot?.time}</p>

              {/* Guest stepper */}
              {isShared && (
                <div className="card p-5 mb-6">
                  <GuestStepper
                    value={guests}
                    min={1}
                    max={maxGuests}
                    unit={sku.capacityUnit === 'miejsce' ? 'osób' : sku.capacityUnit}
                    onChange={setGuests}
                    buyoutAvailable={!!hasBuyout}
                    buyoutPrice={sku.buyoutPrice}
                    isBuyout={isBuyout}
                    onBuyoutChange={(v) => {
                      setIsBuyout(v);
                      if (v) setGuests(sku.capacityTotal);
                    }}
                  />
                </div>
              )}

              {!isShared && (
                <div className="card p-5 mb-6">
                  <p className="text-sm text-volo-muted">
                    Usługa obejmuje do {sku.capacityTotal} pasażerów — cena za {sku.capacityUnit}.
                  </p>
                </div>
              )}

              {/* Addons */}
              {sku.addons.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-3">Dodatki</h3>
                  <div className="space-y-3">
                    {sku.addons.map((addon) => (
                      <AddonCard
                        key={addon.id}
                        name={addon.name}
                        description={addon.description}
                        price={addon.price}
                        selected={selectedAddons.includes(addon.id)}
                        onToggle={() => toggleAddon(addon.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button className="btn-primary" onClick={() => setStep(2)}>Dalej</button>
              </div>
            </div>
          )}

          {/* Step 2 — Payment */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="btn-ghost text-sm mb-4 -ml-2">
                <ChevronLeft size={16} /> Wróć
              </button>
              <h2 className="text-xl font-heading font-bold mb-6">Dane kontaktowe i płatność</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Imię i nazwisko</label>
                  <input
                    className="input"
                    placeholder="Jan Kowalski"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <input
                    className="input"
                    type="email"
                    placeholder="jan@example.com"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Telefon</label>
                  <input
                    className="input"
                    type="tel"
                    placeholder="+48 600 000 000"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="card p-5 mb-6">
                <h3 className="text-sm font-semibold mb-3">Płatność</h3>
                <div className="space-y-3">
                  <input className="input bg-volo-bg text-volo-muted" disabled value="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input bg-volo-bg text-volo-muted" disabled value="12/28" />
                    <input className="input bg-volo-bg text-volo-muted" disabled value="123" />
                  </div>
                </div>
                <p className="text-xs text-volo-muted mt-2">Demo — płatność nie jest przetwarzana</p>
              </div>

              <label className="flex items-start gap-3 mb-8 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-5 h-5 accent-volo-accent"
                />
                <span className="text-sm text-volo-muted">
                  Akceptuję{' '}
                  <Link href="/legal/terms" className="underline text-volo-accent">regulamin</Link>
                  {' '}i{' '}
                  <Link href="/legal/privacy" className="underline text-volo-accent">politykę prywatności</Link>
                </span>
              </label>

              <button
                className="btn-primary w-full text-lg py-4"
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
              >
                Zapłać {formatPrice(total)} PLN
              </button>
              <div className="mt-3">
                <TrustBar />
              </div>
            </div>
          )}

          {/* Step 3 — Confirmation */}
          {step === 3 && (
            <div className="text-center py-8">
              <CheckCircle size={64} className="text-volo-success mx-auto mb-6" />

              {sku.confirmationModel === 'instant' ? (
                <>
                  <h2 className="text-2xl font-heading font-bold mb-2">Rezerwacja potwierdzona!</h2>
                  <p className="text-volo-muted">Twoja rezerwacja została potwierdzona. Do zobaczenia!</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold mb-2">Rezerwacja przyjęta</h2>
                  <p className="text-volo-muted">Oczekujemy na potwierdzenie od operatora — zwykle w ciągu 2 godzin.</p>
                </>
              )}

              <div className="card-elevated p-6 mt-8 text-left max-w-md mx-auto">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-volo-muted">Nr rezerwacji</span>
                    <span className="font-mono font-semibold">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-volo-muted">Usługa</span>
                    <span className="font-medium">{sku.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-volo-muted">Data</span>
                    <span>{selectedDate} · {selectedSlot?.time}</span>
                  </div>
                  {isShared && (
                    <div className="flex justify-between">
                      <span className="text-volo-muted">Osoby</span>
                      <span>{isBuyout ? `do ${sku.capacityTotal} (prywatny)` : guests}</span>
                    </div>
                  )}
                  <hr className="border-volo-border" />
                  <div className="flex justify-between font-heading font-bold text-base">
                    <span>Razem</span>
                    <span>{formatPrice(total)} PLN</span>
                  </div>
                </div>
                <p className="text-xs text-volo-muted mt-4">Potwierdzenie wysłane na {contact.email || 'podany email'}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Link href="/account/bookings" className="btn-primary">Moje rezerwacje</Link>
                <Link href="/" className="btn-secondary">Strona główna</Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar summary (desktop) */}
        {step < 3 && (
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <BookingSummary
                image={sku.image}
                skuName={sku.name}
                city={sku.city}
                date={selectedDate ?? undefined}
                time={selectedSlot?.time}
                guests={step >= 1 ? (isBuyout ? sku.capacityTotal : guests) : undefined}
                guestUnit={isShared ? (sku.capacityUnit === 'miejsce' ? 'osób' : sku.capacityUnit) : undefined}
                durationMinutes={sku.durationMinutes}
                basePrice={basePrice}
                addonsTotal={step >= 1 ? addonsTotal : 0}
                totalPrice={total}
                priceLabel={sku.priceLabel}
                isBuyout={isBuyout}
              />
              <div className="mt-4">
                <TrustBar
                  variant="vertical"
                  items={[
                    { icon: <Shield size={16} />, text: 'Bezpieczna płatność' },
                    { icon: <CalendarCheck size={16} />, text: sku.confirmationModel === 'instant' ? 'Natychmiastowe potwierdzenie' : 'Potwierdzenie w ciągu 2h' },
                    { icon: <Clock size={16} />, text: `Czas trwania: ${sku.durationMinutes} min` },
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky bar */}
      {step < 3 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-volo-surface/95 backdrop-blur-md border-t border-volo-border p-4 z-40 shadow-volo-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-heading font-bold">{formatPrice(total)} PLN</span>
              {sku.priceModel === 'per_unit' && !isBuyout && (
                <span className="text-xs text-volo-muted ml-1">({guests} os.)</span>
              )}
            </div>
            <span className="text-xs text-volo-muted truncate max-w-[40%]">{sku.name}</span>
          </div>
        </div>
      )}
      {step < 3 && <div className="lg:hidden h-20" />}
    </div>
  );
}
