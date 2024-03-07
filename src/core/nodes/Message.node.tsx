import cn from 'classnames'
import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import NodeAttachMenu from '../NodeAttachMenu'
import NodeMenu from '../NodeMenu'
import { MessageIcon } from '../svgIcons'
import style from './message.node.module.less'

interface MessageNodeProps extends NodeProps {}

export default memo(function MessageNode(props: MessageNodeProps) {
  return (
    <div className={cn(style['message-node-wrapper'], { selected: props.selected })}>
      <div className="node-selected-halo"></div>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div className="message-node-content">
        <section className="message-node-title">
          <div className="icon-box">
            <MessageIcon className="message-node-label-icon" />
          </div>
          <span className="message-node-custom-name">{props.data.name}</span>
        </section>
        <section className="message-node-type-desc">类型：消息提示 - 全局消息</section>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      <NodeMenu className="message-node-menu-wrapper" />
      <NodeAttachMenu className="attach-menu" />
    </div>
  )
})
