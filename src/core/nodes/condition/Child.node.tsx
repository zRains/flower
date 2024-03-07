import cn from 'classnames'
import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import NodeAttachMenu from '../../NodeAttachMenu'
import useFStore from '../../store'
import { DeleteIcon } from '../../svgIcons'
import style from './child.node.module.less'

interface ChildNodeProps extends NodeProps {}

export default memo(function ChildNode(props: ChildNodeProps) {
  const delNode = useFStore((state) => state.delNode)

  return (
    <div className={cn(style['child-node-wrapper'], { selected: props.selected })}>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div className="child-node-content">{props.data.name}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      <div className="child-node-operations">
        <span className="operation-trigger" onClick={() => delNode(props.id)}>
          <DeleteIcon />
        </span>
      </div>
      <NodeAttachMenu className="attach-menu" />
    </div>
  )
})
