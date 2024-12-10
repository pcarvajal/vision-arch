'use client';

import { CustomNodeData } from '@/types';
import { Card, CardBody, Input } from '@nextui-org/react';
import {
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  Position,
  useReactFlow,
} from '@xyflow/react';
import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LeftRightHandle } from '../handles/LeftRightHandle';

type TitleDescriptionNodeData = {
  title: string;
  placeholder: string;
};

export const TitleNode = (
  props: NodeProps<Node<CustomNodeData<TitleDescriptionNodeData>>>,
) => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);
  const [label, setLabel] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('bg-gray-400');
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const { setNodes, updateNodeData } = useReactFlow();

  const {
    height: initialHeight,
    width: initialWidth,
    backgroundColor: initialBackgroundColor,
    label: initialLabel,
    color: textColor,
    nodeData: { title, placeholder },
  } = props.data;

  const onChangeTitle = (value: string) => {
    setLabel(value);
    updateNodeData(props.id, { label: value });
  };

  useEffect(() => {
    if (initialWidth) {
      setWidth(initialWidth);
    }
    if (initialHeight) {
      setHeight(initialHeight);
    }
  }, [initialWidth, initialHeight]);

  useEffect(() => {
    if (initialLabel) {
      setLabel(initialLabel);
    }
  }, [initialLabel]);

  useEffect(() => {
    if (initialBackgroundColor) {
      setBackgroundColor(initialBackgroundColor);
    }
  }, [initialBackgroundColor]);

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={width}
        minHeight={height}
      />
      <Card
        className={`h-full w-full`}
        style={{
          backgroundColor: backgroundColor,
          minHeight: height,
          minWidth: width,
        }}
      >
        <CardBody className={`flex flex-col items-center justify-center`}>
          <div className={`w-full text-center`} style={{ color: textColor }}>
            {!isLabelFocused && label && (
              <h4
                className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
                onClick={() => {
                  setIsLabelFocused(true);
                }}
              >
                {label}
              </h4>
            )}
          </div>
          <div className="w-full text-center">
            {(isLabelFocused || !label) && (
              <Input
                value={title}
                placeholder={placeholder}
                onValueChange={setLabel}
                onFocus={() => setIsLabelFocused(true)}
                onBlur={() => setIsLabelFocused(false)}
                onChange={(e) => onChangeTitle(e.target.value)}
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            <CircleX
              className={`mt-2 h-full cursor-pointer`}
              style={{ color: textColor }}
              onClick={() =>
                setNodes((nodes) =>
                  nodes.filter((node) => node.id !== props.id),
                )
              }
            />
          </div>
        </CardBody>
      </Card>
      <LeftRightHandle />
    </>
  );
};
