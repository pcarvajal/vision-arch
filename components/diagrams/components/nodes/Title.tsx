'use client';

import { useCustomNodeData } from '@/components/hooks/useCustomNode';
import { ITitleNodeProps } from '@/types/reactflow';
import { Card, CardBody, Input } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { LeftRightHandle } from '../handles/LeftRightHandle';

type TitleNodeData = Node<ITitleNodeProps>;

export const Title = (props: NodeProps<TitleNodeData>) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const { removeNode, height, width, updateNodeData, id, data } =
    useCustomNodeData<ITitleNodeProps>(props);
  const { placeholder, title, backgroundColor, color } = data;

  const onChangeTitle = (value: string) => {
    updateNodeData(id, { title: value });
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
        /*         onResize={(e, size) => {
          setWidth(size.width);
          setHeight(size.height);
        }} */
      />
      <Card
        className={`h-full w-full`}
        style={{
          height,
          width,
          backgroundColor: backgroundColor,
          minHeight: 100,
          minWidth: 100,
        }}
      >
        <CardBody className={`flex flex-col items-center justify-center`}>
          <div className={`w-full text-center`} style={{ color: color }}>
            {!isTitleFocused && title && (
              <h4
                className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
                onClick={() => {
                  setIsTitleFocused(true);
                }}
              >
                {title}
              </h4>
            )}
          </div>
          <div className="w-full text-center">
            {(isTitleFocused || !title) && (
              <Input
                value={title}
                placeholder={placeholder}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
                onChange={(e) => onChangeTitle(e.target.value)}
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            <CircleX
              className={`mt-2 h-full cursor-pointer`}
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
