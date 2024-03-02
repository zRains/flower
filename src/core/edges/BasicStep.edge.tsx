import { BaseEdge, getStraightPath, type EdgeProps } from 'reactflow'
import useFStore from '../store'
import { useMemo } from 'react'

interface BasicStepEdgeProps extends EdgeProps {}

function buildBezierPath(sourceX: number, sourceY: number, targetX: number, targetY: number, isMerge?: boolean) {
  if (isMerge) {
    return `M ${sourceX},${sourceY} L ${sourceX},${targetY - 28} Q ${sourceX},${targetY - 28 + 12} ${
      sourceX + (sourceX < targetX ? 12 : -12)
    },${targetY - 28 + 12} L ${sourceX + (sourceX < targetX ? 12 : -12)},${targetY - 28 + 12} ${
      targetX + (sourceX < targetX ? -12 : 12)
    },${targetY - 28 + 12} Q ${targetX},${targetY - 28 + 12} ${targetX},${
      targetY - 28 + 12 + 12
    } L ${targetX},${targetY}`
  }

  return `M ${sourceX},${sourceY} L ${sourceX},${sourceY + 28} Q ${sourceX},${sourceY + 28 + 12} ${
    sourceX + (sourceX > targetX ? -12 : 12)
  },${sourceY + 28 + 12} L ${sourceX + (sourceX > targetX ? -12 : 12)},${sourceY + 28 + 12} ${
    targetX + (sourceX > targetX ? 12 : -12)
  },${sourceY + 28 + 12} Q ${targetX},${sourceY + 28 + 12} ${targetX},${sourceY + 28 + 12 + 12} L ${targetX},${targetY}`
}

export default function BasicStepEdge(props: BasicStepEdgeProps) {
  const edges = useFStore((state) => state.edges)
  const { sourceX, sourceY, targetX, targetY, target } = props
  const edgePath = useMemo(() => {
    const [path] =
      Math.abs(sourceX - targetX) < 1e-3
        ? getStraightPath({
            sourceX,
            sourceY,
            targetX,
            targetY,
          })
        : [
            buildBezierPath(
              sourceX,
              sourceY,
              targetX,
              targetY,
              edges.filter((edge) => edge.target === target).length > 1,
            ),
          ]

    return path
  }, [edges, sourceX, sourceY, target, targetX, targetY])

  return (
    <>
      <BaseEdge {...props} path={edgePath} />
    </>
  )
}
