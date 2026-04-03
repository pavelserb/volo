'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n/context';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-volo-text mt-12 sm:mt-16 lg:mt-20 safe-bottom-pad">
      <div className="container-wide section-padding py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-heading font-bold text-white">Volo</span>
            <p className="mt-3 text-sm leading-relaxed text-white/60 break-words">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{t('footer.services')}</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/krakow/helicopters" className="hover:text-white transition-colors duration-200">{t('nav.helicopters')}</Link></li>
              <li><Link href="/krakow/transfers" className="hover:text-white transition-colors duration-200">{t('nav.transfers')}</Link></li>
              <li><Link href="/corporate" className="hover:text-white transition-colors duration-200">{t('nav.corporate')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{t('footer.help')}</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/redeem" className="hover:text-white transition-colors duration-200">{t('footer.redeem')}</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors duration-200">{t('footer.terms')}</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors duration-200">{t('footer.privacy')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{t('footer.contact')}</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>info@volo.local (demo)</li>
              <li>+48 12 000 00 00 (demo)</li>
              <li>{t('footer.location')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/30 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} {t('footer.copyright')}</span>
          <span>{t('footer.phase')}</span>
        </div>
      </div>
    </footer>
  );
}
