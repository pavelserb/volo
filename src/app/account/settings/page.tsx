'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockUser } from '@/data/mock';
import { Bell, Globe, LogOut, Save } from 'lucide-react';

export default function AccountSettingsPage() {
  const router = useRouter();
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [phone, setPhone] = useState(mockUser.phone);
  const [lang, setLang] = useState<'pl' | 'en'>('pl');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3200);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Zapisano zmiany (wersja demo).');
  };

  const handleLogout = () => {
    window.alert('Wylogowano (wersja demo).');
    router.push('/');
  };

  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <h1 className="font-heading text-3xl font-bold text-volo-text tracking-tight">Ustawienia</h1>
        <p className="text-volo-muted mt-2 max-w-xl leading-relaxed">
          Dane kontaktowe i preferencje. W prototypie zmiany nie są zapisywane na serwerze.
        </p>
      </header>

      {toast && (
        <div
          className="mb-6 rounded-xl border border-volo-border bg-volo-accent-light px-4 py-3 text-sm font-medium text-volo-success"
          role="status"
        >
          {toast}
        </div>
      )}

      <form onSubmit={handleSave} className="card p-6 sm:p-8 space-y-8 max-w-2xl">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-volo-text">
            Imię i nazwisko
          </label>
          <input
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-volo-text">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-volo-text">
            Telefon
          </label>
          <input
            id="phone"
            type="tel"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
        </div>

        <fieldset className="space-y-3 border-t border-volo-border pt-8">
          <legend className="text-sm font-medium text-volo-text flex items-center gap-2 mb-1">
            <Globe size={16} className="text-volo-accent" />
            Język interfejsu
          </legend>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="lang"
                className="text-volo-accent focus:ring-volo-accent"
                checked={lang === 'pl'}
                onChange={() => setLang('pl')}
              />
              <span className="text-sm text-volo-text">Polski (PL)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="lang"
                className="text-volo-accent focus:ring-volo-accent"
                checked={lang === 'en'}
                onChange={() => setLang('en')}
              />
              <span className="text-sm text-volo-text">English (EN)</span>
            </label>
          </div>
          <p className="text-xs text-volo-muted flex items-start gap-2">
            <Bell size={14} className="shrink-0 mt-0.5" />
            Wybór języka jest zapamiętywany tylko w tej sesji przeglądarki (demo).
          </p>
        </fieldset>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button type="submit" className="btn-primary gap-2">
            <Save size={18} />
            Zapisz
          </button>
          <button type="button" className="btn-secondary gap-2 text-volo-error border-volo-error/30 hover:border-volo-error hover:text-volo-error" onClick={handleLogout}>
            <LogOut size={18} />
            Wyloguj
          </button>
        </div>
      </form>
    </div>
  );
}
