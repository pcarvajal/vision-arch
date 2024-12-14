'use client';

import { useCustomNodeData } from '@/components/hooks/useCustomNode';
import { TitleDescriptionNodeProps } from '@/types';
import { Card, CardBody, Input, Textarea } from '@nextui-org/react';
import {
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  Position,
  useReactFlow,
} from '@xyflow/react';
import { CircleX } from 'lucide-react';
import { useState } from 'react';

type TitleDescriptionNodeData = Node<TitleDescriptionNodeProps>;

export const TitleDescriptionNode = (
  props: NodeProps<TitleDescriptionNodeData>,
) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const {
    nodeData,
    setNodeData,
    removeNode,
    borderColor,
    height,
    width,
    setWidth,
    setHeight,
  } = useCustomNodeData<TitleDescriptionNodeProps>(props);

  const onChangeTitle = (value: string) => {
    setNodeData({ ...nodeData, title: value });
  };

  const onChangeDescription = (value: string) => {
    setNodeData({ ...nodeData, description: value });
  };

  return (
    <div
      className="flex h-full max-w-full"
      style={{
        minWidth: '210px',
        minHeight: '180px',
      }}
    >
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={210}
        minHeight={180}
        onResize={(e, size) => {
          setWidth(size.width);
          setHeight(size.height);
        }}
      />
      <Card
        isHoverable={true}
        className={`w-[210px] grow border-2 ${borderColor}`}
        style={{
          height,
          width,
          borderColor: borderColor,
        }}
      >
        <CardBody className="flex w-full flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex w-full text-center">
              {!isTitleFocused && nodeData.title && (
                <h4
                  className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
                  onClick={() => {
                    setIsTitleFocused(true);
                    setIsDescriptionFocused(false);
                  }}
                >
                  {nodeData.title}
                </h4>
              )}
              {(isTitleFocused || !nodeData.title) && (
                <Input
                  value={nodeData.title}
                  placeholder="Nueva característica"
                  onFocus={() => setIsTitleFocused(true)}
                  onBlur={() => setIsTitleFocused(false)}
                  onChange={(e) => onChangeTitle(e.target.value)}
                />
              )}
            </div>
            <div className="flex w-full text-center">
              {!isDescriptionFocused && nodeData.description && (
                <p
                  className="text-muted-foreground w-full cursor-text break-words text-sm text-zinc-500"
                  onClick={() => {
                    setIsDescriptionFocused(true);
                    setIsTitleFocused(false);
                  }}
                >
                  {nodeData.description}
                </p>
              )}
              {(isDescriptionFocused || !nodeData.description) && (
                <Textarea
                  value={nodeData.description}
                  placeholder="Descripción ..."
                  onFocus={() => setIsDescriptionFocused(true)}
                  onBlur={() => setIsDescriptionFocused(false)}
                  onChange={(e) => onChangeDescription(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="mt-auto flex justify-center">
            <CircleX
              className="mt-2 h-full cursor-pointer text-red-600"
              onClick={removeNode}
            />
          </div>
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
