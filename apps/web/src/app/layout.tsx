import type { Metadata } from 'next';
import { Bricolage_Grotesque, Public_Sans } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Public_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: { default: 'CORDIO Data Platform', template: '%s | CORDIO' },
  description: 'Research and conservation data from the Western Indian Ocean.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
