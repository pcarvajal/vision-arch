import ArtifactFlow from '@/components/diagrams/ArtifactFlow';
import { ArtifactToolbar } from '@/components/diagrams/components/ArtifactToolbar';
import { goalsFlowTypes } from '@/components/diagrams/NodeFlowsTypes';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import { goalsArtifactProps } from '@/config/constants';
import { routes } from '@/config/routes';
import { Card, CardBody } from '@nextui-org/react';
import { Atom, Goal, HouseIcon } from 'lucide-react';

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
    name: 'Objetivos',
    link: routes.protected.artifacts.goals.create,
    icon: <Goal className="text-sm text-foreground-500" />,
  },
];

export const CreateGoalsView = () => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={breadcrumb} />
      <div className="flex flex-row justify-between space-x-2">
        <h3 className="text-xl font-semibold">Espacio de trabajo</h3>
        <ArtifactToolbar
          saveArtifactModal={true}
          selectNodeItems={goalsArtifactProps.presetNodes}
        />
      </div>
      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full">
            <ArtifactFlow
              artifact={goalsArtifactProps}
              edgeTypes={goalsFlowTypes.edgeTypes}
              nodeTypes={goalsFlowTypes.nodeTypes}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
