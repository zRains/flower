import cn from 'classnames'
import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import NodeAttachMenu from '../../NodeAttachMenu'
import useFStore from '../../store'
import style from './callStatus.node.module.less'

interface CallStatusNodeProps extends NodeProps<{ succeed?: boolean }> {}

export default memo(function CallStatusNode(props: CallStatusNodeProps) {
  const delNode = useFStore((state) => state.delNode)
  return (
    <div className={cn(style['call-status-node-wrapper'], { selected: props.selected, succeed: props.data.succeed })}>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div className="call-status-node-content">{props.data.succeed ? '成功时' : '失败时'}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      <div className="call-status-node-operations">
        <span className="operation-trigger" onClick={() => delNode(props.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
            />
          </svg>
        </span>
      </div>
      <NodeAttachMenu className="attach-menu" />
    </div>
  )
})
