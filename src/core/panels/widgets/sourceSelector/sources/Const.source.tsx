import { Form, Input, InputNumber, DatePicker, Switch } from 'antd'
import style from './const.source.module.less'

export type ConstType = 'const-number' | 'const-string' | 'const-datetime' | 'const-boolean'

interface ConstSourceProps {
  type: ConstType
}

export default function ConstSource(props: ConstSourceProps) {
  const { type } = props

  return (
    <div className={style['const-source-wrapper']}>
      {type === 'const-number' && (
        <Form.Item className="const-source-form-item" name="value">
          <InputNumber />
        </Form.Item>
      )}

      {type === 'const-string' && (
        <Form.Item className="const-source-form-item" name="value">
          <Input />
        </Form.Item>
      )}

      {type === 'const-datetime' && (
        <Form.Item className="const-source-form-item" name="value">
          <DatePicker showTime />
        </Form.Item>
      )}

      {type === 'const-boolean' && (
        <Form.Item className="const-source-form-item" name="value" valuePropName="checked" initialValue={false}>
          <Switch />
        </Form.Item>
      )}
    </div>
  )
}
