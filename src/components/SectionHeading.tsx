interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {badge && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-volo-accent mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-section-heading">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base text-volo-muted max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
