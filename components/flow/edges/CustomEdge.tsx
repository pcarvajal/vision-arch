import { Button } from '@nextui-org/react';
import {
  BezierEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';

const CustomEdge = (props: EdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;

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
      <BezierEdge {...props} />
      <EdgeLabelRenderer>
        <Button
          isIconOnly
          radius="full"
          size="sm"
          color="danger"
          aria-label="Borrar conexión"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: labelX, top: labelY }}
          onClick={() => {
            setEdges((edges) => edges.filter((edge) => edge.id !== id));
          }}
        >
          X
        </Button>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
