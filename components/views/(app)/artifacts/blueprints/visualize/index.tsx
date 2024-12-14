import ArtifactFlow from '@/components/diagrams/ArtifactFlow';
import { ArtifactToolbar } from '@/components/diagrams/components/ArtifactToolbar';
import { blueprintsFlowTypes } from '@/components/diagrams/NodeFlowsTypes';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import { blueprintsArtifactProps } from '@/config/constants';
import { routes } from '@/config/routes';
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
    name: 'Visualizar',
    icon: <Atom className="text-sm text-foreground-500" />,
  },
  {
    name: 'Conceptos',
    link: routes.protected.artifacts.blueprints.create,
    icon: <Goal className="text-sm text-foreground-500" />,
  },
];

export const VisualizeBlueprintsView = async () => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={blueprintsBreadcrumb} />
      <h3 className="text-xl font-semibold">Espacio de trabajo</h3>
      <ArtifactToolbar />
      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full gap-4">
            <ArtifactFlow
              yearSlider={true}
              artifact={blueprintsArtifactProps}
              visualize={true}
              edgeTypes={blueprintsFlowTypes.edgeTypes}
              nodeTypes={blueprintsFlowTypes.nodeTypes}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
