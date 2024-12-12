'use client';

import { NoteNodeProps } from '@/types';
import { Textarea } from '@nextui-org/react';
import { Node, NodeProps, NodeResizer, useReactFlow } from '@xyflow/react';
import { X } from 'lucide-react';
import { useState } from 'react';

export const NoteNode = (props: NodeProps<Node<NoteNodeProps>>) => {
  const {
    width: initialWidth,
    height: initialHeight,
    nodeData: { text: initialText },
  } = props.data;

  const handleTextAreaChange = (value: string) => {
    setText(value);
  };

  const [text, setText] = useState(initialText);
  const [inputFocus, setInputFocus] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: initialWidth,
    height: initialHeight,
  });

  const { setNodes, updateNodeData, updateNode } = useReactFlow();

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
        minWidth={100}
        minHeight={100}
      />
      <div
        className="flex h-full w-full items-center justify-center bg-white p-1"
        style={{
          minWidth: 100,
          minHeight: 100,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
      >
        <div className="absolute -right-6 -top-6 cursor-pointer">
          <X
            onClick={() => {
              setNodes((nodes) => nodes.filter((node) => node.id !== props.id));
            }}
          />
        </div>
        <div className="flex h-full w-full p-4">
          {text && text?.length > 0 && !inputFocus ? (
            <p
              className="prose prose-sm h-full w-full rounded-lg p-3"
              onClick={() => setInputFocus(true)}
            >
              {text}
            </p>
          ) : (
            <Textarea
              value={text}
              onChange={(e) => handleTextAreaChange(e.target.value)}
              onBlur={() => setInputFocus(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};
