import { getCompanyAction } from '@/actions/company.actions';
import { CompanyEditView } from '@/components/views/(app)/company/edit';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compañia | Editar',
  description: 'Vision Arch | Plataforma de Arquitectura Empresarial',
};

const EditCompanyPage = async ({ params }: { params: { id: string } }) => {
  const company = await getCompanyAction(params.id);
  return <CompanyEditView company={company} />;
};

export default EditCompanyPage;
