import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import style from './iconButton.node.module.less'
import NodeAttachMenu from '../NodeAttachMenu'

interface IconButtonNodeProps extends NodeProps {}

export default memo(function IconButtonNode(props: IconButtonNodeProps) {
  return (
    <div className={style['icon-button-node-wrapper']}>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <NodeAttachMenu open={props.data.menuOpen} />
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
    </div>
  )
})
