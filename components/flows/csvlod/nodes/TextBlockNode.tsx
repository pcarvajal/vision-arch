'use client';

import { text } from 'stream/consumers';
import { Card, CardBody, Textarea } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { useEffect, useState } from 'react';

export interface Data extends Record<string, unknown> {
  label?: string;
  placeholder?: string;
  width?: number;
  height?: number;
}

export const TextBlockNode = (props: NodeProps<Node<Data>>) => {
  const {
    width: initialWidth = 100,
    height: initialHeight = 100,
    label,
    textBlock: initialTextBlock,
    placeholder,
  } = props.data;

  const { setNodes, updateNodeData, updateNode } = useReactFlow();
  const [textBlock, setTextBlock] = useState('sdsadsa');
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
      setTextBlock(initialTextBlock as string);
    }
  }, [initialTextBlock]);

  const onResize = () => {};

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
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
