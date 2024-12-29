import { getCompanyAction } from '@/actions/company.actions';
import { CompanyEditView } from '@/components/views/(app)/company/edit';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compañia | Editar',
  description: 'Editar Compañia',
};

const EditCompanyPage = async ({ params }: { params: { id: string } }) => {
  return <CompanyEditView id={params.id} />;
};

export default EditCompanyPage;
