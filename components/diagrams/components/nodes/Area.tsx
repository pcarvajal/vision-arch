'use client';

import { useCustomNodeData } from '@/components/hooks/useCustomNode';
import useFlowStore from '@/store/flowStore';
import { IAreaNodeProps } from '@/types/reactflow';
import { Card, CardHeader, Input } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

type AreaNodeData = Node<IAreaNodeProps>;

export const Area = (props: NodeProps<AreaNodeData>) => {
  const { removeNode, updateNode } = useFlowStore((state) => state);
  const {
    width,
    height,
    data: { title, backgroundColor, borderColor },
    zIndex,
  } = props;
  const [titleFocused, setTitleFocused] = useState(false);

  const handleValueChange = (value: string) => {
    updateNode(props.id, { title: value });
  };

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
        /*         onResize={(e, size) => {
          setWidth(size.width);
          setHeight(size.height);
        }} */
      />
      <Card
        className={`h-full w-full border-2 border-indigo-900 bg-indigo-400 opacity-50`}
        style={{
          width,
          height,
          minWidth: 80,
          minHeight: 80,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          zIndex,
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          {title && !titleFocused && (
            <p
              className="p-1 text-left text-sm"
              onClick={() => setTitleFocused(true)}
            >
              {title}
            </p>
          )}
          {!title && titleFocused && (
            <Input
              className="w-1/2"
              placeholder="Título"
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              onValueChange={(value) => handleValueChange(value)}
            />
          )}
          <X
            className="cursor-pointer"
            size={15}
            onClick={() => removeNode(props.id)}
          />
        </CardHeader>
      </Card>
    </>
  );
};
