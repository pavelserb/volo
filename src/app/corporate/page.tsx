'use client';

import { Building2, Crown, PartyPopper, Users } from 'lucide-react';
import { Hero } from '@/components/Hero';
import { SectionHeading } from '@/components/SectionHeading';
import { useI18n } from '@/i18n/context';

export default function CorporatePage() {
  const { t } = useI18n();

  const features = [
    { titleKey: 'corporate.f1Title' as const, textKey: 'corporate.f1Text' as const, icon: Users },
    { titleKey: 'corporate.f2Title' as const, textKey: 'corporate.f2Text' as const, icon: PartyPopper },
    { titleKey: 'corporate.f3Title' as const, textKey: 'corporate.f3Text' as const, icon: Crown },
  ] as const;

  return (
    <>
      <Hero
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop"
        alt={t('corporate.heroAlt')}
        overlay="center"
        minHeight="min-h-[400px] lg:min-h-[480px]"
      >
        <div className="text-center max-w-3xl mx-auto">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
            <Building2 size={14} />
            {t('corporate.b2b')}
          </p>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold tracking-tight text-white leading-tight">
            {t('corporate.title')}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl max-w-2xl mx-auto">
            {t('corporate.sub')}
          </p>
        </div>
      </Hero>

      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-surface border-b border-volo-border">
        <div className="container-wide mx-auto">
          <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
            {features.map(({ titleKey, textKey, icon: Icon }) => (
              <article key={titleKey} className="card-elevated p-6 sm:p-8 flex flex-col h-full">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-volo-accent-light text-volo-accent">
                  <Icon size={24} strokeWidth={2} />
                </span>
                <h2 className="font-heading text-xl font-bold text-volo-text mb-3">{t(titleKey)}</h2>
                <p className="text-sm sm:text-base text-volo-muted leading-relaxed flex-1">{t(textKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding py-16 sm:py-20 lg:py-24 bg-volo-bg">
        <div className="container-narrow mx-auto max-w-2xl">
          <SectionHeading
            title={t('corporate.formTitle')}
            subtitle={t('corporate.formSub')}
            align="center"
          />
          <form className="card-elevated p-6 sm:p-8 space-y-5 mt-10" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="company" className="text-sm font-medium text-volo-text">
                  {t('corporate.company')}
                </label>
                <input id="company" className="input" placeholder={t('corporate.companyPh')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="person" className="text-sm font-medium text-volo-text">
                  {t('corporate.contactPerson')}
                </label>
                <input id="person" className="input" placeholder={t('corporate.contactPh')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="cemail" className="text-sm font-medium text-volo-text">
                  {t('corporate.workEmail')}
                </label>
                <input id="cemail" type="email" className="input" placeholder={t('corporate.workEmailPh')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="cphone" className="text-sm font-medium text-volo-text">
                  {t('corporate.phone')}
                </label>
                <input id="cphone" type="tel" className="input" placeholder={t('corporate.phonePh')} />
              </div>
              <div className="space-y-2">
                <label htmlFor="etype" className="text-sm font-medium text-volo-text">
                  {t('corporate.eventType')}
                </label>
                <select id="etype" className="input">
                  <option>{t('corporate.eventTeam')}</option>
                  <option>{t('corporate.eventRewards')}</option>
                  <option>{t('corporate.eventVip')}</option>
                  <option>{t('corporate.eventOther')}</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="participants" className="text-sm font-medium text-volo-text">
                  {t('corporate.participants')}
                </label>
                <input id="participants" type="number" min={1} className="input" placeholder={t('corporate.participantsPh')} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="cmsg" className="text-sm font-medium text-volo-text">
                  {t('corporate.message')}
                </label>
                <textarea id="cmsg" className="input min-h-[120px] resize-y" placeholder={t('corporate.messagePh')} />
              </div>
            </div>
            <button type="button" className="btn-primary w-full sm:w-auto">
              {t('corporate.send')}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
