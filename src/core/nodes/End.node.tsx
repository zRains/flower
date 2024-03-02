import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import cn from 'classnames'
import style from './end.node.module.less'

interface EndNodeProps extends NodeProps {}

export default memo(function EndNode(props: EndNodeProps) {
  return (
    <div className={cn(style['end-node-wrapper'], { selected: props.selected })}>
      <div className="node-selected-halo"></div>
      <div>
        <svg
          className="end-node-label-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path
              fill="currentColor"
              d="m2 12l-.78-.625l-.5.625l.5.625zm9 1a1 1 0 1 0 0-2zM5.22 6.375l-4 5l1.56 1.25l4-5zm-4 6.25l4 5l1.56-1.25l-4-5zM2 13h9v-2H2z"
            />
            <path
              stroke="currentColor"
              strokeWidth="2"
              d="M10 8.132v-.743c0-1.619 0-2.428.474-2.987c.474-.56 1.272-.693 2.868-.96l1.672-.278c3.243-.54 4.864-.81 5.925.088C22 4.151 22 5.795 22 9.082v5.835c0 3.288 0 4.932-1.06 5.83c-1.062.9-2.683.63-5.926.089l-1.672-.279c-1.596-.266-2.394-.399-2.868-.958C10 19.039 10 18.229 10 16.61v-.545"
            />
          </g>
        </svg>
        出参
      </div>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
    </div>
  )
})
