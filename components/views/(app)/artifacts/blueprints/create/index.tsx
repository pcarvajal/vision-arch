import BlueprintFlow from '@/components/flows/blueprint/BlueprintFlow';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import { routes } from '@/config/routes';
import { Card, CardBody } from '@nextui-org/react';
import { Atom, Focus, HouseIcon } from 'lucide-react';

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
    name: 'Conceptos',
    link: routes.protected.artifacts.goals.create,
    icon: <Focus className="text-sm text-foreground-500" />,
  },
];

export const CreateBlueprintsView = () => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={breadcrumb} />

      <h3 className="text-xl font-semibold">Espacio de trabajo</h3>

      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full">
            <BlueprintFlow />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
