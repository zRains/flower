import cn from 'classnames'
import { memo, useMemo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import NodeAttachMenu from '../NodeAttachMenu'
import NodeMenu from '../NodeMenu'
import useFStore from '../store'
import { ApiServiceIcon } from '../svgIcons'
import style from './apiService.node.module.less'

interface ApiServiceNodeProps extends NodeProps {}

export default memo(function ApiServiceNode(props: ApiServiceNodeProps) {
  const edges = useFStore((state) => state.edges)
  const addNode = useFStore((state) => state.addNode)

  const disabledAttachMenu = useMemo(
    () => edges.filter((edge) => edge.source === props.id).length >= 2,
    [edges, props.id],
  )

  return (
    <div className={cn(style['api-service-node-wrapper'], { selected: props.selected })}>
      <div className="node-selected-halo"></div>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div className="api-service-node-content">
        <section className="api-service-node-title">
          <div className="icon-box">
            <ApiServiceIcon className="api-service-node-label-icon" />
          </div>
          <span className="api-service-node-custom-name">{props.data.name}</span>
        </section>
        <section className="api-service-node-type-desc">类型：接口调用</section>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      <NodeMenu
        className="api-service-node-menu-wrapper"
        customMenu={[
          {
            key: 'addCallStatus',
            label: '添加状态',
            disabled: disabledAttachMenu,
            onClick: () => {
              addNode(props.id, 'callStatusNode')
            },
          },
          {
            type: 'divider',
          },
        ]}
      />
      <NodeAttachMenu disabled={disabledAttachMenu} className="attach-menu" />
    </div>
  )
})
