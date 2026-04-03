import { mockGifts, type Gift } from '@/data/mock';
import { Gift as GiftIcon } from 'lucide-react';

function formatPlDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(y, m - 1, d));
}

function maskCode(code: string, received: boolean): string {
  if (!received) return code;
  const tail = code.slice(-4);
  return `••••••••${tail}`;
}

function statusBadge(status: Gift['status']) {
  const map = {
    pending_activation: {
      label: 'Oczekuje na aktywację',
      className: 'bg-volo-accent-light text-volo-accent border-volo-border',
    },
    activated: { label: 'Aktywowany', className: 'bg-volo-accent-light text-volo-success border-volo-border' },
    used: { label: 'Wykorzystany', className: 'bg-volo-bg text-volo-muted border-volo-border' },
    expired: { label: 'Wygasł', className: 'bg-volo-bg text-volo-error border-volo-border' },
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

function GiftCard({ g }: { g: Gift }) {
  const received = g.type === 'received';
  return (
    <article className="card overflow-hidden flex flex-col sm:flex-row">
      <div className="relative sm:w-44 lg:w-52 shrink-0 aspect-[16/10] sm:aspect-auto sm:min-h-[140px]">
        <img src={g.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
          <h2 className="font-heading text-lg font-semibold text-volo-text leading-snug">{g.skuName}</h2>
          {statusBadge(g.status)}
        </div>
        {g.type === 'bought' && g.recipientName && (
          <p className="text-sm text-volo-muted mb-1">
            Dla: <span className="font-medium text-volo-text">{g.recipientName}</span>
          </p>
        )}
        {g.type === 'received' && g.buyerName && (
          <p className="text-sm text-volo-muted mb-1">
            Od: <span className="font-medium text-volo-text">{g.buyerName}</span>
          </p>
        )}
        <p className="text-xs font-mono tracking-wide text-volo-text mt-3 mb-1">Kod</p>
        <p className="font-mono text-sm font-semibold text-volo-accent">{maskCode(g.code, received)}</p>
        <p className="text-xs text-volo-muted mt-4">
          Ważny do <span className="text-volo-text font-medium">{formatPlDate(g.expiryDate)}</span>
          {' · '}
          Zakup: {formatPlDate(g.purchaseDate)}
        </p>
      </div>
    </article>
  );
}

export default function AccountGiftsPage() {
  const bought = mockGifts.filter((g) => g.type === 'bought');
  const received = mockGifts.filter((g) => g.type === 'received');

  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <h1 className="font-heading text-3xl font-bold text-volo-text tracking-tight">Podarunki</h1>
        <p className="text-volo-muted mt-2 max-w-xl leading-relaxed">
          Vouchery kupione dla bliskich oraz te, które sam otrzymałeś.
        </p>
      </header>

      <section className="mb-14">
        <h2 className="font-heading text-xl font-semibold text-volo-text mb-4 flex items-center gap-2">
          <GiftIcon size={22} className="text-volo-accent" />
          Podarowane przeze mnie
        </h2>
        {bought.length === 0 ? (
          <p className="text-volo-muted text-sm py-8 text-center card border-dashed">Nie kupiłeś jeszcze voucherów.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {bought.map((g) => (
              <li key={g.id}>
                <GiftCard g={g} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-volo-text mb-4 flex items-center gap-2">
          <GiftIcon size={22} className="text-volo-accent" />
          Otrzymane
        </h2>
        {received.length === 0 ? (
          <p className="text-volo-muted text-sm py-8 text-center card border-dashed">Brak otrzymanych podarunków.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {received.map((g) => (
              <li key={g.id}>
                <GiftCard g={g} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
