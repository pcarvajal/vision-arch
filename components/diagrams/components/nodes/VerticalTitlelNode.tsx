'use client';

import { useCustomNodeData } from '@/components/hooks/useCustomNode';
import { VerticalTitleNodeProps } from '@/types';
import { Card, CardBody, Input } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

type VerticalNodeData = Node<VerticalTitleNodeProps>;

export const VerticalTitleNode = (props: NodeProps<VerticalNodeData>) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const {
    nodeData,
    setNodeData,
    removeNode,
    height,
    width,
    setWidth,
    setHeight,
  } = useCustomNodeData<VerticalTitleNodeProps>(props);

  const onChangeTitle = (value: string) => {
    setNodeData({ ...nodeData, title: value });
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
        onResize={(e, size) => {
          setWidth(size.width);
          setHeight(size.height);
        }}
      />
      <Card
        className={`h-full w-full`}
        style={{
          height,
          width,
          minWidth: 80,
          minHeight: 80,
        }}
      >
        <CardBody>
          <div className="absolute right-0 top-0 p-2">
            <X className="cursor-pointer" size={15} onClick={removeNode} />
          </div>
          <div className="flex h-full w-full items-center justify-center">
            {!isTitleFocused && nodeData.title && (
              <h2
                className="-rotate-90 whitespace-nowrap text-center"
                onClick={() => {
                  setIsTitleFocused(true);
                }}
              >
                {nodeData.title}
              </h2>
            )}
            {(isTitleFocused || !nodeData.title) && (
              <Input
                value={nodeData.title}
                placeholder={nodeData.placeholder}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
                onChange={(e) => onChangeTitle(e.target.value)}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
