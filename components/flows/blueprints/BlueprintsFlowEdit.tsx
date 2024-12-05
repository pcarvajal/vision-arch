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
import { blueprintsNodes, goalsNodes } from '@/config/constants';
import { Button } from '@nextui-org/react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { SelectArtifact } from '../../shared/SelectArtifact';
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

interface BlueprintsFlowEditProps {
  items: {
    key: string;
    label: string;
  }[];
}

export default function BlueprintsFlowEdit({ items }: BlueprintsFlowEditProps) {
  const [loading, setLoading] = useState(false);
  const [selectArtifact, setSelectArtifact] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, OnEdgesChange] = useEdgesState(initialEdges);

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

  const onChangeArtifactValue = async (value: string) => {
    setSelectArtifact(value);
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
    setLoading(true);
    if (selectArtifact === '') {
      setLoading(false);
      return toast.error('Debe seleccionar un artefacto');
    }

    const result = await updateArtifactAction(
      selectArtifact,
      JSON.stringify({ data: { nodes, edges } }),
    );

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result.message);
    }

    setLoading(false);
    toast.success('Artefacto actualizado');
  };

  const onDeleteArtifact = async () => {
    console.log(selectArtifact);
    setLoading(true);
    if (selectArtifact === '') {
      setLoading(false);
      return toast.error('Debe seleccionar un artefacto');
    }

    const result = await deleteArtifactAction(selectArtifact);

    if (result?.type === 'error') {
      setLoading(false);
      return toast.error(result.message);
    }

    setNodes([]);
    setEdges([]);
    setSelectArtifact('');
    setLoading(false);
    toast.success('Artefacto eliminado');
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
          <ProviderNode nodes={blueprintsNodes} />
        </Panel>
        <Panel position="top-right" className="flex w-96 gap-4">
          <div className="flex w-full items-center space-x-4">
            <SelectArtifact
              items={items}
              label="Artefactos guardados"
              value={selectArtifact}
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
