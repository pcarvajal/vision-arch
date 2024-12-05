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
import useUserStore from '@/store/userStore';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { CustomDefaultEdge } from '../CustomDefaultEdge';
import { Flow } from '../Flow';
import { ActorNode } from './nodes/ActorNode';
import { DefaultNode } from './nodes/DefaultNode';

const initialNodes: Node[] = [
  /*   {
    id: '2',
    type: 'actorNode',
    position: { x: 250, y: 5 },
    data: {
      label: 'Persona',
      backgroundColor: 'bg-pink-600',
      textColor: 'text-white',
      type: 'actorsNode',
      placeholder: '...',
      width: 200,
      height: 100,
    },
  },
  {
    id: '3',
    type: 'systemNode',
    position: { x: 350, y: 5 },
    data: {
      label: 'Caracteristica 1',
      backgroundColor: 'bg-yellow-400',
      textColor: 'text-white',
      type: 'systemNode',
      placeholder: '...',
      width: 200,
      height: 100,
    },
  },
  {
    id: '4',
    type: 'processNode',
    position: { x: 450, y: 5 },
    data: {
      label: 'Caracteristica 1',
      backgroundColor: 'bg-gray-800',
      textColor: 'text-white',
      type: 'processNode',
      placeholder: '...',
      width: 200,
      height: 100,
    },
  },
  {
    id: '5',
    type: 'dataNode',
    position: { x: 550, y: 5 },
    data: {
      label: 'Caracteristica 1',
      backgroundColor: 'bg-indigo-500',
      textColor: 'text-white',
      type: 'dataNode',
      placeholder: '...',
      width: 200,
      height: 100,
    },
  },
  {
    id: '6',
    type: 'infrastructureNode',
    position: { x: 650, y: 5 },
    data: {
      label: 'Caracteristica 1',
      backgroundColor: 'bg-purple-900',
      textColor: 'text-white',
      type: 'infrastructureNode',
      placeholder: '...',
      width: 200,
      height: 100,
    },
  }, */
];
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
  const setArtifact = useUserStore((state) => state.setArtifactObject);
  const deleteArtifact = useUserStore((state) => state.deleteArtifactObject);

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

    console.log(jsonResponse);

    setNodes(jsonResponse.nodes);
    setEdges(jsonResponse.edges);

    setLoading(false);
  };

  useEffect(() => {
    const flow = reactFlowInstance?.toObject();
    if (flow) {
      deleteArtifact();
      setArtifact({ data: flow, year, type: 'blueprints' });
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
          <SaveArtifactModal />
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </Flow>
    </>
  );
}
