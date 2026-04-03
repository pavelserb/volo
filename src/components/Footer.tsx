import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-volo-text mt-20">
      <div className="container-wide section-padding py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-heading font-bold text-white">Volo</span>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Niezapomniane przeżycia w Krakowie — loty helikopterem, transfery VIP i więcej.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Usługi</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/krakow/helicopters" className="hover:text-white transition-colors duration-200">Loty helikopterem</Link></li>
              <li><Link href="/krakow/transfers" className="hover:text-white transition-colors duration-200">Transfery VIP</Link></li>
              <li><Link href="/corporate" className="hover:text-white transition-colors duration-200">Dla firm</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Pomoc</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li><Link href="/redeem" className="hover:text-white transition-colors duration-200">Aktywuj voucher</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors duration-200">Regulamin</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors duration-200">Polityka prywatności</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Kontakt</h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>info@volo.local (demo)</li>
              <li>+48 12 000 00 00 (demo)</li>
              <li>Kraków, Polska</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-white/30 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Volo. Prototyp — dane demonstracyjne.</span>
          <span>Projekt w fazie prototypowania</span>
        </div>
      </div>
    </footer>
  );
}
