import { Input, Select, type SelectProps } from 'antd'
import { useState, type CSSProperties } from 'react'
import style from './conditionerItem.module.less'
import { ArrowDownIcon, DeleteIcon } from '../../../svgIcons'

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
  NORMAL: '#636e72',
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
      suffixIcon={<ArrowDownIcon />}
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
      <Select className="operator-selector" suffixIcon={<ArrowDownIcon />} options={operatorOptions} />
      {/* <Select suffixIcon={<ArrowDownIcon />} /> */}
      <Input />
      <div className="conditioner-operations">
        <div className="item-delete-btn">
          <DeleteIcon />
        </div>
      </div>
    </section>
  )
}
