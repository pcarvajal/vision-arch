'use client';

import { useCustomNodeData } from '@/components/hooks/useCustomNode';
import { NoteNodeProps } from '@/types';
import { Textarea } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

type NoteNodeData = Node<NoteNodeProps>;

export const NoteNode = (props: NodeProps<NoteNodeData>) => {
  const {
    nodeData,
    setNodeData,
    removeNode,
    height,
    width,
    setWidth,
    setHeight,
  } = useCustomNodeData<NoteNodeProps>(props);

  const handleTextAreaChange = (value: string) => {
    setNodeData({ ...nodeData, title: value });
  };

  const [inputFocus, setInputFocus] = useState(true);

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
      <div
        className="flex h-full w-full items-center justify-center bg-white p-1"
        style={{
          height,
          width,
          minWidth: 100,
          minHeight: 100,
        }}
      >
        <div className="absolute -right-6 -top-6 cursor-pointer">
          <X onClick={removeNode} />
        </div>
        <div className="flex h-full w-full p-4">
          {nodeData.title && nodeData.title?.length > 0 && !inputFocus ? (
            <p
              className="prose prose-sm h-full w-full rounded-lg p-3"
              onClick={() => setInputFocus(true)}
            >
              {nodeData.title}
            </p>
          ) : (
            <Textarea
              value={nodeData.title}
              onChange={(e) => handleTextAreaChange(e.target.value)}
              onBlur={() => setInputFocus(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};
