import { Card, CardBody } from '@nextui-org/react';
import { NodeResizer } from '@xyflow/react';

export const SubflowNode = () => {
  const initialWidth = 200;
  const initialHeight = 100;

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
    </>
  );
};
