import type { Metadata } from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { en } from '@/i18n/messages/en';
import './globals.css';

const heading = Outfit({ subsets: ['latin', 'latin-ext'], variable: '--font-heading', display: 'swap' });
const body = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-screen min-h-[100dvh] flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1 min-w-0 w-full overflow-x-clip">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
