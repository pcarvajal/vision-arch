import { getCompanyAction } from '@/actions/company.actions';
import { CompanyEditView } from '@/components/views/(app)/company/edit';

export default async function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const company = await getCompanyAction(params.id);
  return <CompanyEditView company={company} />;
}
