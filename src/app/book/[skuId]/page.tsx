'use client';

import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getSkuById, getSlotsForSku, type Slot } from '@/data/mock';
import { localizeSku } from '@/data/sku-locale';
import { ChevronLeft, CheckCircle, Shield, CalendarCheck, Clock } from 'lucide-react';
import { StepIndicator } from '@/components/StepIndicator';
import { SlotButton } from '@/components/SlotButton';
import { GuestStepper } from '@/components/GuestStepper';
import { AddonCard } from '@/components/AddonCard';
import { BookingSummary } from '@/components/BookingSummary';
import { TrustBar } from '@/components/TrustBar';
import { useI18n } from '@/i18n/context';

export default function BookingPage() {
  const { skuId } = useParams<{ skuId: string }>();
  const { locale, t, formatNumber, formatDate } = useI18n();
  const rawSku = getSkuById(skuId);
  const sku = useMemo(
    () => (rawSku ? localizeSku(rawSku, locale) : null),
    [rawSku, locale],
  );
  const allSlots = useMemo(() => (sku ? getSlotsForSku(sku.id) : []), [sku]);

  const stepLabels = useMemo(() => t('booking.steps').split('|'), [t]);

  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [guests, setGuests] = useState(1);
  const [isBuyout, setIsBuyout] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [consent, setConsent] = useState(false);

  const numberLocale = locale === 'pl' ? 'pl-PL' : 'en-GB';

  if (!sku) {
    return (
      <div className="container-narrow section-padding py-20 text-center">
        <h1 className="text-2xl font-heading font-bold mb-4">{t('booking.notFound')}</h1>
        <Link href="/" className="btn-primary">
          {t('booking.homeLink')}
        </Link>
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

  const formatDayChip = (d: string) => {
    const date = new Date(d + 'T00:00:00');
    const day = date.toLocaleDateString(numberLocale, { weekday: 'short' });
    const num = date.getDate();
    const month = date.toLocaleDateString(numberLocale, { month: 'short' });
    return { day, num, month };
  };

  const bookingRef = useMemo(
    () => 'BK-DEMO-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    [],
  );

  const guestUnitLabel = t('booking.guestUnit');
  const summaryGuestUnit = isShared ? guestUnitLabel : undefined;

  const consentBlock = (
    <span className="text-sm text-volo-muted">
      {t('booking.consentLead')}
      <Link href="/legal/terms" className="underline text-volo-accent">
        {t('booking.terms')}
      </Link>
      {t('booking.consentBetween')}
      <Link href="/legal/privacy" className="underline text-volo-accent">
        {t('booking.privacy')}
      </Link>
      {t('booking.consentEnd')}
    </span>
  );

  return (
    <div className="container-narrow section-padding py-6 sm:py-8 max-w-full">
      {step < 3 && (
        <div className="mb-10">
          <StepIndicator steps={stepLabels} currentStep={step} />
        </div>
      )}

      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-10">
        <div>
          {step === 0 && (
            <div>
              <h2 className="text-xl font-heading font-bold mb-1">{t('booking.step0Title')}</h2>
              <p className="text-sm text-volo-muted mb-6">{sku.name}</p>

              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 snap-x snap-mandatory">
                {dates.map((d) => {
                  const { day, num, month } = formatDayChip(d);
                  const active = d === selectedDate;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d);
                        setSelectedSlot(null);
                      }}
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

              {selectedDate && (
                <div>
                  <h3 className="text-sm font-semibold mb-3">{t('booking.availableTimes')}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {slotsForDate.map((slot) => (
                      <SlotButton
                        key={slot.id}
                        time={slot.time}
                        remaining={slot.remaining}
                        total={slot.total}
                        selected={selectedSlot?.id === slot.id}
                        onClick={() => {
                          setSelectedSlot(slot);
                          setGuests(1);
                          setIsBuyout(false);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end pb-2 lg:pb-0">
                <button
                  type="button"
                  className="btn-primary w-full sm:w-auto"
                  disabled={!canProceedStep0}
                  onClick={() => setStep(1)}
                >
                  {t('booking.next')}
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <button type="button" onClick={() => setStep(0)} className="btn-ghost text-sm mb-4 -ml-2">
                <ChevronLeft size={16} /> {t('booking.backDate')}
              </button>
              <h2 className="text-xl font-heading font-bold mb-1">{t('booking.step1Title')}</h2>
              <p className="text-sm text-volo-muted mb-6">
                {selectedDate ? formatDate(selectedDate, { day: 'numeric', month: 'long', year: 'numeric' }) : ''}{' '}
                · {selectedSlot?.time}
              </p>

              {isShared && (
                <div className="card p-5 mb-6">
                  <GuestStepper
                    value={guests}
                    min={1}
                    max={maxGuests}
                    unit={guestUnitLabel}
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
                    {t('booking.exclusiveInfo', {
                      total: String(sku.capacityTotal),
                      unit: sku.priceLabel,
                    })}
                  </p>
                </div>
              )}

              {sku.addons.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-3">{t('booking.addons')}</h3>
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

              <div className="mt-8 flex justify-end pb-2 lg:pb-0">
                <button type="button" className="btn-primary w-full sm:w-auto" onClick={() => setStep(2)}>
                  {t('booking.next')}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <button type="button" onClick={() => setStep(1)} className="btn-ghost text-sm mb-4 -ml-2">
                <ChevronLeft size={16} /> {t('booking.back')}
              </button>
              <h2 className="text-xl font-heading font-bold mb-6">{t('booking.step2Title')}</h2>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t('booking.fullName')}</label>
                  <input
                    className="input"
                    placeholder={locale === 'pl' ? 'Jan Kowalski' : 'Jane Doe'}
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t('booking.email')}</label>
                  <input
                    className="input"
                    type="email"
                    placeholder="jan@example.com"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t('booking.phone')}</label>
                  <input
                    className="input"
                    type="tel"
                    placeholder={locale === 'pl' ? '+48 600 000 000' : '+44 7700 900000'}
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="card p-5 mb-6">
                <h3 className="text-sm font-semibold mb-3">{t('booking.payment')}</h3>
                <div className="space-y-3">
                  <input className="input bg-volo-bg text-volo-muted" disabled value="4242 4242 4242 4242" readOnly />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input bg-volo-bg text-volo-muted" disabled value="12/28" readOnly />
                    <input className="input bg-volo-bg text-volo-muted" disabled value="123" readOnly />
                  </div>
                </div>
                <p className="text-xs text-volo-muted mt-2">{t('booking.paymentDemo')}</p>
              </div>

              <label className="flex items-start gap-3 mb-8 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-5 h-5 accent-volo-accent"
                />
                {consentBlock}
              </label>

              <button
                type="button"
                className="btn-primary w-full text-base sm:text-lg py-3.5 sm:py-4"
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
              >
                {t('booking.pay', { amount: formatNumber(total) })}
              </button>
              <div className="mt-3">
                <TrustBar />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <CheckCircle size={64} className="text-volo-success mx-auto mb-6" />

              {sku.confirmationModel === 'instant' ? (
                <>
                  <h2 className="text-2xl font-heading font-bold mb-2">{t('booking.confirmed')}</h2>
                  <p className="text-volo-muted">{t('booking.confirmedBody')}</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-heading font-bold mb-2">{t('booking.pending')}</h2>
                  <p className="text-volo-muted">{t('booking.pendingBody')}</p>
                </>
              )}

              <div className="card-elevated p-6 mt-8 text-left max-w-md mx-auto">
                <div className="space-y-3 text-sm">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:items-baseline">
                    <span className="text-volo-muted shrink-0">{t('booking.ref')}</span>
                    <span className="font-mono font-semibold break-all text-right sm:text-left">{bookingRef}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                    <span className="text-volo-muted shrink-0">{t('booking.service')}</span>
                    <span className="font-medium text-right sm:text-left break-words">{sku.name}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                    <span className="text-volo-muted shrink-0">{t('booking.date')}</span>
                    <span className="text-right sm:text-left break-words">
                      {selectedDate ? formatDate(selectedDate) : ''} · {selectedSlot?.time}
                    </span>
                  </div>
                  {isShared && (
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                      <span className="text-volo-muted shrink-0">{t('booking.people')}</span>
                      <span className="text-right sm:text-left">
                        {isBuyout
                          ? t('booking.privateShort', { n: String(sku.capacityTotal) })
                          : String(guests)}
                      </span>
                    </div>
                  )}
                  <hr className="border-volo-border" />
                  <div className="flex justify-between items-baseline gap-4 font-heading font-bold text-base">
                    <span>{t('booking.total')}</span>
                    <span className="tabular-nums shrink-0">{formatNumber(total)} PLN</span>
                  </div>
                </div>
                <p className="text-xs text-volo-muted mt-4">
                  {t('booking.emailSent', {
                    email: contact.email || t('booking.emailUnknown'),
                  })}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Link href="/account/bookings" className="btn-primary">
                  {t('booking.myBookings')}
                </Link>
                <Link href="/" className="btn-secondary">
                  {t('sku.home')}
                </Link>
              </div>
            </div>
          )}
        </div>

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
                guestUnit={summaryGuestUnit}
                durationMinutes={sku.durationMinutes}
                basePrice={basePrice}
                addonsTotal={step >= 1 ? addonsTotal : 0}
                totalPrice={total}
                isBuyout={isBuyout}
              />
              <div className="mt-4">
                <TrustBar
                  variant="vertical"
                  items={[
                    { icon: <Shield size={16} />, text: t('booking.trustPay') },
                    {
                      icon: <CalendarCheck size={16} />,
                      text:
                        sku.confirmationModel === 'instant'
                          ? t('booking.trustConfirm')
                          : t('booking.trustConfirmWait'),
                    },
                    {
                      icon: <Clock size={16} />,
                      text: t('booking.trustDuration', { min: String(sku.durationMinutes) }),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {step < 3 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-volo-surface/95 backdrop-blur-md border-t border-volo-border px-4 pt-3 z-40 shadow-volo-xl safe-bottom-pad">
          <div className="flex flex-col gap-2 min-w-0">
            <span className="text-xs text-volo-muted line-clamp-2 leading-snug">{sku.name}</span>
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <span className="text-lg font-heading font-bold tabular-nums">{formatNumber(total)} PLN</span>
                {sku.priceModel === 'per_unit' && !isBuyout && (
                  <span className="text-xs text-volo-muted ml-1 block sm:inline">
                    ({guests} {guestUnitLabel})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {step < 3 && <div className="lg:hidden h-24 sm:h-28" aria-hidden />}
    </div>
  );
}
