import { Form } from 'antd'
import { useEffect, useState } from 'react'
import Conditioner from './Conditioner'
import style from './index.module.less'
import type { Condition } from './types'

interface ConditionEditorProps {}

export default function ConditionEditor(props: ConditionEditorProps) {
  const [form] = Form.useForm<Condition>()
  const [a, b] = useState<any>({})

  useEffect(() => {
    form.setFieldsValue({
      type: 'NORMAL',
      not: false,
      variable: 'pm-fucker',
      operator: 'eq',
      value: '?',
      children: [
        // {
        //   type: 'NORMAL',
        //   not: true,
        //   variable: 'name-b',
        //   operator: 'eq',
        //   value: '',
        //   children: [],
        // },
        // {
        //   type: 'NORMAL',
        //   not: false,
        //   variable: 'name-c',
        //   operator: 'eq',
        //   value: '',
        //   children: [],
        // },
      ],
    })
  }, [])

  return (
    <>
      <div className={style['condition-editor-wrapper']}>
        <Form
          onValuesChange={(_, v) => {
            // console.log('asdas', v)
            b(v)
          }}
          form={form}
          initialValues={{
            type: 'NORMAL',
            not: false,
            variable: '',
            operator: 'eq',
            value: '',
            children: [],
          }}
        >
          <Conditioner />
          {/* <ConditionerItem /> */}
        </Form>
      </div>
      <pre>{JSON.stringify(a, null, 2)}</pre>
    </>
  )
}
