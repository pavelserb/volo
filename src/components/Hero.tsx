import Image from 'next/image';

interface HeroProps {
  image: string;
  alt: string;
  overlay?: 'left' | 'center';
  minHeight?: string;
  children: React.ReactNode;
}

export function Hero({
  image,
  alt,
  overlay = 'left',
  minHeight = 'min-h-[480px] lg:min-h-[560px]',
  children,
}: HeroProps) {
  return (
    <section className={`relative ${minHeight} flex items-center overflow-hidden`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div
        className={
          overlay === 'center'
            ? 'hero-overlay-center'
            : 'hero-overlay'
        }
      />
      <div className="relative z-10 section-padding container-wide w-full">
        {children}
      </div>
    </section>
  );
}
