'use client';

import { useCustomNodeData } from '@/components/hooks/useCustomNode';
import { AreaNodeProps } from '@/types';
import { Card, CardHeader } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';

type AreaNodeData = Node<AreaNodeProps>;

export const AreaNode = (props: NodeProps<AreaNodeData>) => {
  const {
    nodeData,
    removeNode,
    color,
    borderColor,
    zIndex,
    height,
    setHeight,
    width,
    setWidth,
  } = useCustomNodeData<AreaNodeProps>(props);

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={80}
        minHeight={80}
        onResize={(e, size) => {
          setWidth(size.width);
          setHeight(size.height);
        }}
      />
      <Card
        className={`h-full w-full border-2 border-indigo-900 bg-indigo-400 opacity-50`}
        style={{
          width,
          height,
          minWidth: 80,
          minHeight: 80,
          borderColor: borderColor,
          backgroundColor: color,
          zIndex,
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          {nodeData.title && (
            <p className="p-1 text-left text-sm">{nodeData.title}</p>
          )}
          <X className="cursor-pointer" size={15} onClick={removeNode} />
        </CardHeader>
      </Card>
    </>
  );
};
