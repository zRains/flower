import { Dropdown, type DropdownProps, type MenuProps } from 'antd'
import cn from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useNodeId } from 'reactflow'
import style from './index.module.less'
import useFStore from './store'
import { MoreIcon } from './svgIcons'
import themeStyle from './theme.module.less'

interface NodeMenuProps {
  className?: string
  dropdownProps?: DropdownProps
  customMenu?: MenuProps['items']
}

export default function NodeMenu(props: NodeMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const currentNodeId = useNodeId()
  const delNode = useFStore((store) => store.delNode)
  const addMenuHandler = useFStore((state) => state.addMenuHandler)
  const removeMenuHandler = useFStore((state) => state.removeMenuHandler)
  const closeNodeMenu = useFStore((state) => state.closeNodeMenu)

  const menu = useMemo<MenuProps['items']>(
    () => [
      ...(props.customMenu ?? []),
      {
        key: 'copy',
        label: '复制',
      },
      {
        key: 'cut',
        label: '剪切',
      },
      {
        key: 'delete',
        label: '删除',
        onClick: () => {
          delNode(currentNodeId!)
        },
      },
    ],
    [currentNodeId, delNode, props.customMenu],
  )

  useEffect(() => {
    addMenuHandler(`menu_${currentNodeId!}`, (open?: boolean) =>
      setMenuOpen(typeof open === 'undefined' ? (_open) => !_open : open),
    )

    return () => removeMenuHandler(`menu_${currentNodeId!}`)
  }, [addMenuHandler, currentNodeId, removeMenuHandler])

  return (
    <div className={cn(style['menu-wrapper'], props.className)} onClick={(event) => event.stopPropagation()}>
      <Dropdown
        {...props.dropdownProps}
        overlayClassName={themeStyle['flower-dropdown']}
        open={menuOpen}
        menu={{ items: menu }}
        trigger={['click']}
        placement="bottom"
      >
        <div
          className="menu-trigger"
          onClick={() => {
            closeNodeMenu()
            setMenuOpen(!menuOpen)
          }}
        >
          <span className="menu-trigger-icon">
            <MoreIcon />
          </span>
        </div>
      </Dropdown>
    </div>
  )
}
