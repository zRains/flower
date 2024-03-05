import { Dropdown, type DropdownProps, type MenuProps } from 'antd'
import cn from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useNodeId } from 'reactflow'
import style from './index.module.less'
import useFStore from './store'

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
      <Dropdown {...props.dropdownProps} open={menuOpen} menu={{ items: menu }} trigger={['click']} placement="bottom">
        <div
          className="menu-trigger"
          onClick={() => {
            closeNodeMenu()
            setMenuOpen(!menuOpen)
          }}
        >
          <span className="menu-trigger-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m14 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-7 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"
              />
            </svg>
          </span>
        </div>
      </Dropdown>
    </div>
  )
}
