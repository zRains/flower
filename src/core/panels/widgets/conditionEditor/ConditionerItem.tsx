import { Form, Input, Select, type FormListFieldData, type SelectProps } from 'antd'
import cn from 'classnames'
import { type CSSProperties } from 'react'
import { ArrowDownIcon, DeleteIcon } from '../../../svgIcons'
import style from './conditionerItem.module.less'

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
  // const preValue = useRef(props.value)

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

interface NotOperatingBtnProps {
  value?: boolean
  onChange?: (value: boolean) => void
}

export function NotOperatingBtn(props: NotOperatingBtnProps) {
  const { value, onChange } = props
  return (
    <div className={cn(style['not-operating'], { active: value })} onClick={() => onChange?.(!value)}>
      非
    </div>
  )
}

interface ConditionerItemProps {
  fieldPath?: Array<string | number>
  field?: FormListFieldData
  removeHandle?: () => void
}

export default function ConditionerItem(props: ConditionerItemProps) {
  const { fieldPath = [], field, removeHandle } = props
  const form = Form.useFormInstance()
  const formNotWatcher = Form.useWatch<boolean>([...fieldPath, 'not'], form)

  return (
    <section className={style['conditioner-item']}>
      {formNotWatcher && <div className="is-not-operating">非</div>}

      <Form.Item name={field ? [field.name, 'type'] : [...fieldPath, 'type']}>
        <ConditionTypeSelector />
      </Form.Item>

      <Form.Item name={field ? [field.name, 'variable'] : [...fieldPath, 'variable']}>
        <Input placeholder="选择变量" />
      </Form.Item>

      <Form.Item name={field ? [field.name, 'operator'] : [...fieldPath, 'operator']}>
        <Select className="operator-selector" suffixIcon={<ArrowDownIcon />} options={operatorOptions} />
      </Form.Item>

      <Form.Item name={field ? [field.name, 'value'] : [...fieldPath, 'value']}>
        <Input />
      </Form.Item>

      <div className="conditioner-operations">
        <Form.Item name={field ? [field.name, 'not'] : [...fieldPath, 'not']} noStyle>
          <NotOperatingBtn />
        </Form.Item>
        <div className="item-delete-btn" onClick={removeHandle}>
          <DeleteIcon />
        </div>
      </div>
    </section>
  )
}
