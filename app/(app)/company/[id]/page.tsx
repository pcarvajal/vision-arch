import { CompanyEditView } from '@/components/views/(app)/company/edit';

export default function EditCompanyPage({ params }: { params: { id: string } }) {
  return <CompanyEditView {...params} />;
}
