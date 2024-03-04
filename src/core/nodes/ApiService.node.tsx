import cn from 'classnames'
import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import NodeAttachMenu from '../NodeAttachMenu'
import style from './apiService.node.module.less'
import useFStore from '../store'

interface ApiServiceNodeProps extends NodeProps {}

export default memo(function ApiServiceNode(props: ApiServiceNodeProps) {
  const delNode = useFStore((store) => store.delNode)

  return (
    <div className={cn(style['api-service-node-wrapper'], { selected: props.selected })}>
      <div className="node-selected-halo"></div>
      <Handle type="target" position={Position.Top} isConnectable={props.isConnectable} />
      <div className="api-service-node-content">
        <section className="api-service-node-title">
          <div className="icon-box">
            <svg
              className="api-service-node-label-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 28 28"
            >
              <path
                fill="currentColor"
                d="M22.74 6.327a5.501 5.501 0 0 1-.495 7.212L20.3 15.483a.75.75 0 0 1-1.06 0l-6.718-6.717a.75.75 0 0 1 0-1.06l1.945-1.945a5.501 5.501 0 0 1 7.212-.495l3.044-3.044a.75.75 0 0 1 1.061 1.06zm-9.963 5.949a.75.75 0 0 0-1.06-1.061L9.59 13.341l-.822-.822a.75.75 0 0 0-1.06 0l-1.945 1.944a5.501 5.501 0 0 0-.495 7.212L2.224 24.72a.75.75 0 1 0 1.06 1.06l3.045-3.044a5.501 5.501 0 0 0 7.212-.494l1.944-1.945a.75.75 0 0 0 0-1.06l-.827-.828l2.126-2.125a.75.75 0 1 0-1.061-1.06l-2.125 2.125l-2.947-2.947z"
              />
            </svg>
          </div>
          <span className="api-service-node-custom-name">{props.id}</span>
        </section>
        <section className="api-service-node-type-desc">类型：接口调用</section>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={props.isConnectable} />
      <div className="api-service-node-operations">
        <span className="operation-trigger" onClick={() => delNode(props.id, props.type)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
            />
          </svg>
        </span>
      </div>
      <NodeAttachMenu className="attach-menu" open={props.data.menuOpen} />
    </div>
  )
})
