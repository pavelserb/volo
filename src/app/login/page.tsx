'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail } from 'lucide-react';

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={20} height={20} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [linkSent, setLinkSent] = useState(false);

  const handleGoogle = () => {
    router.push('/account/bookings');
  };

  const handleMagicLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLinkSent(true);
  };

  return (
    <div className="section-padding py-14 sm:py-20 lg:py-24">
      <div className="container-narrow mx-auto max-w-md">
        <h1 className="font-heading text-3xl font-bold text-volo-text text-center mb-2">
          Zaloguj się
        </h1>
        <p className="text-center text-volo-muted text-sm mb-10 leading-relaxed">
          Jedno konto — rezerwacje, vouchery i ustawienia w jednym miejscu.
        </p>

        <div className="card p-6 sm:p-8 space-y-6">
          <button type="button" className="btn-secondary w-full gap-2 border-volo-border" onClick={handleGoogle}>
            <GoogleMark />
            Kontynuuj z Google
          </button>

          <div className="relative flex items-center gap-4 py-1">
            <span className="h-px flex-1 bg-volo-border" aria-hidden />
            <span className="text-xs font-medium uppercase tracking-wider text-volo-muted shrink-0">lub</span>
            <span className="h-px flex-1 bg-volo-border" aria-hidden />
          </div>

          {!linkSent ? (
            <form onSubmit={handleMagicLink} className="space-y-4">
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
                  placeholder="twoj@email.pl"
                  autoComplete="email"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full gap-2">
                <Mail size={18} />
                Wyślij link do logowania
              </button>
            </form>
          ) : (
            <div
              className="rounded-xl border border-volo-accent/30 bg-volo-accent-light px-4 py-4 text-sm text-volo-text leading-relaxed"
              role="status"
            >
              Link wysłany na <span className="font-semibold">{email}</span>! Sprawdź swoją skrzynkę.
            </div>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-volo-muted leading-relaxed max-w-sm mx-auto">
          Nie masz konta? Utworzymy je automatycznie przy pierwszej rezerwacji.
        </p>

        <p className="mt-6 text-center">
          <Link href="/" className="btn-ghost text-sm">
            Wróć na stronę główną
          </Link>
        </p>
      </div>
    </div>
  );
}
