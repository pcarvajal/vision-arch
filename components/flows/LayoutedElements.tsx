import dagre from '@dagrejs/dagre';
import { Edge, Node, Position } from '@xyflow/react';

interface GetLayoutedElementsProps {
  nodes: Node[];
  edges: Edge[];
  direction: string;
  nodeWidth: number;
  nodeHeight: number;
}

export const getLayoutedElements = ({
  nodes,
  edges,
  direction,
  nodeWidth,
  nodeHeight,
}: GetLayoutedElementsProps) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === 'LR';

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal
      ? ('left' as Position)
      : ('top' as Position);
    node.sourcePosition = isHorizontal
      ? ('right' as Position)
      : ('bottom' as Position);

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};
