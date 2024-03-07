/**
 * ### 起始（入参）节点
 *
 * 流初始化时起始节点连接结束（出参）节点，作为流的入口一个起始节点只能连接一个节点。
 */
import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
// import { BasicMenu } from '../menu'
import cn from 'classnames'
import NodeAttachMenu from '../NodeAttachMenu'
import style from './start.node.module.less'
import { StartIcon } from '../svgIcons'

interface StartNodeProps extends NodeProps {}

export default memo(function StartNode(props: StartNodeProps) {
  return (
    <div className={cn(style['start-node-wrapper'], { selected: props.selected })}>
      <div className="node-selected-halo"></div>
      <div>
        <StartIcon className="start-node-label-icon" />
        入参
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      <NodeAttachMenu className="attach-menu" />
    </div>
  )
})
