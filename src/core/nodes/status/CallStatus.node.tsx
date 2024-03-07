import cn from 'classnames'
import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import NodeAttachMenu from '../../NodeAttachMenu'
import useFStore from '../../store'
import { DeleteIcon } from '../../svgIcons'
import style from './callStatus.node.module.less'

interface CallStatusNodeProps extends NodeProps<{ succeed?: boolean }> {}

export default memo(function CallStatusNode(props: CallStatusNodeProps) {
  const delNode = useFStore((state) => state.delNode)

  return (
    <div className={cn(style['call-status-node-wrapper'], { selected: props.selected, succeed: props.data.succeed })}>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div className="call-status-node-content">{props.data.succeed ? '成功时' : '失败时'}</div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      {!props.data.succeed && (
        <div className="call-status-node-operations">
          <span className="operation-trigger" onClick={() => delNode(props.id)}>
            <DeleteIcon />
          </span>
        </div>
      )}
      <NodeAttachMenu disabled={!props.data.succeed} className="attach-menu" />
    </div>
  )
})
