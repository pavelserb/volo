'use client';

import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const progress = ((currentStep) / (steps.length - 1)) * 100;

  return (
    <div className="w-full min-w-0">
      <div className="relative h-1.5 bg-volo-border rounded-full overflow-hidden mb-4 sm:mb-6">
        <div
          className="absolute inset-y-0 left-0 bg-volo-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="flex sm:justify-between gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:overflow-visible snap-x snap-mandatory sm:snap-none">
        {steps.map((label, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 sm:gap-2 flex-1 min-w-[4.25rem] sm:min-w-0 snap-center"
            >
              <div
                className={`
                  w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-200
                  ${isCompleted
                    ? 'bg-volo-accent text-white'
                    : isCurrent
                      ? 'bg-volo-accent text-white ring-4 ring-volo-accent/20'
                      : 'bg-volo-bg border-2 border-volo-border text-volo-muted'
                  }
                `}
              >
                {isCompleted ? <Check size={16} /> : i + 1}
              </div>
              <span
                className={`text-[10px] leading-tight sm:text-xs text-center max-w-[5.5rem] sm:max-w-[7rem] line-clamp-2 sm:line-clamp-none ${
                  isCurrent ? 'font-semibold text-volo-text' : 'text-volo-muted'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
