import Conditioner from './Conditioner'
import { Form } from 'antd'
import style from './index.module.less'
import ConditionerItem from './ConditionerItem'
import { useEffect } from 'react'

export interface Condition {
  type: 'AND' | 'OR' | 'NORMAL'
  not: boolean
  children: Condition[]
  variable?: string
  operator?: 'eq' | 'neq' | 'gt' | 'lt' | 'empty' | 'no-empty'
  value?: unknown
}

interface ConditionEditorProps {}

export default function ConditionEditor(props: ConditionEditorProps) {
  const [form] = Form.useForm<Condition>()

  useEffect(() => {
    form.setFieldsValue({
      type: 'NORMAL',
      not: false,
      variable: 'name-p',
      operator: 'eq',
      value: '',
      children: [],
    })
  }, [])

  return (
    <div className={style['condition-editor-wrapper']}>
      <Form form={form}>
        {/* <Conditioner trace /> */}
        <ConditionerItem />
      </Form>
    </div>
  )
}
