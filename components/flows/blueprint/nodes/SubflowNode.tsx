import { Card, CardBody } from '@nextui-org/react';
import { NodeResizer } from '@xyflow/react';

export const SubflowNode = () => {
  return (
    <div className="flex h-full max-w-full">
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
      />
      <Card className={`w-[200] grow border-2 border-red-600`}>
        <CardBody className="flex w-full flex-col">SubflowNode</CardBody>
      </Card>
    </div>
  );
};
