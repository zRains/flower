import { Dropdown, type DropdownProps, type MenuProps } from 'antd'
import cn from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useNodeId } from 'reactflow'
import style from './index.module.less'
import useFStore from './store'
import { BanIcon, PlusIcon } from './svgIcons'

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
          <span className="menu-trigger-icon">{props.disabled ? <BanIcon /> : <PlusIcon />}</span>
        </div>
      </Dropdown>
    </div>
  )
}
