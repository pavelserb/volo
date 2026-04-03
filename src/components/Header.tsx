'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User, Globe, MapPin } from 'lucide-react';

export function Header() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<'PL' | 'EN'>('PL');

  return (
    <header className="sticky top-0 z-50 bg-volo-surface/95 backdrop-blur-md border-b border-volo-border">
      <div className="container-wide section-padding">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-heading font-bold tracking-tight text-volo-text group-hover:text-volo-accent transition-colors duration-200">
              Volo
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/krakow/helicopters" className="btn-ghost text-sm">Loty helikopterem</Link>
            <Link href="/krakow/transfers" className="btn-ghost text-sm">Transfery VIP</Link>
            <Link href="/corporate" className="btn-ghost text-sm">Dla firm</Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button className="btn-ghost text-sm flex items-center gap-1.5" title="Miasto">
              <MapPin size={16} /> Kraków
            </button>
            <button
              className="btn-ghost text-sm flex items-center gap-1.5"
              onClick={() => setLang(lang === 'PL' ? 'EN' : 'PL')}
              title="Zmień język"
            >
              <Globe size={16} /> {lang}
            </button>
            <Link href="/login" className="btn-ghost text-sm flex items-center gap-1.5">
              <User size={16} /> Moje konto
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-volo-text"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-volo-border bg-volo-surface">
          <div className="section-padding py-4 flex flex-col gap-2">
            <Link href="/krakow/helicopters" className="btn-ghost text-sm justify-start" onClick={() => setOpen(false)}>
              Loty helikopterem
            </Link>
            <Link href="/krakow/transfers" className="btn-ghost text-sm justify-start" onClick={() => setOpen(false)}>
              Transfery VIP
            </Link>
            <Link href="/corporate" className="btn-ghost text-sm justify-start" onClick={() => setOpen(false)}>
              Dla firm
            </Link>
            <hr className="border-volo-border" />
            <Link href="/login" className="btn-ghost text-sm justify-start" onClick={() => setOpen(false)}>
              <User size={16} /> Moje konto
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
