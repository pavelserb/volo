'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User, Globe, MapPin } from 'lucide-react';
import { useI18n } from '@/i18n/context';

export function Header() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-volo-surface/95 backdrop-blur-md border-b border-volo-border safe-top-header">
      <div className="container-wide section-padding">
        <div className="flex items-center justify-between min-h-16 h-16">
          <Link href="/" className="flex items-center gap-2 group min-w-0 shrink" onClick={close}>
            <span className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-volo-text group-hover:text-volo-accent transition-colors duration-200 truncate">
              Volo
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main">
            <Link href="/krakow/helicopters" className="btn-ghost text-sm whitespace-nowrap">
              {t('nav.helicopters')}
            </Link>
            <Link href="/krakow/transfers" className="btn-ghost text-sm whitespace-nowrap">
              {t('nav.transfers')}
            </Link>
            <Link href="/corporate" className="btn-ghost text-sm whitespace-nowrap">
              {t('nav.corporate')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-1 lg:gap-2 shrink-0">
            <button
              type="button"
              className="btn-ghost text-sm flex items-center gap-1.5 max-lg:px-2"
              title={t('nav.city')}
            >
              <MapPin size={16} className="shrink-0" />
              <span className="hidden lg:inline">{t('nav.cityName')}</span>
            </button>
            <button
              type="button"
              className="btn-ghost text-sm flex items-center gap-1.5 max-lg:px-2"
              onClick={() => setLocale(locale === 'pl' ? 'en' : 'pl')}
              title={t('nav.langTitle')}
            >
              <Globe size={16} className="shrink-0" />
              {locale.toUpperCase()}
            </button>
            <Link
              href="/login"
              className="btn-ghost text-sm flex items-center gap-1.5 min-w-0 max-w-[9rem] lg:max-w-none"
            >
              <User size={16} className="shrink-0" />
              <span className="truncate">{t('nav.account')}</span>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden min-h-11 min-w-11 inline-flex items-center justify-center rounded-xl text-volo-text"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={t('nav.menu')}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-volo-border bg-volo-surface max-h-[min(70vh,calc(100dvh-4rem))] overflow-y-auto overscroll-contain">
          <div className="section-padding py-4 flex flex-col gap-1 safe-bottom-pad">
            <Link
              href="/krakow/helicopters"
              className="btn-ghost text-base justify-start min-h-12 rounded-xl"
              onClick={close}
            >
              {t('nav.helicopters')}
            </Link>
            <Link
              href="/krakow/transfers"
              className="btn-ghost text-base justify-start min-h-12 rounded-xl"
              onClick={close}
            >
              {t('nav.transfers')}
            </Link>
            <Link
              href="/corporate"
              className="btn-ghost text-base justify-start min-h-12 rounded-xl"
              onClick={close}
            >
              {t('nav.corporate')}
            </Link>
            <hr className="border-volo-border my-2" />
            <div className="flex items-center gap-2 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-volo-muted shrink-0">
                {t('nav.city')}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-volo-text">
                <MapPin size={16} className="text-volo-accent shrink-0" />
                {t('nav.cityName')}
              </span>
            </div>
            <div className="flex items-center gap-2 py-2">
              <span className="text-xs font-medium uppercase tracking-wider text-volo-muted shrink-0">
                {t('nav.langTitle')}
              </span>
              <div className="flex rounded-xl border border-volo-border p-0.5 bg-volo-bg">
                <button
                  type="button"
                  onClick={() => setLocale('pl')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    locale === 'pl' ? 'bg-volo-accent text-white' : 'text-volo-muted'
                  }`}
                >
                  PL
                </button>
                <button
                  type="button"
                  onClick={() => setLocale('en')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    locale === 'en' ? 'bg-volo-accent text-white' : 'text-volo-muted'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
            <hr className="border-volo-border my-2" />
            <Link
              href="/login"
              className="btn-ghost text-base justify-start min-h-12 rounded-xl gap-2"
              onClick={close}
            >
              <User size={18} /> {t('nav.account')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
