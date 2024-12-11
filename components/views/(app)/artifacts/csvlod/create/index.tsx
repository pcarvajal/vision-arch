import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import { routes } from '@/config/routes';
import { Atom, HouseIcon } from 'lucide-react';

const breadcrumb = [
  {
    name: 'Inicio',
    link: routes.protected.index,
    icon: <HouseIcon className="text-sm text-foreground-500" />,
  },
  {
    name: 'Artefactos',
    icon: <Atom className="text-sm text-foreground-500" />,
  },
  {
    name: 'Crear',
    icon: <Atom className="text-sm text-foreground-500" />,
  },
  {
    name: 'CSVLOD',
    icon: <Atom className="text-sm text-foreground-500" />,
  },
];

export const CsvlodCreateView = () => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={breadcrumb} />
    </div>
  );
};
