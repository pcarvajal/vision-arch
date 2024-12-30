'use client';

import ArtifactFlow from '@/components/diagrams/ArtifactFlow';
import { SelectArtifactType } from '@/components/diagrams/components/SelectArtifactType';
import { SelectNodes } from '@/components/diagrams/components/SelectNodes';
import {
  guidelinesFlowTypes,
  policiesFlowTypes,
  principlesFlowTypes,
} from '@/components/diagrams/NodeFlowsTypes';
import Loader from '@/components/layout/Loader';
import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import PageBreadcrumb from '@/components/navigation/PageBreadcrum';
import {
  guidelinesArtifactConfig as guidelinesConfig,
  policiesArtifactConfig as policiesConfig,
  principlesArtifactConfig as principlesConfig,
} from '@/config/constants';
import { routes } from '@/config/routes';
import { IArtifactConfig, IFlowType } from '@/index';
import useFlowStore from '@/store/flow/flowStore';
import useUserStore from '@/store/user/userStore';
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

export const CreateCsvlodView = () => {
  const { params } = useFlowStore();
  const { loading, setLoading } = useUserStore();

  const [artifactSelected, setArtifactSelected] =
    useState<IArtifactConfig>(policiesConfig);

  const [flowTypes, setFLowtypes] = useState<IFlowType>(policiesFlowTypes);

  useEffect(() => {
    const updateArtifactAndFlowTypes = async () => {
      setLoading(true);
      try {
        switch (params?.type) {
          case 'policies':
            setArtifactSelected(policiesConfig);
            setFLowtypes(policiesFlowTypes);
            break;
          case 'principles':
            setArtifactSelected(principlesConfig);
            setFLowtypes(principlesFlowTypes);
            break;
          case 'guidelines':
            setArtifactSelected(guidelinesConfig);
            setFLowtypes(guidelinesFlowTypes);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    updateArtifactAndFlowTypes();
  }, [params]);

  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <Loader show={loading} />
      <PageBreadcrumb items={breadcrumb} />
      <div className="flex flex-row justify-between space-x-2">
        <h3 className="text-xl font-semibold">Espacio de trabajo</h3>
        <div className="flex flex-row items-center gap-4">
          <SelectArtifactType
            artifactTypes={[
              { key: 'policies', label: 'Políticas' },
              { key: 'principles', label: 'Principios' },
              { key: 'guidelines', label: 'Pautas' },
            ]}
            defaultSelected="policies"
          />
          <SelectNodes presets={artifactSelected.presets} />
          <SaveArtifactModal />
        </div>
      </div>
      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full">
            <ArtifactFlow
              config={artifactSelected}
              types={{
                nodes: flowTypes.nodeTypes,
                edges: flowTypes.edgeTypes,
              }}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
