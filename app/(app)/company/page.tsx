import { getUserPreferencesAction } from '@/actions/user.actions';
import CompanyView from '@/components/views/(app)/company';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compañia | Crear',
  description: 'Información de la compañia',
};

export default async function CompanyPage() {
  const preferences = await getUserPreferencesAction();
  return <CompanyView preferences={preferences} />;
}
