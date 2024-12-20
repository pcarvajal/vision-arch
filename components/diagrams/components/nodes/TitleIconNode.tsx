'use client';

import { useCustomNodeData } from '@/components/hooks/useCustomNode';
import { TitleIconNodeProps } from '@/types';
import { Card, CardBody, Input } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { CircleX, PersonStanding } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LeftRightHandle } from '../handles/LeftRightHandle';

type VerticalNodeData = Node<TitleIconNodeProps>;

export const TitleIconNode = (props: NodeProps<VerticalNodeData>) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const {
    nodeData,
    setNodeData,
    removeNode,
    color,
    backgroundColor,
    height,
    width,
    setWidth,
    setHeight,
  } = useCustomNodeData<TitleIconNodeProps>(props);

  const onChangeLabel = (value: string) => {
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
        minWidth={100}
        minHeight={100}
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
          minWidth: 100,
          minHeight: 100,
          backgroundColor: backgroundColor,
        }}
      >
        <CardBody className={`flex flex-col items-center justify-center`}>
          <div className={`w-full text-center`} style={{ color: color }}>
            {!isTitleFocused && nodeData.title && (
              <h4
                className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
                onClick={() => {
                  setIsTitleFocused(true);
                }}
              >
                {nodeData.title}
              </h4>
            )}
          </div>
          <div className="w-full text-center" style={{ color: color }}>
            {(isTitleFocused || !nodeData.title) && (
              <Input
                value={nodeData.title}
                placeholder={nodeData.titlePlaceholder}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
                onChange={(e) => onChangeLabel(e.target.value)}
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            <PersonStanding size={60} style={{ color: color }} />
          </div>
          <div className="flex items-center justify-center">
            <CircleX
              className={`h-full cursor-pointer`}
              style={{ color: color }}
              onClick={removeNode}
            />
          </div>
        </CardBody>
      </Card>
      <LeftRightHandle />
    </>
  );
};
