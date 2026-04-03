'use client';

interface SlotButtonProps {
  time: string;
  remaining: number;
  total: number;
  selected: boolean;
  onClick: () => void;
}

export function SlotButton({ time, remaining, total, selected, onClick }: SlotButtonProps) {
  const capacityPercent = (remaining / total) * 100;
  const isLow = remaining <= 1 && total > 1;

  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center gap-1 px-4 py-3 rounded-xl
        border-2 transition-all duration-200 text-center min-w-[90px]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volo-accent focus-visible:ring-offset-2
        ${selected
          ? 'border-volo-accent bg-volo-accent-light shadow-volo-md'
          : 'border-volo-border bg-volo-surface hover:border-volo-accent/50 hover:shadow-volo-sm'
        }
      `}
    >
      <span className={`text-base font-semibold ${selected ? 'text-volo-accent' : 'text-volo-text'}`}>
        {time}
      </span>

      {total > 1 && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="w-8 h-1 bg-volo-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                isLow ? 'bg-volo-error' : 'bg-volo-success'
              }`}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
          <span className={`text-xs ${isLow ? 'text-volo-error font-medium' : 'text-volo-muted'}`}>
            {remaining}/{total}
          </span>
        </div>
      )}
    </button>
  );
}
