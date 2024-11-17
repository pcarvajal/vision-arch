import type { Metadata, NextPage } from 'next';
import { HomeView } from '@/components/views/(app)/index';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Plataforma de Arquitectura Empresarial',
};

const Home: NextPage = () => {
  return <HomeView />;
};

export default Home;
