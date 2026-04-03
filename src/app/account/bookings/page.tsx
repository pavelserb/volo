'use client';

import { mockBookings, type Booking } from '@/data/mock';
import { Calendar, Clock, Users } from 'lucide-react';
import { useI18n } from '@/i18n/context';

function isUpcoming(b: Booking): boolean {
  const todayStr = new Date().toISOString().split('T')[0];
  return b.status !== 'completed' && b.status !== 'cancelled' && b.date >= todayStr;
}

export default function AccountBookingsPage() {
  const { t, formatCurrency, formatDate } = useI18n();

  const statusBadge = (status: Booking['status']) => {
    const map = {
      confirmed: { label: t('account.statusConfirmed'), className: 'bg-volo-accent-light text-volo-success border-volo-border' },
      pending_confirmation: {
        label: t('account.statusPending'),
        className: 'bg-volo-accent-light text-volo-accent border-volo-border',
      },
      completed: { label: t('account.statusDone'), className: 'bg-volo-bg text-volo-muted border-volo-border' },
      cancelled: { label: t('account.statusCancelled'), className: 'bg-volo-bg text-volo-error border-volo-border' },
    } as const;
    const s = map[status];
    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.className}`}
      >
        {s.label}
      </span>
    );
  };

  const guestLine = (n: number) => (n === 1 ? t('account.guestOne') : t('account.guestMany', { n: String(n) }));

  function BookingCard({ b }: { b: Booking }) {
    return (
      <article className="card overflow-hidden flex flex-col sm:flex-row">
        <div className="relative sm:w-44 lg:w-52 shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[140px]">
          <img src={b.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3 min-w-0">
            <h2 className="font-heading text-lg font-semibold text-volo-text leading-snug break-words min-w-0 pr-2">
              {b.skuName}
            </h2>
            {statusBadge(b.status)}
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-volo-muted mb-4">
            <li className="flex items-center gap-2">
              <Calendar size={16} className="text-volo-accent shrink-0" />
              {formatDate(b.date)}
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-volo-accent shrink-0" />
              {b.time}
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} className="text-volo-accent shrink-0" />
              {guestLine(b.guests)}
            </li>
          </ul>
          <p className="mt-auto text-lg font-heading font-bold text-volo-text tabular-nums">
            {formatCurrency(b.totalPrice)}
          </p>
        </div>
      </article>
    );
  }

  function Section({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) {
    return (
      <section className="mb-12 last:mb-0">
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-volo-text">{title}</h2>
          {subtitle && <p className="text-volo-muted mt-1 text-sm sm:text-base">{subtitle}</p>}
        </div>
        {children}
      </section>
    );
  }

  const upcoming = mockBookings.filter(isUpcoming);
  const history = mockBookings.filter((b) => !isUpcoming(b));

  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <h1 className="font-heading text-3xl font-bold text-volo-text tracking-tight">{t('account.bookingsTitle')}</h1>
        <p className="text-volo-muted mt-2 max-w-xl leading-relaxed">{t('account.bookingsSub')}</p>
      </header>

      <Section title={t('account.upcoming')} subtitle={t('account.upcomingSub')}>
        {upcoming.length === 0 ? (
          <p className="text-volo-muted text-sm py-8 text-center card border-dashed">{t('account.emptyUpcoming')}</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {upcoming.map((b) => (
              <li key={b.id}>
                <BookingCard b={b} />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title={t('account.history')} subtitle={t('account.historySub')}>
        {history.length === 0 ? (
          <p className="text-volo-muted text-sm py-8 text-center card border-dashed">{t('account.emptyHistory')}</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {history.map((b) => (
              <li key={b.id}>
                <BookingCard b={b} />
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}
