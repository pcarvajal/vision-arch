import { OptionalObject } from '@/types';
import { Handle, NodeResizer, Position } from '@xyflow/react';
import React from 'react';

type HandleConfig = {
  type: 'source' | 'target';
  position: Position;
  id?: string;
};

type ResizerProps = {
  minWidth: number;
  minHeight: number;
  lineStyle: React.CSSProperties;
};

type BaseNodeProps = {
  handles?: HandleConfig[];
  className?: string;
  resizer?: OptionalObject<ResizerProps>;
  children?: React.ReactNode;
};

const BaseNode: React.FC<BaseNodeProps> = ({
  handles = [
    { type: 'target', position: Position.Left },
    { type: 'source', position: Position.Right },
  ],
  className = '',
  resizer,
  children,
}) => {
  return (
    <div className={`${className}`}>
      {/* Resizer */}
      {resizer && <NodeResizer {...resizer} />}
      {/* Custom content */}
      {children && children}
      {/* Dynamic handles */}
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          className="h-2 w-2 bg-white"
        />
      ))}
    </div>
  );
};

export default BaseNode;
