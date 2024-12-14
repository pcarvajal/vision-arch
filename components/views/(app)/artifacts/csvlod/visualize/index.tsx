'use client';

import {
  getArtifactAction,
  getArtifactsAction,
} from '@/actions/artifact.actions';
import ArtifactFlow from '@/components/diagrams/ArtifactFlow';
import { ArtifactToolbar } from '@/components/diagrams/components/ArtifactToolbar';
import {
  guidelinesFlowTypes,
  policiesFlowTypes,
  principlesFlowTypes,
} from '@/components/diagrams/NodeFlowsTypes';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import {
  csvlodArtifactsSelector,
  guidelinesArtifactProps,
  policiesArtifactProps,
  principlesArtifactProps,
} from '@/config/constants';
import { routes } from '@/config/routes';
import { FlowType } from '@/types';
import { Card, CardBody } from '@nextui-org/react';
import { Atom, Goal, HouseIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    link: routes.protected.artifacts.goals.create,
    icon: <Goal className="text-sm text-foreground-500" />,
  },
];

export const VisualizeCsvlodView = () => {
  const [items, setItems] = useState([]);
  const [artifactSelected, setArtifactSelected] = useState(
    policiesArtifactProps,
  );

  const [flowTypes, setFLowtypes] = useState<FlowType>(policiesFlowTypes);

  const handleArtifactSelect = (artifact: string) => {
    switch (artifact) {
      case 'policies':
        setArtifactSelected(policiesArtifactProps);
        setFLowtypes(policiesFlowTypes);
        break;
      case 'principles':
        setArtifactSelected(principlesArtifactProps);
        setFLowtypes(principlesFlowTypes);
        break;
      case 'guidelines':
        setArtifactSelected(guidelinesArtifactProps);
        setFLowtypes(guidelinesFlowTypes);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    async function getArtifacts() {
      const artifacts = await getArtifactsAction(artifactSelected.type);
      setItems(
        artifacts.map((artifact: any) => ({
          key: artifact.$id,
          label: artifact.name,
        })),
      );
    }
    getArtifacts();
  }, [artifactSelected]);

  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <PageBreadcrumb items={breadcrumb} />
      <div className="flex flex-row justify-between space-x-2">
        <h3 className="flex w-full text-xl font-semibold">
          Espacio de trabajo
        </h3>
        <ArtifactToolbar
          className="flex w-full flex-row items-center justify-end gap-2"
          saveArtifactModal={true}
          selectNodeItems={artifactSelected.presetNodes}
          artifactSelect={
            csvlodArtifactsSelector && {
              defaultItem: artifactSelected.type,
              items: csvlodArtifactsSelector,
              onArtifactSelect: handleArtifactSelect,
            }
          }
        />
      </div>
      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full">
            <ArtifactFlow
              visualize={true}
              yearSlider={true}
              artifact={artifactSelected}
              edgeTypes={flowTypes.edgeTypes}
              nodeTypes={flowTypes.nodeTypes}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
