import { getUserPreferencesAction } from '@/actions/user.actions';
import CompanyView from '@/components/views/(app)/company';

export default async function CompanyPage() {
  const preferences = await getUserPreferencesAction();
  return <CompanyView preferences={preferences} />;
}
