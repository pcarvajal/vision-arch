'use client';

import useFlowStore from '@/store/flow/flowStore';
import { ITextBlockNodeProps } from '@/types/reactflow';
import { Card, CardBody, Textarea } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

type TextBlockNodeData = Node<ITextBlockNodeProps>;

export const TextBlock = (props: NodeProps<TextBlockNodeData>) => {
  const { removeNode, updateNode } = useFlowStore((state) => state);

  const {
    height,
    width,
    data: { placeholder, textBlock },
    id,
  } = props;
  const [isTextBlockFocused, setIsTextBlockFocused] = useState(false);

  const onChangeTitle = (value: string) => {
    updateNode(id, { textBlock: value });
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
        <CardBody className="flex flex-col items-center justify-center">
          <div className="absolute right-0 top-0 p-2">
            <X
              className="cursor-pointer"
              size={15}
              onClick={() => removeNode(id)}
            />
          </div>
          <div className="w-full">
            {!isTextBlockFocused && textBlock && (
              <p
                className="text-left text-xs"
                onClick={() => {
                  setIsTextBlockFocused(true);
                }}
              >
                {textBlock}
              </p>
            )}
            {(isTextBlockFocused || !textBlock) && (
              <Textarea
                value={textBlock}
                placeholder={placeholder}
                onFocus={() => setIsTextBlockFocused(true)}
                onBlur={() => setIsTextBlockFocused(false)}
                onChange={(e) => onChangeTitle(e.target.value)}
                className="pt-2"
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
