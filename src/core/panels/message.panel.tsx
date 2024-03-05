import { Form, Input, Select } from 'antd'
import style from './message.panel.module.less'

export default function MessagePanel() {
  return (
    <div className={style['message-panel-wrapper']}>
      <Form.Item label="展示类型" name="showType" initialValue="global-message">
        <Select
          options={[
            {
              value: 'global-message',
              label: '全局消息',
            },
            {
              value: 'confirm-message',
              label: '确认消息',
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="消息类型" name="type" initialValue="success">
        <Select
          options={[
            {
              value: 'success',
              label: '成功',
            },
            {
              value: 'failed',
              label: '失败',
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="文本" name="text">
        <Input />
      </Form.Item>
    </div>
  )
}
