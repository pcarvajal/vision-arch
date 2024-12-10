'use client';

import ThinkingLoader from '@/components/shared/ThinkingLoader';
import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { generateBlueprintsModel } from '@/actions/ai.actions';
import SaveArtifactModal from '@/components/modals/SaveArtifactModal';
import YearsSlider from '@/components/shared/YearsSlider';
import { blueprintsNodes } from '@/config/constants';
import useArtifactFlowStore from '@/store/artifactFlowStore';
import useFlowStore from '@/store/flowStore';
import useUserStore from '@/store/userStore';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CustomDefaultEdge } from '../CustomDefaultEdge';
import { Flow } from '../Flow';
import { ProviderNode } from '../ProviderNode';
import { ActorNode } from './nodes/ActorNode';
import { DefaultNode } from './nodes/DefaultNode';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  actorNode: ActorNode,
  systemNode: DefaultNode,
  processNode: DefaultNode,
  dataNode: DefaultNode,
  infrastructureNode: DefaultNode,
};

const edgeTypes = {
  customDefaultEdge: CustomDefaultEdge,
};

export default function BlueprintFlow() {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(2024);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFLowInstance] =
    useState<ReactFlowInstance | null>(null);

  const company = useUserStore((state) => state.company);
  const setArtifactFlow = useArtifactFlowStore(
    (state) => state.setArtifactFlow,
  );
  const deleteArtifactFlow = useArtifactFlowStore(
    (state) => state.deleteArtifactFlow,
  );
  const deleteFlow = useFlowStore((state) => state.deleteFlow);
  const setFlow = useFlowStore((state) => state.setFlow);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        type: 'customDefaultEdge',
      };
      setEdges([...edges, edge]);
    },
    [edges, setEdges],
  );

  const onSelectYear = async (year: number) => {
    setLoading(true);
    setYear(year);
    const companyId = company?.$id;
    if (!companyId) {
      setLoading(false);
      return toast.error('No se ha encontrado la empresa');
    }

    const result = await generateBlueprintsModel({
      companyId,
      year,
    });

    if (result?.message?.type === 'error') {
      setLoading(false);
      return toast.error(result.message.message);
    }

    const jsonResponse = JSON.parse(result);

    setNodes(jsonResponse.nodes);
    setEdges(jsonResponse.edges);

    setLoading(false);
  };

  useEffect(() => {
    const flow = reactFlowInstance?.toObject();
    if (flow) {
      deleteArtifactFlow();
      deleteFlow();
      setFlow({ year, type: 'blueprints' });
      setArtifactFlow({ data: flow });
    }
  }, [reactFlowInstance?.getEdges(), reactFlowInstance?.getNodes()]);

  return (
    <>
      <ThinkingLoader show={loading} />
      <Flow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onInit={setReactFLowInstance}
      >
        <Panel position="top-left" className="min-w-[300px] gap-4">
          <YearsSlider
            className="rounded-lg bg-black bg-opacity-45 p-4 text-white dark:bg-white dark:text-black"
            color="primary"
            defaultValue={2024}
            label="Proyección"
            minValue={2024}
            maxValue={2028}
            step={1}
            showSteps
            onChangeEnd={onSelectYear}
          />
        </Panel>
        <Panel position="top-right" className="flex gap-4">
          <ProviderNode nodes={blueprintsNodes} />
          <SaveArtifactModal />
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </Flow>
    </>
  );
}
