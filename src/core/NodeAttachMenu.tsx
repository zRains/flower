import { Dropdown, type DropdownProps, type MenuProps } from 'antd'
import cn from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useNodeId } from 'reactflow'
import style from './index.module.less'
import useFStore from './store'

interface NodeAttachMenuProps {
  disabled?: boolean
  className?: string
  dropdownProps?: DropdownProps
}

export default function NodeAttachMenu(props: NodeAttachMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const currentNodeId = useNodeId()
  const addMenuHandler = useFStore((state) => state.addMenuHandler)
  const removeMenuHandler = useFStore((state) => state.removeMenuHandler)
  const closeNodeMenu = useFStore((state) => state.closeNodeMenu)
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
        onClick: () => {
          addNode(currentNodeId!, 'messageNode')
        },
      },
      {
        type: 'divider',
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

  useEffect(() => {
    addMenuHandler(`attach_menu_${currentNodeId!}`, (open?: boolean) =>
      setMenuOpen(typeof open === 'undefined' ? (_open) => !_open : open),
    )

    return () => removeMenuHandler(`attach_menu_${currentNodeId!}`)
  }, [addMenuHandler, currentNodeId, removeMenuHandler])

  return (
    <div
      className={cn(style['menu-wrapper'], props.className, { disabled: props.disabled })}
      onClick={(event) => event.stopPropagation()}
    >
      <Dropdown {...props.dropdownProps} open={menuOpen} menu={{ items: menu }} trigger={['click']} placement="bottom">
        <div
          className="menu-trigger"
          onClick={() => {
            if (!props.disabled) {
              closeNodeMenu()
              setMenuOpen(!menuOpen)
            }
          }}
        >
          <span className="menu-trigger-icon">
            {props.disabled ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a7.92 7.92 0 0 1 1.69-4.9L16.9 18.31A7.92 7.92 0 0 1 12 20m6.31-3.1L7.1 5.69A7.92 7.92 0 0 1 12 4a8 8 0 0 1 8 8a7.92 7.92 0 0 1-1.69 4.9"
                />
              </svg>
            ) : (
              <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
              </svg>
            )}
          </span>
        </div>
      </Dropdown>
    </div>
  )
}
