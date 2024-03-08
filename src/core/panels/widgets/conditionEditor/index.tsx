import { Form } from 'antd'
import Conditioner from './Conditioner'
import style from './index.module.less'
import type { Condition } from './types'

interface ConditionEditorProps {}

export default function ConditionEditor(props: ConditionEditorProps) {
  const [form] = Form.useForm<Condition>()

  return (
    <>
      <div className={style['condition-editor-wrapper']}>
        <Form
          form={form}
          initialValues={{
            type: 'NORMAL',
            not: false,
            variable: '',
            operator: 'eq',
            value: '',
          }}
        >
          <Conditioner />
        </Form>
      </div>
    </>
  )
}
