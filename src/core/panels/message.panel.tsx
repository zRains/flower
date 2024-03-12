import { Form, Input, Select } from 'antd'
import { ArrowDownIcon } from '../svgIcons'
import themeStyle from '../theme.module.less'
import style from './message.panel.module.less'

export default function MessagePanel() {
  return (
    <div className={style['message-panel-wrapper']}>
      <Form.Item label="展示类型" name="showType" initialValue="global-message">
        <Select
          className={themeStyle['flower-select']}
          suffixIcon={<ArrowDownIcon />}
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
          className={themeStyle['flower-select']}
          suffixIcon={<ArrowDownIcon />}
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
        <Input className={themeStyle['flower-input']} />
      </Form.Item>
    </div>
  )
}
