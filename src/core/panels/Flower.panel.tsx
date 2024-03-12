import { Form, Input } from 'antd'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import themeStyle from '../theme.module.less'
import style from './flower.panel.module.less'

export default function FlowerPanel() {
  const mockId = useRef(uuidv4())
  return (
    <div className={style['flower-panel-wrapper']}>
      <section className="flower-id">ID: {mockId.current}</section>
      <Form.Item label="名称" name="name" initialValue={mockId.current} rules={[{ required: true }]}>
        <Input className={themeStyle['flower-input']} />
      </Form.Item>
    </div>
  )
}
