import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import style from './header.node.module.less'
import AddChildBtn from './AddChildBtn'

interface HeaderNodeProps extends NodeProps {}

export default memo(function HeaderNode(props: HeaderNodeProps) {
  return (
    <div className={style['header-node-wrapper']}>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div className="header-node-content">条件分支</div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      <AddChildBtn />
    </div>
  )
})
