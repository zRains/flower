import { Form, Select } from 'antd'
import style from './apiService.panel.module.less'
import { useEffect } from 'react'

export default function ApiServicePanel() {
  // const form = Form.useFormInstance()

  // useEffect(
  //   () => () => {
  //     setTimeout(() => {
  //       console.log('sadasda', form.getFieldsValue())
  //     })
  //   },
  //   [form],
  // )

  return (
    <div className={style['api-service-panel-wrapper']}>
      <Form.Item label="选择接口" name="interface" initialValue="i-1">
        <Select
          options={[
            {
              value: 'i-1',
              label: '接口1',
            },
            {
              value: 'i-2',
              label: '接口2',
            },
          ]}
        />
      </Form.Item>
    </div>
  )
}
