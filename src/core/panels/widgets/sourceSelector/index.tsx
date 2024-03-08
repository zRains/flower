import { Select, Dropdown, Tag, type SelectProps, type MenuProps, Popover, InputNumber, Input } from 'antd'
import { PlusIcon } from '../../../svgIcons'
import style from './index.module.less'
import { useMemo, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
              setInnerValues((values) => [
                ...values,
                {
                  id: uuidv4(),
                  type: 'const-number',
                  data: {},
                },
              ])
            },
          },
          {
            key: 'const-text',
            label: '文本常量',
          },
          {
            key: 'const-boolean',
            label: '布尔常量',
          },
          {
            key: 'const-datetime',
            label: '时间常量',
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
        label: menuItemMap.get(item.type),
        value: item.id,
      }
    })

    return {
      innerOptions: options,
      innerSelectedValues: selectedValues,
    }
  }, [innerValues, menuItemMap])

  const handleChange = (valueArr: Array<string>) => {
    setInnerValues((values) => {
      return values.filter((item) => valueArr.includes(item.id))
    })
  }

  return (
    <div className={style['source-selector-wrapper']}>
      <Select<Array<string>>
        mode="tags"
        className="source-selector"
        style={{ width: '100%' }}
        onChange={handleChange}
        options={innerOptions}
        value={innerSelectedValues}
        tagRender={(tagProps) => {
          // console.log('tagProps', tagProps)

          return (
            <div
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Popover
                // open
                overlayClassName={style['source-selector-tag-popover']}
                trigger={['click']}
                showArrow={false}
                title={<div className="title-box">数字常量</div>}
                placement="bottomLeft"
                getPopupContainer={(triggerNode) => triggerNode.parentElement!}
                content={
                  <div>
                    {/* <InputNumber min={1} max={10} defaultValue={3} /> */}
                    <Input />
                  </div>
                }
              >
                <Tag color="#87d068">{tagProps.label}</Tag>
              </Popover>
            </div>
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
        showSearch={false}
        dropdownRender={() => <></>}
        showArrow
      />
    </div>
  )
}
