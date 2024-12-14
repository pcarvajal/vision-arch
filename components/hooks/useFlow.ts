import { yearRange } from '@/config/constants';
import { ArtifactProps, ArtifactType } from '@/types';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  useViewport,
} from '@xyflow/react';
import { useCallback, useEffect, useState } from 'react';

export const useFlow = (artifact: ArtifactProps) => {
  const { initialFlow, type } = artifact;

  const [reactFlowInstance, setReactFLowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [artifactSelected, setArtifactSelected] = useState<ArtifactType>(type);
  const [year, setYear] = useState<number>(yearRange.default);
  const viewport = useViewport();

  const [nodes, setNodes] = useNodesState(initialFlow?.nodes || []);
  const [edges, setEdges] = useEdgesState(initialFlow?.edges || []);
  viewport.x = initialFlow?.viewport?.x || 0;
  viewport.y = initialFlow?.viewport?.y || 0;

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, animated: true, type: 'deleteEdge' };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  useEffect(() => {
    setNodes(initialFlow?.nodes || []);
    setEdges(initialFlow?.edges || []);
    viewport.x = initialFlow?.viewport?.x || 0;
    viewport.y = initialFlow?.viewport?.y || 0;
  }, [artifact]);

  return {
    type,
    artifactSelected,
    setArtifactSelected,
    year,
    setYear,
    viewport,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    reactFlowInstance,
    setReactFLowInstance,
    setNodes,
    setEdges,
  };
};
