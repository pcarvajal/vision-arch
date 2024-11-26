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

interface Data extends Record<string, unknown> {
  title?: string;
}

const ConceptNode = (props: NodeProps<Node<Data, 'conceptNode'>>) => {
  const { setNodes } = useReactFlow();
  const [title, setTitle] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const { title: initialTitle } = props.data;
  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
  }, [initialTitle]);

  return (
    <div className="flex h-full">
      <NodeResizer
        lineStyle={{
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'GrayText',
          opacity: 0.1,
        }}
        minWidth={100}
        minHeight={50}
      />
      <Card isHoverable={true} className="w-full border-2 border-purple-600">
        <CardBody className="flex w-full flex-col">
          <div className="flex flex-col gap-2">
            <div className="w-full text-center">
              {!isTitleFocused && title && (
                <h4
                  className="w-full cursor-text scroll-m-20 break-words text-xl font-semibold tracking-tight"
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
                  placeholder="Nuevo concepto"
                  onValueChange={setTitle}
                  onFocus={() => setIsTitleFocused(true)}
                  onBlur={() => setIsTitleFocused(false)}
                />
              )}
            </div>
          </div>
          <div className="mt-auto flex justify-center">
            {' '}
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
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default ConceptNode;
