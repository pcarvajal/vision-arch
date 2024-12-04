'use client';

import {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  deleteArtifactAction,
  getArtifactAction,
  updateArtifactAction,
} from '@/actions/artifact.actions';
import Loader from '@/components/layout/Loader';
import DeleteArtifactModal from '@/components/modals/DeleteArtifactModal';
import { Button, select } from '@nextui-org/react';
import { set } from 'mongoose';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { SelectArtifact } from '../../shared/SelectArtifact';
import ThinkingLoader from '../../shared/ThinkingLoader';
import { Flow } from '../Flow';
import { DeleteButtonEdge } from './edges/DeleteButtonEdge';
import { DefaultNode } from './nodes/DefaultNode';
import NodeProviderSelect from './providers/GoalsProvider';
import GoalsProviderSelect from './providers/GoalsProvider';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const nodeTypes = {
  objetiveNode: DefaultNode,
  problemNode: DefaultNode,
  conceptNode: DefaultNode,
  featureNode: DefaultNode,
  basicNode: DefaultNode,
  nodeProviderSelect: NodeProviderSelect,
};

const edgeTypes = {
  deleteButtonEdge: DeleteButtonEdge,
};

interface GoalsFlowEditProps {
  items: {
    key: string;
    label: string;
  }[];
}

export default function GoalsFlowEdit({ items }: GoalsFlowEditProps) {
  const [loading, setLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = {
        ...connection,
        animated: true,
        id: `${edges.length + 1}`,
        type: 'deleteButtonEdge',
      };
      setEdges([...edges, edge]);
    },
    [edges, setEdges],
  );

  const onChangeArtifactValue = async (value: string) => {
    setSelectedGoal(value);
    setLoading(true);
    const artifact = await getArtifactAction(value);

    if (artifact?.type === 'error') {
      setLoading(false);
      return toast.error(artifact.message);
    }

    const data = JSON.parse(artifact.data);

    setNodes(data.data.nodes);
    setEdges(data.data.edges);

    toast.success('Objetivo cargado');
    setLoading(false);
  };

  const onUpdateArtifact = async () => {
    if (selectedGoal === '') {
      setLoading(false);
      return toast.error('Debe seleccionar un objetivo');
    }

    const result = await updateArtifactAction(
      selectedGoal,
      JSON.stringify({ data: { nodes, edges } }),
    );

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result.message);
    }

    setLoading(false);
    toast.success('Objetivo actualizado');
  };

  const onDeleteArtifact = async () => {
    console.log(selectedGoal);
    setLoading(true);
    if (selectedGoal === '') {
      setLoading(false);
      return toast.error('Debe seleccionar un objetivo');
    }

    const result = await deleteArtifactAction(selectedGoal);

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result.message);
    }

    setNodes([]);
    setEdges([]);
    setSelectedGoal('');
    setLoading(false);
    toast.success('Objetivo eliminado');
  };

  return (
    <>
      <Loader show={loading} />
      <Flow
        className="h-full w-full"
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={OnEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Panel position="top-left" className="flex w-96 gap-4">
          <GoalsProviderSelect />
        </Panel>
        <Panel position="top-right" className="flex w-96 gap-4">
          <div className="flex w-full items-center space-x-4">
            <SelectArtifact
              items={items}
              label="Objetivos guardados"
              value={selectedGoal}
              onValueChange={onChangeArtifactValue}
            />
            <Button color="success" onClick={onUpdateArtifact}>
              Actualizar
            </Button>
          </div>
        </Panel>
        <Controls />
        <Panel position="bottom-left" className="flex w-96 gap-4">
          <DeleteArtifactModal onDelete={onDeleteArtifact} />
        </Panel>
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </Flow>
    </>
  );
}
