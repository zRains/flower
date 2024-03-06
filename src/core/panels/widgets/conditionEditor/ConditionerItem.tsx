import { Input, Select, type SelectProps } from 'antd'
import { useState, type CSSProperties } from 'react'
import style from './index.module.less'

const conditionOptions = [
  {
    value: 'AND',
    label: '且',
  },
  {
    value: 'OR',
    label: '或',
  },
  {
    value: 'NORMAL',
    label: '普通',
  },
]

const operatorOptions = [
  {
    value: 'eq',
    label: '等于',
  },
  {
    value: 'neq',
    label: '不等于',
  },
  {
    value: 'gt',
    label: '大于',
  },
  {
    value: 'lt',
    label: '小于',
  },
  {
    value: 'empty',
    label: '为空',
  },
  {
    value: 'no-empty',
    label: '非空',
  },
]

const conditionColor = {
  AND: '#1bcd77',
  OR: '#ff8552',
  NORMAL: '#bdc3c7',
}

interface ConditionTypeSelectorProps extends SelectProps {}

export function ConditionTypeSelector(props: ConditionTypeSelectorProps) {
  const [type, setType] = useState<keyof typeof conditionColor>(props.value ?? 'NORMAL')

  return (
    <Select
      {...props}
      className={style['condition-type-selector']}
      options={conditionOptions}
      value={type}
      style={
        {
          ...props.style,
          '--selector-color': conditionColor[type],
        } as CSSProperties
      }
      suffixIcon={
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0"
          />
        </svg>
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(value: any, ...args) => {
        setType(value)
        props.onChange?.(value, ...args)
      }}
    />
  )
}

interface ConditionerItemProps {}

export default function ConditionerItem(props: ConditionerItemProps) {
  return (
    <section className={style['conditioner-item']}>
      <ConditionTypeSelector />
      <Input placeholder="选择变量" />
      <Select className="operator-selector" options={operatorOptions} />
      <Select />
      <Input />
      <div className="conditioner-operations">
        <div className="item-delete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
