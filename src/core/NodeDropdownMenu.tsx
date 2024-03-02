import { Dropdown, type DropdownProps, type MenuProps } from 'antd'
import { useMemo } from 'react'
import { useNodeId } from 'reactflow'
import style from './index.module.less'
import useFStore from './store'
import cn from 'classnames'

interface NodeDropdownMenuProps extends DropdownProps {
  float?: boolean
}

export default function NodeDropdownMenu(props: NodeDropdownMenuProps) {
  const currentNodeId = useNodeId()
  const nodes = useFStore((store) => store.nodes)
  const setNodes = useFStore((store) => store.setNodes)
  const addNode = useFStore((store) => store.addNode)

  const menu = useMemo<MenuProps['items']>(
    () => [
      {
        key: 'api-service',
        label: '调用接口',
        onClick: () => {
          addNode(currentNodeId!, 'apiServiceNode')
        },
      },
      {
        key: 'message',
        label: '显示消息',
      },
      {
        key: 'nodes',
        label: '条件分支',
        onClick: () => {
          addNode(currentNodeId!, 'conditionHeaderNode')
        },
      },
    ],
    [addNode, currentNodeId],
  )

  return (
    <div
      className={cn(style['node-dropdown-menu-wrapper'], { float: props.float })}
      onClick={(event) => event.stopPropagation()}
    >
      <Dropdown {...props} menu={{ items: menu }} trigger={['click']} placement="bottom">
        <div
          className="node-dropdown-menu-trigger"
          onClick={() =>
            setNodes(
              nodes.map((node) => {
                if (node.id === currentNodeId) {
                  node.data = {
                    ...node.data,
                    menuOpen: !node.data.menuOpen,
                  }
                }

                return node
              }),
            )
          }
        >
          <span role="img" aria-label="plus" className="anticon anticon-plus">
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="plus"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
              <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
            </svg>
          </span>
        </div>
      </Dropdown>
    </div>
  )
}
