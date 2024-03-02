import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import style from './iconButton.node.module.less'
import NodeDropdownMenu from '../NodeDropdownMenu'

interface IconButtonNodeProps extends NodeProps {}

export default memo(function IconButtonNode(props: IconButtonNodeProps) {
  return (
    <div className={style['icon-button-node-wrapper']}>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      {/* <div className="icon-button-node-content">
        <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
          <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
        </svg>
      </div> */}
      <NodeDropdownMenu open={props.data.menuOpen} />
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
    </div>
  )
})
