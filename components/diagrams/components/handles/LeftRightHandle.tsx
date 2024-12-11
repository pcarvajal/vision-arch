'use client';

import { Handle, Position } from '@xyflow/react';

export const LeftRightHandle = () => {
  return (
    <>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </>
  );
};
