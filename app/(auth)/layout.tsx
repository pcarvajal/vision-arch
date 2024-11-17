import { AuthLayoutWrapper } from '@/components/views/(auth)/authLayout';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}
