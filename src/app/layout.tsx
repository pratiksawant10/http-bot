import './globals.css';
import { Providers } from '@/components/providers';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'HTTPBot', description: 'Postman-first workspace' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang='en' suppressHydrationWarning><body><Providers>{children}</Providers></body></html>;
}
