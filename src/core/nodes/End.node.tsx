import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import cn from 'classnames'
import style from './end.node.module.less'
import { EndIcon } from '../svgIcons'

interface EndNodeProps extends NodeProps {}

export default memo(function EndNode(props: EndNodeProps) {
  return (
    <div className={cn(style['end-node-wrapper'], { selected: props.selected })}>
      <div className="node-selected-halo"></div>
      <div>
        <EndIcon className="end-node-label-icon" />
        出参
      </div>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
    </div>
  )
})
