'use client';

import ArtifactFlow from '@/components/diagrams/ArtifactFlow';
import { SelectArtifact } from '@/components/diagrams/components/SelectArtifact';
import { SelectNodes } from '@/components/diagrams/components/SelectNodes';
import { goalsFlowTypes } from '@/components/diagrams/NodeFlowsTypes';
import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import { goalsArtifactConfig as config } from '@/config/constants';
import { routes } from '@/config/routes';
import { Card, CardBody } from '@nextui-org/react';
import { Atom, Goal, HouseIcon } from 'lucide-react';

const goalsBreadcrumb = [
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
    name: 'Objetivos',
    link: routes.protected.artifacts.goals.create,
    icon: <Goal className="text-sm text-foreground-500" />,
  },
];

export const EditGoalsView = () => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={goalsBreadcrumb} />
      <div className="flex flex-row justify-between space-x-2">
        <div>
          <h3 className="text-xl font-semibold">Espacio de trabajo</h3>
        </div>
        <div className="flex flex-row items-center gap-4">
          <SelectNodes presets={config.presets} />
          <SelectArtifact artifactName={config.name} />
          <SaveArtifactModal />
        </div>
      </div>
      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full">
            <ArtifactFlow
              slider={false}
              config={config}
              types={{
                nodes: goalsFlowTypes.nodeTypes,
                edges: goalsFlowTypes.edgeTypes,
              }}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
