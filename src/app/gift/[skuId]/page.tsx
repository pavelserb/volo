'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Copy,
  Download,
  FileDown,
  Gift,
  Link2,
  Lock,
  Mail,
  PartyPopper,
  ShieldCheck,
} from 'lucide-react';
import { getSkuById } from '@/data/mock';
import { StepIndicator } from '@/components/StepIndicator';

type DeliveryFormat = 'pdf' | 'email' | 'link';

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('pl-PL').format(amount);

const STEP_LABELS = ['Personalizacja', 'Format dostawy', 'Płatność', 'Gotowe'];

export default function GiftPurchasePage() {
  const params = useParams();
  const skuId = typeof params.skuId === 'string' ? params.skuId : '';
  const sku = useMemo(() => getSkuById(skuId), [skuId]);

  const [step, setStep] = useState(0);
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryFormat, setDeliveryFormat] = useState<DeliveryFormat | null>(null);
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [paymentConsent, setPaymentConsent] = useState(false);
  const [linkToast, setLinkToast] = useState(false);

  if (!sku) {
    return (
      <div className="section-padding container-narrow py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-volo-text mb-3">Nie znaleziono vouchera</h1>
        <p className="text-volo-muted mb-8 max-w-md mx-auto">
          Ta oferta nie jest dostępna jako podarunek.
        </p>
        <Link href="/" className="btn-primary">Strona główna</Link>
      </div>
    );
  }

  const price = sku.price;
  const canProceed0 = recipientName.trim().length > 0;
  const canProceed1 =
    deliveryFormat !== null &&
    (deliveryFormat !== 'email' || deliveryEmail.trim().includes('@'));
  const canPay = paymentConsent;

  const mockVoucherUrl = `https://volo.pl/v/${sku.id}-demo`;

  const handlePay = () => {
    if (!canPay) return;
    setStep(3);
  };

  const handleCopyLink = () => {
    void navigator.clipboard?.writeText(mockVoucherUrl).then(() => {
      setLinkToast(true);
      window.setTimeout(() => setLinkToast(false), 2800);
    });
  };

  return (
    <div className="section-padding py-10 sm:py-14 lg:py-16">
      <div className="container-narrow mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-volo-accent-light text-volo-accent">
            <Gift size={24} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-volo-accent mb-1">
              Voucher podarunkowy
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-volo-text leading-tight">
              {sku.name}
            </h1>
            <p className="mt-2 text-sm text-volo-muted leading-relaxed">{sku.description}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="mb-10">
          <StepIndicator steps={STEP_LABELS} currentStep={step} />
        </div>

        {/* Step 0 — Personalization */}
        {step === 0 && (
          <div className="card-elevated p-6 sm:p-8 space-y-6">
            <h2 className="font-heading text-xl font-semibold text-volo-text">Personalizacja</h2>
            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm font-medium text-volo-text">Imię obdarowanego</label>
              <input id="recipient" className="input" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="np. Marek" autoComplete="name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="msg" className="text-sm font-medium text-volo-text">Wiadomość od Ciebie</label>
              <textarea id="msg" className="input min-h-[120px] resize-y" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Krótkie życzenia lub wspomnienie…" />
            </div>
            <div className="space-y-2">
              <label htmlFor="deldate" className="text-sm font-medium text-volo-text">Data dostawy (opcjonalnie)</label>
              <input id="deldate" type="date" className="input" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
              <p className="text-xs text-volo-muted">Możesz zaplanować wysłanie vouchera na konkretny dzień.</p>
            </div>
            <button type="button" className="btn-primary w-full sm:w-auto" disabled={!canProceed0} onClick={() => setStep(1)}>
              Dalej
            </button>
          </div>
        )}

        {/* Step 1 — Delivery format */}
        {step === 1 && (
          <div className="card-elevated p-6 sm:p-8 space-y-6">
            <h2 className="font-heading text-xl font-semibold text-volo-text">Format dostawy</h2>
            <p className="text-sm text-volo-muted leading-relaxed">Wybierz, jak obdarowany otrzyma voucher.</p>
            <div className="grid gap-4">
              {([
                { id: 'pdf' as const, title: 'Pobierz PDF', desc: 'Natychmiastowy plik do wydrukowania.', icon: FileDown },
                { id: 'email' as const, title: 'Wyślij emailem', desc: 'Voucher trafi na podany adres.', icon: Mail },
                { id: 'link' as const, title: 'Skopiuj link', desc: 'Udostępnij link do aktywacji.', icon: Link2 },
              ]).map(({ id, title, desc, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setDeliveryFormat(id)}
                  className={`text-left rounded-2xl border-2 p-5 transition-all duration-200 flex gap-4
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volo-accent focus-visible:ring-offset-2
                    ${deliveryFormat === id
                      ? 'border-volo-accent bg-volo-accent-light shadow-volo-md'
                      : 'border-volo-border bg-volo-surface hover:border-volo-accent/40'
                    }`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    deliveryFormat === id ? 'bg-volo-accent text-white' : 'bg-volo-bg text-volo-accent'
                  }`}>
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="font-heading font-semibold text-volo-text block">{title}</span>
                    <span className="text-sm text-volo-muted mt-1 block">{desc}</span>
                  </span>
                </button>
              ))}
            </div>
            {deliveryFormat === 'email' && (
              <div className="space-y-2 pt-2">
                <label htmlFor="em" className="text-sm font-medium text-volo-text">E-mail odbiorcy</label>
                <input id="em" type="email" className="input" value={deliveryEmail} onChange={(e) => setDeliveryEmail(e.target.value)} placeholder="jan@example.com" autoComplete="email" />
              </div>
            )}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
              <button type="button" className="btn-secondary w-full sm:w-auto" onClick={() => setStep(0)}>Wstecz</button>
              <button type="button" className="btn-primary w-full sm:w-auto" disabled={!canProceed1} onClick={() => setStep(2)}>Dalej</button>
            </div>
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && (
          <div className="card-elevated p-6 sm:p-8 space-y-6">
            <h2 className="font-heading text-xl font-semibold text-volo-text">Płatność</h2>
            <div className="rounded-2xl border border-volo-border bg-volo-bg p-5 flex justify-between items-baseline gap-4">
              <span className="text-sm font-medium text-volo-muted">Do zapłaty</span>
              <span className="text-2xl font-heading font-bold text-volo-text tabular-nums">{formatPrice(price)} PLN</span>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-wide text-volo-muted flex items-center gap-2">
                <Lock size={14} className="text-volo-accent" /> Dane karty (demo)
              </p>
              <input className="input bg-volo-bg text-volo-muted" disabled value="4242 4242 4242 4242" readOnly />
              <div className="grid grid-cols-2 gap-4">
                <input className="input bg-volo-bg text-volo-muted" disabled value="12 / 28" readOnly />
                <input className="input bg-volo-bg text-volo-muted" disabled value="•••" readOnly />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded accent-volo-accent"
                checked={paymentConsent}
                onChange={(e) => setPaymentConsent(e.target.checked)}
              />
              <span className="text-sm text-volo-text leading-relaxed">
                Akceptuję{' '}
                <Link href="/legal/terms" className="text-volo-accent underline-offset-2 hover:underline">regulamin</Link>
                {' '}oraz{' '}
                <Link href="/legal/privacy" className="text-volo-accent underline-offset-2 hover:underline">politykę prywatności</Link>.
              </span>
            </label>

            <div className="flex items-center gap-2 text-xs text-volo-muted border-t border-volo-border pt-4">
              <ShieldCheck size={14} className="text-volo-success" /> Szyfrowane połączenie
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between pt-2">
              <button type="button" className="btn-secondary w-full sm:w-auto" onClick={() => setStep(1)}>Wstecz</button>
              <button type="button" className="btn-primary w-full sm:w-auto" disabled={!canPay} onClick={handlePay}>
                Zapłać {formatPrice(price)} PLN
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div className="card-elevated p-6 sm:p-10 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-volo-accent-light text-4xl">
              🎁
            </div>
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-volo-accent">
                <PartyPopper size={18} /> Płatność zakończona
              </p>
              <h2 className="font-heading text-2xl font-bold text-volo-text">Voucher jest gotowy!</h2>
              <p className="text-volo-muted max-w-md mx-auto leading-relaxed">
                Dziękujemy za zakup. {recipientName ? `Życzenia dla ${recipientName} zostały zapisane.` : ''}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center pt-2">
              {deliveryFormat === 'pdf' && (
                <button type="button" className="btn-primary gap-2" onClick={() => window.alert('Wersja demo — plik PDF zostałby pobrany.')}>
                  <Download size={18} /> Pobierz PDF
                </button>
              )}
              {deliveryFormat === 'email' && (
                <p className="text-sm text-volo-text bg-volo-accent-light rounded-xl px-4 py-3 border border-volo-border">
                  Wysłaliśmy voucher na <span className="font-semibold">{deliveryEmail || 'podany adres'}</span>.
                </p>
              )}
              {deliveryFormat === 'link' && (
                <button type="button" className="btn-primary gap-2" onClick={handleCopyLink}>
                  <Copy size={18} /> Skopiuj link do vouchera
                </button>
              )}
            </div>

            {linkToast && (
              <p className="text-sm font-medium text-volo-success" role="status">Link skopiowany!</p>
            )}

            <Link href="/account/gifts" className="btn-secondary inline-flex mx-auto">Moje podarunki</Link>
          </div>
        )}
      </div>
    </div>
  );
}
