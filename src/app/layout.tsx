import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const heading = Outfit({ subsets: ['latin', 'latin-ext'], variable: '--font-heading', display: 'swap' });
const body = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: 'Volo — Twoje niezapomniane przeżycia',
  description: 'Loty helikopterem, transfery VIP, ekskursje — znajdź i zarezerwuj wyjątkowe doświadczenia w Krakowie.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
