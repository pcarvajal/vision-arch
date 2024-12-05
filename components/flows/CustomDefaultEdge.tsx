import { Button } from '@nextui-org/react';
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import { X } from 'lucide-react';

export const CustomDefaultEdge = (props: EdgeProps) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
  } = props;

  const { setEdges } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BezierEdge {...props} label={undefined} />
      <EdgeLabelRenderer>
        <div
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: labelX, top: labelY, pointerEvents: 'all' }}
        >
          <h1 className="mb-2 text-center text-sm font-bold">{label}</h1>
          <Button
            isIconOnly
            radius="full"
            color="default"
            aria-label="Borrar conexión"
            className="text-sm"
            onClick={() => {
              setEdges((edges) => edges.filter((edge) => edge.id !== id));
            }}
          >
            <X />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
