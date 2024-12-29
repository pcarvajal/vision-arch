'use client';

import { useCustomNodeData } from '@/components/hooks/useCustomNode';
import useFlowStore from '@/store/flowStore';
import { IVerticalTitleNodeProps } from '@/types/reactflow';
import { Card, CardBody, Input } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

type VerticalNodeData = Node<IVerticalTitleNodeProps>;

export const TitleVertical = (props: NodeProps<VerticalNodeData>) => {
  const { removeNode, updateNode } = useFlowStore((state) => state);
  const {
    height,
    width,
    data: { placeholder, title },
    id,
  } = props;

  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const onChangeTitle = (value: string) => {
    updateNode(id, { title: value });
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
            <X
              className="cursor-pointer"
              size={15}
              onClick={() => removeNode(id)}
            />
          </div>
          <div className="flex h-full w-full items-center justify-center">
            {!isTitleFocused && title && (
              <h2
                className="-rotate-90 whitespace-nowrap text-center"
                onClick={() => {
                  setIsTitleFocused(true);
                }}
              >
                {title}
              </h2>
            )}
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
        </CardBody>
      </Card>
    </>
  );
};
