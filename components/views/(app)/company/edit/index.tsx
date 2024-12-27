import CompanyForm from '@/components/forms/CompanyForm';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import PageTitle from '@/components/pages/PageTitle';
import { routes } from '@/config/routes';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Building2, HouseIcon } from 'lucide-react';
import { ICompany } from '@/types/appwrite';

const companyBreadcrumb = [
  {
    name: 'Inicio',
    link: routes.protected.index,
    icon: <HouseIcon className="text-sm text-foreground-500" />,
  },
  {
    name: 'Compañia',
    link: routes.protected.company,
    icon: <Building2 className="text-sm text-foreground-500" />,
  },
];

interface CompanyEditViewProps {
  company: ICompany;
}

export const CompanyEditView = ({ company }: CompanyEditViewProps) => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={companyBreadcrumb} />
      <PageTitle title="Editar | Compañia" />
      <div className="mx-auto">
        <Card className="flex max-w-screen-lg">
          <CardHeader className="flex flex-col items-start px-8 pt-10">
            <h4 className="text-large font-bold">Formulario de compañia</h4>
            <small className="text-default-500">
              Modifica los datos de tu compañia
            </small>
          </CardHeader>
          <CardBody>
            <CompanyForm initialValues={company} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
