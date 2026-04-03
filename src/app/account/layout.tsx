'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  Gift,
  MessageSquareText,
  Settings2,
} from 'lucide-react';
import { mockUser } from '@/data/mock';
import { useI18n } from '@/i18n/context';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useI18n();

  const navItems = [
    { href: '/account/bookings', label: t('account.navBookings'), icon: CalendarDays },
    { href: '/account/gifts', label: t('account.navGifts'), icon: Gift },
    { href: '/account/reviews', label: t('account.navReviews'), icon: MessageSquareText },
    { href: '/account/settings', label: t('account.navSettings'), icon: Settings2 },
  ] as const;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-volo-bg">
      <div className="section-padding py-6 sm:py-10 lg:py-12">
        <div className="container-wide mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          <nav
            className="lg:hidden flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin snap-x snap-mandatory"
            aria-label={t('account.sections')}
          >
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`snap-start shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-volo-accent text-white shadow-md'
                      : 'bg-volo-surface border border-volo-border text-volo-muted hover:text-volo-text'
                  }`}
                >
                  <Icon size={16} strokeWidth={2} className="shrink-0 opacity-90" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div className="card p-5 border-volo-border">
                <p className="text-xs font-medium uppercase tracking-wider text-volo-muted mb-1">
                  {t('account.accountLabel')}
                </p>
                <p className="font-heading text-lg font-semibold text-volo-text leading-tight">
                  {mockUser.name}
                </p>
                <p className="text-sm text-volo-muted mt-1 truncate">{mockUser.email}</p>
              </div>
              <nav className="flex flex-col gap-1" aria-label={t('account.sections')}>
                {navItems.map(({ href, label, icon: Icon }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-volo-accent-light text-volo-accent border border-volo-accent/25'
                          : 'text-volo-muted hover:bg-volo-surface hover:text-volo-text border border-transparent'
                      }`}
                    >
                      <Icon size={18} strokeWidth={2} className="shrink-0" />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1 lg:pt-1">
            <div className="lg:hidden mb-6 flex items-center gap-3 rounded-2xl border border-volo-border bg-volo-surface px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-volo-accent-light text-volo-accent font-heading font-bold text-sm">
                {mockUser.name
                  .split(' ')
                  .map((p) => p[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="font-heading font-semibold text-volo-text truncate">{mockUser.name}</p>
                <p className="text-xs text-volo-muted truncate">{mockUser.email}</p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
