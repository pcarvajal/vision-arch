import { HomeView } from '@/components/views/(app)/index';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Vision Arch | Plataforma de Arquitectura Empresarial',
};

const HomePage = () => {
  return <HomeView />;
};

export default HomePage;
