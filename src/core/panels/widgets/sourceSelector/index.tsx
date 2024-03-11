import { useClickAway } from 'ahooks'
import { Dropdown, Form, Popover, Select, Tag, type MenuProps } from 'antd'
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CloseIcon, PlusIcon } from '../../../svgIcons'
import style from './index.module.less'
import ConstSource, { type ConstType } from './sources/Const.source'

const MenuItemMapContext = createContext<Map<string, string>>(new Map())

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SourceItem<Data = any> {
  id: string
  type: string
  data: Data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createMenuItemMap(items: Array<any>) {
  const result: Map<string, string> = new Map()

  const recur = (_items: typeof items) => {
    _items.forEach((_item) => {
      result.set(_item.key, _item.label)

      if (_item.children && _item.children.length > 0) {
        recur(_item.children)
      }
    })
  }

  recur(items)

  return result
}

export default function SourceSelector() {
  const [innerValues, setInnerValues] = useState<SourceItem[]>([
    {
      id: uuidv4(),
      type: 'const-number',
      data: {},
    },
  ])

  /** 菜单项 */
  const menuItems: NonNullable<MenuProps['items']> = useMemo(
    () => [
      {
        key: 'const-data',
        label: '常量数据',
        children: [
          {
            key: 'const-number',
            label: '数字常量',
            onClick: () => {
              setInnerValues([
                {
                  id: uuidv4(),
                  type: 'const-number',
                  data: {},
                },
              ])
            },
          },
          {
            key: 'const-string',
            label: '文本常量',
            onClick: () => {
              setInnerValues([
                {
                  id: uuidv4(),
                  type: 'const-string',
                  data: {},
                },
              ])
            },
          },
          {
            key: 'const-boolean',
            label: '布尔常量',
            onClick: () => {
              setInnerValues([
                {
                  id: uuidv4(),
                  type: 'const-boolean',
                  data: {},
                },
              ])
            },
          },
          {
            key: 'const-datetime',
            label: '时间常量',
            onClick: () => {
              setInnerValues([
                {
                  id: uuidv4(),
                  type: 'const-datetime',
                  data: {},
                },
              ])
            },
          },
        ],
      },
      {
        key: 'wip-1',
        label: '事件入参',
        disabled: true,
        children: [],
      },
      {
        key: 'wip-2',
        label: '事件流数据',
        disabled: true,
        children: [],
      },
      {
        key: 'wip-3',
        label: '全局变量',
        disabled: true,
        children: [],
      },
    ],
    [],
  )

  const menuItemMap = useMemo(() => createMenuItemMap(menuItems), [menuItems])
  const { innerOptions, innerSelectedValues } = useMemo(() => {
    const selectedValues: Array<string> = []
    const options = innerValues.map((item) => {
      selectedValues.push(item.id)

      return {
        label: item.type,
        value: item.id,
      }
    })

    return {
      innerOptions: options,
      innerSelectedValues: selectedValues,
    }
  }, [innerValues])
  const [popoverHandles, setPopoverHandles] = useState<Record<string, (open?: boolean) => void>>({})
  const setupPopoverHandles = useCallback((id: string, handle?: (open?: boolean) => void) => {
    setPopoverHandles((collection) => {
      if (handle) {
        collection[id] = handle
      } else {
        console.log('remove popoverCloseHandle: ', id)
        Reflect.deleteProperty(collection, id)
      }

      return { ...collection }
    })
  }, [])

  const handleChange = (valueArr: Array<string>) => {
    setInnerValues((values) => {
      return values.filter((item) => valueArr.includes(item.id))
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tagValueChangeHandle = useCallback((id: string, values: any) => {
    setInnerValues((_innerValues) => {
      const targetValue = _innerValues.find((_innerValue) => _innerValue.id === id)!

      targetValue.data = values

      return [..._innerValues]
    })
  }, [])

  useClickAway(() => {
    Object.values(popoverHandles).forEach((handle) => handle(false))
  }, [])

  return (
    <MenuItemMapContext.Provider value={menuItemMap}>
      <div className={style['source-selector-wrapper']}>
        <Select<Array<string>>
          mode="tags"
          className="source-selector"
          style={{ width: '100%' }}
          onChange={handleChange}
          options={innerOptions}
          value={innerSelectedValues}
          tagRender={(tagProps) => {
            return (
              <SelectorRenderTag
                id={tagProps.value}
                popoverTitle="数字常量"
                tagLabel={tagProps.label}
                setPopoverHandles={setupPopoverHandles}
                tagValueChangeHandle={tagValueChangeHandle}
                onClick={() =>
                  Object.entries(popoverHandles).forEach(([id, handle]) =>
                    handle(id === tagProps.value ? void 0 : false),
                  )
                }
              />
            )
          }}
          suffixIcon={
            <Dropdown trigger={['click']} menu={{ items: menuItems }}>
              <div>
                <PlusIcon />
              </div>
            </Dropdown>
          }
          open={false}
          dropdownRender={() => <></>}
          showSearch={false}
          showArrow
        />
        <pre style={{ color: 'white', marginTop: 200 }}>{JSON.stringify(innerValues, null, 2)}</pre>
      </div>
    </MenuItemMapContext.Provider>
  )
}

interface SelectorRenderTagProps {
  id: string
  tagLabel: ReactNode
  popoverTitle?: string
  setPopoverHandles: (id: string, handle?: (open?: boolean) => void) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tagValueChangeHandle: (id: string, values: any) => void
  onClick?: () => void
}

function SelectorRenderTag(props: SelectorRenderTagProps) {
  const [form] = Form.useForm()
  const menuItemMap = useContext(MenuItemMapContext)
  const { id, tagLabel, popoverTitle, setPopoverHandles, tagValueChangeHandle, onClick } = props
  const [popoverOpen, setPopoverOpen] = useState(false)

  useEffect(() => {
    setPopoverHandles?.(id, (open?: boolean) => setPopoverOpen(typeof open === 'undefined' ? (o) => !o : open))

    return () => setPopoverHandles?.(id)
  }, [id, setPopoverHandles])

  return (
    <div
      className="source-selector-tag-wrapper"
      // 阻止删除标签
      onKeyDown={(event) => event.stopPropagation()}
      // onKeyUp={(event) => event.stopPropagation()}
      // 阻止聚焦向上传递至选择器
      onFocus={(event) => event.stopPropagation()}
      // 阻止弹出下拉面板
      onMouseDown={(event) => event.stopPropagation()}
      // 阻止选择器重新聚焦
      onClick={(event) => {
        // Object.values(tagPopoverCloseHandleMap).forEach((handle) => handle())
        event.stopPropagation()
      }}
    >
      <Popover
        overlayClassName={style['source-selector-tag-popover']}
        trigger={['click']}
        open={popoverOpen}
        showArrow={false}
        placement="bottomLeft"
        title={
          popoverTitle ? (
            <div className="tag-popover-title-box">
              <div className="tag-popover-title">{menuItemMap.get(tagLabel as string)}</div>
              <div className="tag-popover-close-btn">
                <span onClick={onClick}>
                  <CloseIcon />
                </span>
              </div>
            </div>
          ) : undefined
        }
        content={
          <Form
            form={form}
            onValuesChange={(_, values) => {
              tagValueChangeHandle(id, values)
            }}
          >
            <ConstSource type={tagLabel as ConstType} />
          </Form>
        }
      >
        <Tag className="source-selector-tag" onClick={onClick}>
          {menuItemMap.get(tagLabel as string)}
        </Tag>
      </Popover>
    </div>
  )
}
