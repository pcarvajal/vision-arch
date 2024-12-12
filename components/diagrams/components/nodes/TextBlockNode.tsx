'use client';

import { CustomNodeData, TextBlockNodeProps } from '@/types';
import { Card, CardBody, CardHeader, Textarea } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const TextBlockNode = (props: NodeProps<Node<TextBlockNodeProps>>) => {
  const {
    width: initialWidth,
    height: initialHeight,
    nodeData: { placeholder, textBlock: initialTextBlock },
  } = props.data;

  const { setNodes, updateNodeData, updateNode } = useReactFlow();
  const [textBlock, setTextBlock] = useState(initialTextBlock);
  const [isTextBlockFocused, setIsTextBlockFocused] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const onChangeTitle = (value: string) => {
    setTextBlock(value);
    updateNodeData(props.id, { label: value });
  };

  useEffect(() => {
    if (initialTextBlock) {
      setTextBlock(initialTextBlock);
    }
  }, [initialTextBlock]);

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        onResize={(event, params) => {
          const { width, height, x, y } = params;
          setDimensions({ width, height });
          updateNodeData(props.id, { width, height });
          updateNode(props.id, { position: { x, y } });
        }}
        minWidth={80}
        minHeight={80}
      />
      <Card
        className={`h-full w-full`}
        style={{
          minWidth: 80,
          minHeight: 80,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <CardBody className="flex flex-col items-center justify-center">
          <div className="absolute right-0 top-0 p-2">
            <X
              className="cursor-pointer"
              size={15}
              onClick={() => {
                setNodes((nodes) =>
                  nodes.filter((node) => node.id !== props.id),
                );
              }}
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
                onValueChange={setTextBlock}
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
