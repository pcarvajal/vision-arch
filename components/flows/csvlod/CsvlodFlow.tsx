'use client';

import '@xyflow/react/dist/style.css';
import { generateCsvlodModel } from '@/actions/ai.actions';
import Loader from '@/components/layout/Loader';
import { ConfirmModal } from '@/components/modals/ConfirmModal';
import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import YearsSlider from '@/components/shared/YearsSlider';
import {
  csvlodArtifactsSelectorItems,
  csvlodGuidelinesNodes,
  csvlodPoliciesNodes,
  csvlodPrinciplesNodes,
  yearRange,
} from '@/config/constants';
import { CsvlodArtifactsEnum } from '@/config/enum';
import useUserStore from '@/store/userStore';
import { ArtifactObject, CustomNode } from '@/types/types';
import { Card, CardBody } from '@nextui-org/react';
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { set } from 'zod';
import { CustomDefaultEdge } from '../CustomDefaultEdge';
import { Flow } from '../Flow';
import { ProviderSchemaNode } from '../ProviderSchemaNode';
import CsvlodArtifactSelector from './CsvlodArtifactSelector';
import { AreaNode } from './nodes/AreaNode';
import { TextBlockNode } from './nodes/TextBlockNode';
import { TitleAndItemsNode } from './nodes/TitleAndItemsNode';
import { VerticalLabelNode } from './nodes/VerticalLabelNode';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  // Policies Nodes
  policyTypeAreaNode: AreaNode,
  policyTypeLabelNode: VerticalLabelNode,
  policyAreaNode: AreaNode,
  policyTextBlockNode: TextBlockNode,
  policyDescriptionAreaNode: AreaNode,
  policyDescriptionTextBlockNode: TextBlockNode,
  // Principles Nodes
  principleTitleAndItemsNode: TitleAndItemsNode,
  // Guidelines Nodes
  standardAreaNode: AreaNode,
  guidelineAreaNode: AreaNode,
  standardTextBlockNode: TextBlockNode,
  guidelineTextBlockNode: TextBlockNode,
};

const edgeTypes = {
  customDefaultEdge: CustomDefaultEdge,
};

export const CsvlodFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFLowInstance] =
    useState<ReactFlowInstance | null>(null);

  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(yearRange.default);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [artifactSelected, setArtifactSelected] = useState<string | null>(null);
  const [pendingArtifact, setPendingArtifact] = useState<string | null>(null);
  const [nodesForArtifact, setNodesForArtifact] = useState<CustomNode[] | null>(
    null,
  );

  const company = useUserStore((state) => state.company);
  const artifactObject = useUserStore((state) => state.artifactObject);
  const setArtifact = useUserStore((state) => state.setArtifactObject);
  const deleteArtifact = useUserStore((state) => state.deleteArtifactObject);
  const updateArtifact = useUserStore((state) => state.updateArtifactObject);

  const handleArtifactSelect = useCallback(
    (item: string) => {
      switch (item) {
        case CsvlodArtifactsEnum.PRINCIPLES:
          setNodesForArtifact(csvlodPrinciplesNodes);
          modifyArtifactStore({
            details: { name: 'Principios', category: 'Consideraciones' },
          });
          break;
        case CsvlodArtifactsEnum.POLICIES:
          setNodesForArtifact(csvlodPoliciesNodes);
          modifyArtifactStore({
            details: { name: 'Políticas', category: 'Consideraciones' },
          });
          break;
        case CsvlodArtifactsEnum.GUIDELINES:
          setNodesForArtifact(csvlodGuidelinesNodes);
          modifyArtifactStore({
            details: { name: 'Pautas', category: 'Estandards' },
          });
          break;
        default:
          setNodesForArtifact(null);
          modifyArtifactStore({
            details: undefined,
          });
          break;
      }
    },
    [artifactSelected],
  );

  const handleOnArtifactChange = (item: string) => {
    const nodesQuantity = nodes.length;
    if (nodesQuantity > 0) {
      setPendingArtifact(item);
      setShowConfirmModal(true);
    } else {
      setArtifactSelected(item);
      handleArtifactSelect(item);
    }
  };

  const handleConfirmFromModal = () => {
    setNodes([]);
    setEdges([]);
    setArtifactSelected(pendingArtifact!);
    setPendingArtifact(null);
    setShowConfirmModal(false);
  };

  const handleCancelFromModal = () => {
    setPendingArtifact(null);
    setShowConfirmModal(false);
  };

  const handleYearChange = async (yearParam: number) => {
    setLoading(true);
    setYear(yearParam);
    const companyId = company?.$id;

    if (!companyId) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }

    console.log('companyId', companyId);
    console.log('year', yearParam);
    console.log('artifactSelected', artifactSelected);

    const result = await generateCsvlodModel({
      companyId,
      year,
      type: artifactSelected!,
    });

    if (result?.message?.type === 'error') {
      setLoading(false);
      return toast.error(result.message.message);
    }

    const jsonResponse = JSON.parse(result);

    console.log('jsonResponse', jsonResponse);

    setNodes(jsonResponse.nodes);
    setEdges([]);

    setLoading(false);
  };

  const modifyArtifactStore = (data: Partial<ArtifactObject>) => {
    if (artifactObject) {
      const updatedArtifact = {
        ...artifactObject,
        ...data,
      };
      updateArtifact(updatedArtifact);
    } else {
      deleteArtifact();
      setArtifact({ data: null, year: 2024, type: 'csvlod', ...data });
    }
  };

  useEffect(() => {
    deleteArtifact();
  }, []);

  return (
    <>
      <h3 className="text-xl font-semibold">
        Espacio de trabajo {artifactObject?.details?.name || ''}
      </h3>

      <div className="h-[600px] w-full">
        <Card className="h-full w-full">
          <CardBody className="h-full w-full">
            <Loader show={loading} />
            <Flow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={OnEdgesChange}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              snapToGrid={true}
              elevateNodesOnSelect={false}
              onInit={setReactFLowInstance}
            >
              <Panel position="top-left" className="min-w-[300px] gap-4">
                <YearsSlider
                  className="rounded-lg bg-black bg-opacity-45 p-4 text-white dark:bg-white dark:text-black"
                  color="primary"
                  label="Proyección"
                  minValue={yearRange.min}
                  maxValue={yearRange.max}
                  defaultValue={yearRange.default}
                  step={1}
                  showSteps
                  onChangeEnd={handleYearChange}
                />
              </Panel>
              <Panel position="top-right" className="flex gap-4">
                <CsvlodArtifactSelector
                  items={csvlodArtifactsSelectorItems}
                  onArtifactSelect={handleOnArtifactChange}
                />
                {nodesForArtifact && (
                  <ProviderSchemaNode nodes={nodesForArtifact} />
                )}
                <SaveArtifactModal />
              </Panel>
              <Controls />
              <MiniMap />
              <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
              <ConfirmModal
                onConfirm={handleConfirmFromModal}
                message="Si cambias de artefacto, perderas todos tus cambios en el artefacto actual si no has guardado. ¿Deseas continuar?"
                title="Advertencia"
                isOpen={showConfirmModal}
                onCancel={() => handleCancelFromModal()}
              />
            </Flow>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
