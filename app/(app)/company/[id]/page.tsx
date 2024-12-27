import { getCompanyAction } from '@/actions/company.actions';
import { CompanyEditView } from '@/components/views/(app)/company/edit';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compañia | Editar',
  description: 'Editar Compañia',
};

const EditCompanyPage = async ({ params }: { params: { id: string } }) => {
  const result = await getCompanyAction(params.id);

  if (!result.data?.company) {
    return;
  }

  return <CompanyEditView company={result.data?.company} />;
};

export default EditCompanyPage;
