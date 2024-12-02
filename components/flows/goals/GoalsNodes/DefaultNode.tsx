'use client';

import { GoalsNodeTypes } from '@/types';
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
import { useEffect, useState } from 'react';

export interface Data extends Record<string, unknown> {
  title?: string;
  description?: string;
  type: GoalsNodeTypes;
  borderColor?: string;
}

export const DefaultNode = (props: NodeProps<Node<Data>>) => {
  const { setNodes, updateNodeData } = useReactFlow();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const {
    title: initialTitle,
    description: initialDescription,
    type = 'basicNode',
    borderColor = 'border-gray-600',
  } = props.data;

  useEffect(() => {
    if (initialTitle) {
      setTitle(initialTitle);
    }
    if (initialDescription) {
      setDescription(initialDescription);
    }
  }, [initialTitle, initialDescription]);

  const onChangeTitle = (value: string) => {
    setTitle(value);
    updateNodeData(props.id, { title: value });
  };

  const onChangeDescription = (value: string) => {
    setDescription(value);
    updateNodeData(props.id, { description: value });
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
      />
      <Card
        isHoverable={true}
        className={`w-[210px] grow border-2 ${borderColor}`}
      >
        <CardBody className="flex w-full flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex w-full text-center">
              {!isTitleFocused && title && (
                <h4
                  className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
                  onClick={() => {
                    setIsTitleFocused(true);
                    setIsDescriptionFocused(false);
                  }}
                >
                  {title}
                </h4>
              )}
              {(isTitleFocused || !title) && (
                <Input
                  value={title}
                  placeholder="Nueva característica"
                  onValueChange={setTitle}
                  onFocus={() => setIsTitleFocused(true)}
                  onBlur={() => setIsTitleFocused(false)}
                  onChange={(e) => onChangeTitle(e.target.value)}
                />
              )}
            </div>
            <div className="flex w-full text-center">
              {!isDescriptionFocused && description && (
                <p
                  className="text-muted-foreground w-full cursor-text break-words text-sm text-zinc-500"
                  onClick={() => {
                    setIsDescriptionFocused(true);
                    setIsTitleFocused(false);
                  }}
                >
                  {description}
                </p>
              )}
              {(isDescriptionFocused || !description) && (
                <Textarea
                  value={description}
                  placeholder="Descripción ..."
                  onValueChange={setDescription}
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
