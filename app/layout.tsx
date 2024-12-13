import '@/styles/globals.css';
import { fontSans } from '@/config/fonts';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Vision Arch',
  description: 'Plataforma de Arquitectura Empresarial',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx('font-sans antialiased', fontSans.className)}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
