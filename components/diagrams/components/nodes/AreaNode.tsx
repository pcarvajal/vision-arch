'use client';

import { CustomNodeData } from '@/types';
import { Card, CardHeader } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AreaNodeData {
  title: string;
}

export const AreaNode = (
  props: NodeProps<Node<CustomNodeData<AreaNodeData>>>,
) => {
  const { zIndex: initialzIndex } = props.data;
  const { id, type } = props;
  const { getNode, setNodes } = useReactFlow();
  const [zIndex, setZIndex] = useState(initialzIndex);

  const {
    label,
    width = 100,
    height = 100,
    color = '#6b7280',
    borderColor = '#18181b',
    color: textColor = '#f9fafb',
  } = props.data;

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={width}
        minHeight={height}
      />
      <Card
        className={`h-full w-full border-2 border-indigo-900 bg-indigo-400 opacity-50`}
        style={{
          minWidth: width,
          minHeight: height,
          borderColor,
          backgroundColor: color,
          zIndex,
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          {label && (
            <p className="p-1 text-left text-sm" style={{ color: textColor }}>
              {label}
            </p>
          )}
          <X
            className="cursor-pointer"
            size={15}
            onClick={() => {
              setNodes((nodes) => nodes.filter((node) => node.id !== props.id));
            }}
          />
        </CardHeader>
      </Card>
    </>
  );
};
