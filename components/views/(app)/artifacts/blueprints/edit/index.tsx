'use client';

import {
  getArtifactAction,
  getArtifactsAction,
} from '@/actions/artifact.actions';
import ArtifactFlow from '@/components/diagrams/ArtifactFlow';
import { ArtifactToolbar } from '@/components/diagrams/components/ArtifactToolbar';
import { blueprintsFlowTypes } from '@/components/diagrams/NodeFlowsTypes';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import { blueprintsArtifactProps } from '@/config/constants';
import { routes } from '@/config/routes';
import { Card, CardBody } from '@nextui-org/react';
import { Atom, Goal, HouseIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    name: 'Metas',
    link: routes.protected.artifacts.goals.create,
    icon: <Goal className="text-sm text-foreground-500" />,
  },
];

export const EditBlueprintsView = () => {
  const [items, setItems] = useState([]);
  const [artifactsProps, setArtifactsProps] = useState(blueprintsArtifactProps);

  const handleArtifactSelect = async (item: string) => {
    const blueprints = await getArtifactAction(item);
    const artifact = JSON.parse(blueprints.data);

    setArtifactsProps({
      ...artifactsProps,
      id: blueprints.$id,
      initialFlow: {
        nodes: artifact.data.nodes,
        edges: artifact.data.edges,
        viewport: artifact.data.viewport,
      },
    });
  };

  useEffect(() => {
    async function getArtifacts() {
      const blueprints = await getArtifactsAction('blueprints');
      setItems(
        blueprints.map((blueprint: any) => ({
          key: blueprint.$id,
          label: blueprint.name,
        })),
      );
    }
    getArtifacts();
  }, []);

  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={blueprintsBreadcrumb} />
      <div className="flex flex-row justify-between space-x-2">
        <h3 className="text-xl font-semibold">Espacio de trabajo</h3>
        <ArtifactToolbar
          saveArtifactModal={true}
          selectNodeItems={blueprintsArtifactProps.presetNodes}
          companyArtifacts={{
            items: items,
            onValueChange: handleArtifactSelect,
          }}
        />
      </div>
      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full">
            <ArtifactFlow
              yearSlider={false}
              artifact={artifactsProps}
              edgeTypes={blueprintsFlowTypes.edgeTypes}
              nodeTypes={blueprintsFlowTypes.nodeTypes}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
