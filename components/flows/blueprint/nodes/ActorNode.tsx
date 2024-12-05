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
import { CircleX, PersonStanding } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface Data extends Record<string, unknown> {
  type: BlueprintNodeTypes;
  label?: string;
  placeholder?: string;
  textColor?: string;
  backgroundColor?: string;
  width?: number;
  height?: number;
}

export const ActorNode = (props: NodeProps<Node<Data>>) => {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(100);
  const [label, setLabel] = useState('');
  const [isLabelFocused, setIsLabelFocused] = useState(false);
  const { setNodes, updateNodeData } = useReactFlow();

  const {
    height: initialHeight,
    width: initialWidth,
    label: initialLabel,
    backgroundColor,
    textColor,
    placeholder,
  } = props.data;

  const onChangeLabel = (value: string) => {
    setLabel(value);
    updateNodeData(props.id, { label: value });
  };

  useEffect(() => {
    if (initialHeight) {
      setWidth(initialHeight);
    }
    if (initialWidth) {
      setHeight(initialWidth);
    }
  }, [initialWidth, initialHeight]);

  useEffect(() => {
    if (initialLabel) {
      setLabel(initialLabel);
    }
  }, [initialLabel]);

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
        className={`h-full w-full min-h-${height} min-w-${width} ${backgroundColor}`}
      >
        <CardBody className="flex flex-col items-center justify-center">
          <div className="w-full text-center text-white">
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
          <div className="w-full text-center text-white">
            {(isLabelFocused || !label) && (
              <Input
                value={label}
                placeholder={placeholder}
                onValueChange={setLabel}
                onFocus={() => setIsLabelFocused(true)}
                onBlur={() => setIsLabelFocused(false)}
                onChange={(e) => onChangeLabel(e.target.value)}
              />
            )}
          </div>
          <div className="flex items-center justify-center">
            <PersonStanding className={textColor} size={60} />
          </div>
          <div className="flex items-center justify-center">
            <CircleX
              className={`h-full cursor-pointer ${textColor}`}
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
    </>
  );
};
