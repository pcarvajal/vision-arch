'use client';

import { BlueprintNodeTypes } from '@/types';
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

export interface Data extends Record<string, unknown> {
  title?: string;
  titlePlaceholder?: string;
  type?: BlueprintNodeTypes;
  backgroundColor?: string;
  textColor?: string;
}

export const defaultNode = (props: NodeProps<Node<Data>>) => {
  const [title, setTitle] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const { setNodes, updateNodeData } = useReactFlow();

  const onChangeTitle = (value: string) => {
    setTitle(value);
    updateNodeData(props.id, { title: value });
  };

  const {
    backgroundColor,
    titlePlaceholder,
    title: initialTitle,
    textColor,
  } = props.data;

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
  }, [initialTitle]);

  return (
    <div
      className="flex h-full max-w-full"
      style={{
        minWidth: '210px',
        minHeight: '100px',
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
        minHeight={100}
      />
      <Card isHoverable={true} className={`w-[210px] grow border-2`}>
        <CardBody className={`flex w-full flex-col ${backgroundColor}`}>
          <div className="flex flex-col gap-2">
            <div className="flex w-full text-center">
              {!isTitleFocused && title && (
                <h4
                  className={`w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight ${textColor}`}
                  onClick={() => {
                    setIsTitleFocused(true);
                  }}
                >
                  {title}
                </h4>
              )}
              {(isTitleFocused || !title) && (
                <Input
                  value={title}
                  placeholder={titlePlaceholder ?? 'Titulo'}
                  onValueChange={setTitle}
                  onFocus={() => setIsTitleFocused(true)}
                  onBlur={() => setIsTitleFocused(false)}
                  onChange={(e) => onChangeTitle(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="mt-auto flex justify-center">
            <CircleX
              className={`mt-2 h-full cursor-pointer ${textColor}`}
              onClick={() =>
                setNodes((nodes) =>
                  nodes.filter((node) => node.id !== props.id),
                )
              }
            />
          </div>
        </CardBody>
      </Card>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
