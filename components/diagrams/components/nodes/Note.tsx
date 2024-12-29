'use client';

import useFlowStore from '@/store/flow/flowStore';
import { INoteNodeProps } from '@/types/reactflow';
import { Textarea } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

type NoteNodeData = Node<INoteNodeProps>;

export const Note = (props: NodeProps<NoteNodeData>) => {
  const { nodes, removeNode, updateNode } = useFlowStore((state) => state);
  const [inputFocus, setInputFocus] = useState(true);
  const {
    height,
    width,
    data: { title },
    id,
  } = props;

  const handleTextAreaChange = (value: string) => {
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
        minWidth={100}
        minHeight={100}
        /*         onResize={(e, size) => {
          setWidth(size.width);
          setHeight(size.height);
        }} */
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
          <X onClick={() => removeNode(id)} />
        </div>
        <div className="flex h-full w-full p-4">
          {title && title?.length > 0 && !inputFocus ? (
            <p
              className="prose prose-sm h-full w-full rounded-lg p-3"
              onClick={() => setInputFocus(true)}
            >
              {title}
            </p>
          ) : (
            <Textarea
              value={title}
              onChange={(e) => handleTextAreaChange(e.target.value)}
              onBlur={() => setInputFocus(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};
