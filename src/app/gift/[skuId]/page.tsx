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
import { localizeSku } from '@/data/sku-locale';
import { StepIndicator } from '@/components/StepIndicator';
import { useI18n } from '@/i18n/context';

type DeliveryFormat = 'pdf' | 'email' | 'link';

export default function GiftPurchasePage() {
  const params = useParams();
  const skuId = typeof params.skuId === 'string' ? params.skuId : '';
  const { locale, t, formatNumber } = useI18n();
  const rawSku = useMemo(() => getSkuById(skuId), [skuId]);
  const sku = useMemo(
    () => (rawSku ? localizeSku(rawSku, locale) : null),
    [rawSku, locale],
  );

  const stepLabels = useMemo(() => t('giftFlow.steps').split('|'), [t]);

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
        <h1 className="font-heading text-2xl font-semibold text-volo-text mb-3">{t('giftFlow.notFound')}</h1>
        <p className="text-volo-muted mb-8 max-w-md mx-auto">{t('giftFlow.notFoundBody')}</p>
        <Link href="/" className="btn-primary">
          {t('sku.home')}
        </Link>
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

  const deliveryOptions = useMemo(
    () =>
      [
        { id: 'pdf' as const, titleKey: 'giftFlow.pdfTitle' as const, descKey: 'giftFlow.pdfDesc' as const, icon: FileDown },
        { id: 'email' as const, titleKey: 'giftFlow.emailTitle' as const, descKey: 'giftFlow.emailDesc' as const, icon: Mail },
        { id: 'link' as const, titleKey: 'giftFlow.linkTitle' as const, descKey: 'giftFlow.linkDesc' as const, icon: Link2 },
      ] as const,
    [],
  );

  const consentGift = (
    <span className="text-sm text-volo-text leading-relaxed">
      {t('booking.consentLead')}
      <Link href="/legal/terms" className="text-volo-accent underline-offset-2 hover:underline">
        {t('booking.terms')}
      </Link>
      {t('booking.consentBetween')}
      <Link href="/legal/privacy" className="text-volo-accent underline-offset-2 hover:underline">
        {t('booking.privacy')}
      </Link>
      {t('booking.consentEnd')}
    </span>
  );

  return (
    <div className="section-padding py-10 sm:py-14 lg:py-16">
      <div className="container-narrow mx-auto max-w-2xl">
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-volo-accent-light text-volo-accent">
            <Gift size={24} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-volo-accent mb-1">
              {t('giftFlow.badge')}
            </p>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-volo-text leading-tight">
              {sku.name}
            </h1>
            <p className="mt-2 text-sm text-volo-muted leading-relaxed">{sku.description}</p>
          </div>
        </div>

        <div className="mb-10">
          <StepIndicator steps={stepLabels} currentStep={step} />
        </div>

        {step === 0 && (
          <div className="card-elevated p-6 sm:p-8 space-y-6">
            <h2 className="font-heading text-xl font-semibold text-volo-text">{t('giftFlow.step0Title')}</h2>
            <div className="space-y-2">
              <label htmlFor="recipient" className="text-sm font-medium text-volo-text">
                {t('giftFlow.recipient')}
              </label>
              <input
                id="recipient"
                className="input"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder={t('giftFlow.recipientPlaceholder')}
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="msg" className="text-sm font-medium text-volo-text">
                {t('giftFlow.message')}
              </label>
              <textarea
                id="msg"
                className="input min-h-[120px] resize-y"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('giftFlow.messagePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="deldate" className="text-sm font-medium text-volo-text">
                {t('giftFlow.deliveryDate')}
              </label>
              <input
                id="deldate"
                type="date"
                className="input"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
              <p className="text-xs text-volo-muted">{t('giftFlow.deliveryHint')}</p>
            </div>
            <button
              type="button"
              className="btn-primary w-full sm:w-auto"
              disabled={!canProceed0}
              onClick={() => setStep(1)}
            >
              {t('booking.next')}
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="card-elevated p-6 sm:p-8 space-y-6">
            <h2 className="font-heading text-xl font-semibold text-volo-text">{t('giftFlow.step1Title')}</h2>
            <p className="text-sm text-volo-muted leading-relaxed">{t('giftFlow.step1Sub')}</p>
            <div className="grid gap-4">
              {deliveryOptions.map(({ id, titleKey, descKey, icon: Icon }) => (
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
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      deliveryFormat === id ? 'bg-volo-accent text-white' : 'bg-volo-bg text-volo-accent'
                    }`}
                  >
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <span>
                    <span className="font-heading font-semibold text-volo-text block">{t(titleKey)}</span>
                    <span className="text-sm text-volo-muted mt-1 block">{t(descKey)}</span>
                  </span>
                </button>
              ))}
            </div>
            {deliveryFormat === 'email' && (
              <div className="space-y-2 pt-2">
                <label htmlFor="em" className="text-sm font-medium text-volo-text">
                  {t('giftFlow.recipientEmail')}
                </label>
                <input
                  id="em"
                  type="email"
                  className="input"
                  value={deliveryEmail}
                  onChange={(e) => setDeliveryEmail(e.target.value)}
                  placeholder="jan@example.com"
                  autoComplete="email"
                />
              </div>
            )}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
              <button type="button" className="btn-secondary w-full sm:w-auto" onClick={() => setStep(0)}>
                {t('giftFlow.back')}
              </button>
              <button
                type="button"
                className="btn-primary w-full sm:w-auto"
                disabled={!canProceed1}
                onClick={() => setStep(2)}
              >
                {t('booking.next')}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card-elevated p-6 sm:p-8 space-y-6">
            <h2 className="font-heading text-xl font-semibold text-volo-text">{t('giftFlow.step2Title')}</h2>
            <div className="rounded-2xl border border-volo-border bg-volo-bg p-5 flex justify-between items-baseline gap-4">
              <span className="text-sm font-medium text-volo-muted">{t('giftFlow.toPay')}</span>
              <span className="text-2xl font-heading font-bold text-volo-text tabular-nums">
                {formatNumber(price)} PLN
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-wide text-volo-muted flex items-center gap-2">
                <Lock size={14} className="text-volo-accent" /> {t('giftFlow.cardDemo')}
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
              {consentGift}
            </label>

            <div className="flex items-center gap-2 text-xs text-volo-muted border-t border-volo-border pt-4">
              <ShieldCheck size={14} className="text-volo-success" /> {t('giftFlow.encrypted')}
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between pt-2">
              <button type="button" className="btn-secondary w-full sm:w-auto" onClick={() => setStep(1)}>
                {t('giftFlow.back')}
              </button>
              <button type="button" className="btn-primary w-full sm:w-auto" disabled={!canPay} onClick={handlePay}>
                {t('giftFlow.pay', { amount: formatNumber(price) })}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card-elevated p-6 sm:p-10 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-volo-accent-light text-4xl">
              🎁
            </div>
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 text-sm font-medium text-volo-accent">
                <PartyPopper size={18} /> {t('giftFlow.doneBadge')}
              </p>
              <h2 className="font-heading text-2xl font-bold text-volo-text">{t('giftFlow.doneTitle')}</h2>
              <p className="text-volo-muted max-w-md mx-auto leading-relaxed">
                {t('giftFlow.doneBody')}{' '}
                {recipientName ? t('giftFlow.wishesFor', { name: recipientName }) : ''}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center pt-2">
              {deliveryFormat === 'pdf' && (
                <button
                  type="button"
                  className="btn-primary gap-2"
                  onClick={() => window.alert(t('giftFlow.demoPdfAlert'))}
                >
                  <Download size={18} /> {t('giftFlow.downloadPdf')}
                </button>
              )}
              {deliveryFormat === 'email' && (
                <p className="text-sm text-volo-text bg-volo-accent-light rounded-xl px-4 py-3 border border-volo-border">
                  {t('giftFlow.sentTo', {
                    email: deliveryEmail || t('giftFlow.emailUnknown'),
                  })}
                </p>
              )}
              {deliveryFormat === 'link' && (
                <button type="button" className="btn-primary gap-2" onClick={handleCopyLink}>
                  <Copy size={18} /> {t('giftFlow.copyLink')}
                </button>
              )}
            </div>

            {linkToast && (
              <p className="text-sm font-medium text-volo-success" role="status">
                {t('giftFlow.copied')}
              </p>
            )}

            <Link href="/account/gifts" className="btn-secondary inline-flex mx-auto">
              {t('giftFlow.myGifts')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
