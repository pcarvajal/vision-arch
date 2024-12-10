import { getArtifactsAction } from '@/actions/artifact.actions';
import BlueprintsFlowEdit from '@/components/diagrams/blueprints/BlueprintsFlowEdit';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import { routes } from '@/config/routes';
import { Artifact } from '@/types/types';
import { Card, CardBody } from '@nextui-org/react';
import { Atom, Goal, HouseIcon } from 'lucide-react';

const blueprintsBreadcrumb = [
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
    name: 'Editar',
    icon: <Atom className="text-sm text-foreground-500" />,
  },
  {
    name: 'Conceptos',
    link: routes.protected.artifacts.blueprints.create,
    icon: <Goal className="text-sm text-foreground-500" />,
  },
];

export const EditBlueprintsView = async () => {
  const blueprints: Artifact = await getArtifactsAction('blueprints');
  const selectItems = blueprints.map((goal: any) => ({
    key: goal.$id,
    label: goal.name,
  }));

  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={blueprintsBreadcrumb} />
      <h3 className="text-xl font-semibold">Espacio de trabajo</h3>
      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full">
            {/* ViewPort */}
            <BlueprintsFlowEdit items={selectItems} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
