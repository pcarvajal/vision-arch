import {
  Connection,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
} from '@xyflow/react';
import { CSSProperties } from 'react';

interface FlowProps {
  children?: React.ReactNode;
  className?: string;
  nodes: Node[];
  edges: Edge[];
  snapToGrid?: boolean;
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange<Edge>;
  onInit?: (reactFlowInstance: any) => void;
  onConnect?: (connection: Connection) => void;
  nodeTypes: any;
  edgeTypes: any;
  styles?: CSSProperties;
  elevateNodesOnSelect?: boolean;
}

export const Flow = ({
  children,
  className,
  nodes,
  edges,
  snapToGrid = false,
  onNodesChange,
  onEdgesChange,
  onInit,
  onConnect,
  edgeTypes,
  nodeTypes,
  elevateNodesOnSelect = true,
}: FlowProps) => {
  return (
    <ReactFlow
      className={className}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      snapToGrid
      elevateNodesOnSelect={elevateNodesOnSelect}
    >
      {children}
    </ReactFlow>
  );
};
