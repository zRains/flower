import { Form, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import style from './flower.panel.module.less'
import { useRef } from 'react'

export default function FlowerPanel() {
  const mockId = useRef(uuidv4())
  return (
    <div className={style['flower-panel-wrapper']}>
      <section className="flower-id">ID: {mockId.current}</section>
      <Form.Item label="名称" name="name" initialValue={mockId.current} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </div>
  )
}
