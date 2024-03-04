import cn from 'classnames'
import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import NodeAttachMenu from '../NodeAttachMenu'
import NodeMenu from '../NodeMenu'
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
            <svg
              className="message-node-label-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.605 4.17a4.67 4.67 0 0 0-3.33-1.38H6.705a4.71 4.71 0 0 0-4.71 4.72v6.6a4.71 4.71 0 0 0 4.71 4.72h2.33l1.95 1.94c.127.143.284.255.46.33c.175.072.361.11.55.11c.189-.002.375-.04.55-.11a1.58 1.58 0 0 0 .44-.31l2-2h2.33a4.69 4.69 0 0 0 3.33-1.38a4.8 4.8 0 0 0 1-1.53c.234-.575.357-1.19.36-1.81v-6.6a4.67 4.67 0 0 0-1.4-3.3m-13.24 8.17a1.66 1.66 0 1 1 1.66-1.66a1.67 1.67 0 0 1-1.66 1.66m4.63 0a1.66 1.66 0 1 1 0-3.32a1.66 1.66 0 0 1 0 3.32m4.62 0a1.66 1.66 0 1 1 1.66-1.66a1.67 1.67 0 0 1-1.66 1.66"
              />
            </svg>
          </div>
          <span className="message-node-custom-name">消息提示</span>
        </section>
        <section className="message-node-type-desc">类型：消息提示 - 全局消息</section>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      {/* <div className="message-node-operations">
        <span className="operation-trigger" onClick={() => delNode(props.id, props.type)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
            />
          </svg>
        </span>
      </div> */}
      <NodeMenu className="message-node-menu-wrapper" />
      <NodeAttachMenu className="attach-menu" open={props.data.menuOpen} />
    </div>
  )
})
