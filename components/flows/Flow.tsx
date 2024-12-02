import {
  Connection,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
} from '@xyflow/react';

interface FlowProps {
  children?: React.ReactNode;
  className?: string;
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange<Edge>;
  onInit?: (reactFlowInstance: any) => void;
  onConnect: (connection: Connection) => void;
  nodeTypes: any;
  edgeTypes: any;
}

export const Flow = ({
  children,
  className,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onInit,
  onConnect,
  edgeTypes,
  nodeTypes,
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
    >
      {children}
    </ReactFlow>
  );
};
