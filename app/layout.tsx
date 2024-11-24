import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { fontSans } from '@/config/fonts';
import clsx from 'clsx';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Vision Arch',
  description: 'Plataforma de Arquitectura Empresarial',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx('font-sans antialiased', fontSans.className)}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
