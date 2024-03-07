import { Form, Input, Select, Switch, type SelectProps } from 'antd'
import cn from 'classnames'
import { useState, type CSSProperties, useEffect } from 'react'
import { ArrowDownIcon, DeleteIcon } from '../../../svgIcons'
import style from './conditionerItem.module.less'
import Conditioner from './Conditioner'

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
  return (
    <Select
      {...props}
      className={style['condition-type-selector']}
      options={conditionOptions}
      style={
        {
          ...props.style,
          '--selector-color': conditionColor[props.value as keyof typeof conditionColor],
        } as CSSProperties
      }
      suffixIcon={<ArrowDownIcon />}
    />
  )
}

interface ConditionerItemProps {}

export default function ConditionerItem(props: ConditionerItemProps) {
  const form = Form.useFormInstance()
  const formNotWatcher = Form.useWatch<boolean>(['not'], form)
  const formTypeWatcher = Form.useWatch<string>(['type'], form)
  const [sa, sA] = useState(true)

  // if (formTypeWatcher === 'AND') {
  //   // return <Conditioner trace />
  //   return <span style={{ color: 'white' }}>1111</span>
  // }

  useEffect(() => {
    console.log('asdasd', form)
  }, [form])

  return (
    <section className={style['conditioner-item']}>
      <Switch checked={sa} onChange={sA} />
      {formTypeWatcher === 'AND' ? <Conditioner /> : 'b'}
      {formNotWatcher && <div className="is-not-operating">非</div>}

      {sa && (
        <Form.Item name="type">
          <ConditionTypeSelector />
        </Form.Item>
      )}

      <Form.Item name="variable">
        <Input placeholder="选择变量" />
      </Form.Item>

      <Form.Item name="operator">
        <Select className="operator-selector" suffixIcon={<ArrowDownIcon />} options={operatorOptions} />
      </Form.Item>

      {/* <Select suffixIcon={<ArrowDownIcon />} /> */}

      <Form.Item name="value">
        <Input />
      </Form.Item>

      <div className="conditioner-operations">
        <Form.Item name="not" noStyle>
          <div
            className={cn('not-operating', { active: formNotWatcher })}
            onClick={() => form.setFieldValue(['not'], !formNotWatcher)}
          >
            非
          </div>
        </Form.Item>
        <div className="item-delete-btn">
          <DeleteIcon />
        </div>
      </div>
    </section>
  )
}
