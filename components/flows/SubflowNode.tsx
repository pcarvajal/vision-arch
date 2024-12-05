import { Card } from '@nextui-org/react';
import { Handle, Node, NodeProps, NodeResizer, Position } from '@xyflow/react';
import { useEffect, useState } from 'react';

export interface Data extends Record<string, unknown> {
  width?: number;
  height?: number;
}

export const SubflowNode = (props: NodeProps<Node<Data>>) => {
  const [initialWidth, setInitialWidth] = useState(200);
  const [initialHeight, setInitialHeight] = useState(100);
  const { height, width, label } = props.data;

  useEffect(() => {
    if (width) {
      setInitialWidth(width);
    }
    if (height) {
      setInitialHeight(height);
    }
  }, [initialHeight, initialWidth]);

  return (
    <>
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={initialWidth}
        minHeight={initialHeight}
      />
      <Card
        className={`h-full border-2 border-purple-500 bg-zinc-100 opacity-80 min-h-[${initialHeight}px] w-full min-w-[${initialWidth}px]`}
      ></Card>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};
