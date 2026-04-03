import { mockBookings, type Booking } from '@/data/mock';
import { Calendar, Clock, Users } from 'lucide-react';

function formatPln(n: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPlDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(y, m - 1, d));
}

const todayStr = new Date().toISOString().split('T')[0];

function isUpcoming(b: Booking): boolean {
  return b.status !== 'completed' && b.status !== 'cancelled' && b.date >= todayStr;
}

function statusBadge(status: Booking['status']) {
  const map = {
    confirmed: { label: 'Potwierdzona', className: 'bg-volo-accent-light text-volo-success border-volo-border' },
    pending_confirmation: {
      label: 'Oczekuje',
      className: 'bg-volo-accent-light text-volo-accent border-volo-border',
    },
    completed: { label: 'Zrealizowana', className: 'bg-volo-bg text-volo-muted border-volo-border' },
    cancelled: { label: 'Anulowana', className: 'bg-volo-bg text-volo-error border-volo-border' },
  } as const;
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.className}`}
    >
      {s.label}
    </span>
  );
}

function BookingCard({ b }: { b: Booking }) {
  return (
    <article className="card overflow-hidden flex flex-col sm:flex-row">
      <div className="relative sm:w-44 lg:w-52 shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[140px]">
        <img src={b.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <h2 className="font-heading text-lg font-semibold text-volo-text leading-snug">{b.skuName}</h2>
          {statusBadge(b.status)}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-volo-muted mb-4">
          <li className="flex items-center gap-2">
            <Calendar size={16} className="text-volo-accent shrink-0" />
            {formatPlDate(b.date)}
          </li>
          <li className="flex items-center gap-2">
            <Clock size={16} className="text-volo-accent shrink-0" />
            {b.time}
          </li>
          <li className="flex items-center gap-2">
            <Users size={16} className="text-volo-accent shrink-0" />
            {b.guests} {b.guests === 1 ? 'osoba' : 'osób'}
          </li>
        </ul>
        <p className="mt-auto text-lg font-heading font-bold text-volo-text tabular-nums">
          {formatPln(b.totalPrice)}
        </p>
      </div>
    </article>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
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

export default function AccountBookingsPage() {
  const upcoming = mockBookings.filter(isUpcoming);
  const history = mockBookings.filter((b) => !isUpcoming(b));

  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <h1 className="font-heading text-3xl font-bold text-volo-text tracking-tight">Rezerwacje</h1>
        <p className="text-volo-muted mt-2 max-w-xl leading-relaxed">
          Nadchodzące loty i transfery oraz archiwum zrealizowanych rezerwacji.
        </p>
      </header>

      <Section
        title="Nadchodzące"
        subtitle="Potwierdzone terminy i oczekujące na akceptację operatora."
      >
        {upcoming.length === 0 ? (
          <p className="text-volo-muted text-sm py-8 text-center card border-dashed">Brak nadchodzących rezerwacji.</p>
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

      <Section title="Historia" subtitle="Zrealizowane i anulowane rezerwacje.">
        {history.length === 0 ? (
          <p className="text-volo-muted text-sm py-8 text-center card border-dashed">Historia jest pusta.</p>
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
