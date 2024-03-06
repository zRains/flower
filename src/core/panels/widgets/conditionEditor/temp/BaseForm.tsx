import { Form, FormInstance, Input, InputNumber, Select } from 'antd'
import { enum2Options } from './util'
import { ConstantType, DataType, IfType, OperatorType } from './enum'
import React, { ReactNode, useImperativeHandle } from 'react'
import styles from './index.module.less'
import { constantOptions, operatorOptions } from './options'

const { Option } = Select

interface SimpleFormProps {
  initialValues?: object
}

export interface FormRefProps {
  form: FormInstance
}

const BaseForm = React.forwardRef<FormRefProps, SimpleFormProps>((props, ref) => {
  const { initialValues = {} } = props
  const [form] = Form.useForm()
  const dataOptions = enum2Options(DataType)
  const ifOptions = enum2Options(IfType)

  useImperativeHandle(ref, () => ({
    form,
  }))

  return (
    <>
      <Form className={styles.baseForm} form={form} layout={'inline'} autoComplete="off" initialValues={initialValues}>
        <Form.Item name="if">
          <Select style={{ width: 100 }}>
            {ifOptions.map((option) => {
              return (
                <Option value={option.value} key={option.value}>
                  {option.label}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="variable"
          rules={[
            {
              validator: (rule, value) => {
                return new Promise((resolve, reject) => {
                  if (!value) {
                    reject('必填项')
                  } else if (value.startsWith('$')) {
                    resolve('')
                  } else {
                    reject('Must use JsonPath')
                  }
                })
              },
            },
          ]}
        >
          <Input placeholder={'$.stateInput.key'} />
        </Form.Item>

        <Form.Item name="operator">
          <Select
            style={{ width: 200 }}
            onChange={(value) => {
              form.setFieldsValue({ value: null, constantType: null })
              if (value === OperatorType.存在) {
                form.validateFields(['value']).then()
              }
            }}
          >
            {operatorOptions.map((option) => {
              return (
                <Option value={option.value} key={option.value}>
                  {option.label}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={(p, n) => p.operator !== n.operator} style={{ marginRight: 0 }}>
          {(form) => {
            const value = form.getFieldsValue()
            const list = [
              OperatorType.等于,
              OperatorType.小于,
              OperatorType.小于等于,
              OperatorType.大于,
              OperatorType.大于等于,
            ]
            if (!list.includes(value.operator)) {
              return null
            }
            return (
              <Form.Item name="constantType" rules={[{ required: true, message: '必填项' }]}>
                <Select style={{ width: 170 }} onChange={() => form.setFieldsValue({ value: null })}>
                  {constantOptions.slice(0, value.operator === OperatorType.等于 ? 8 : 6).map((option) => {
                    return (
                      <Option value={option.value} key={option.value}>
                        {option.label}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            )
          }}
        </Form.Item>
        <Form.Item
          shouldUpdate={(p, n) => (p.operator && p.operator !== n.operator) || p.constantType !== n.constantType}
        >
          {(form) => {
            const value = form.getFieldsValue().operator ? form.getFieldsValue() : initialValues
            const list = [
              OperatorType.等于,
              OperatorType.小于,
              OperatorType.小于等于,
              OperatorType.大于,
              OperatorType.大于等于,
            ]
            const width = list.includes(value.operator) ? 174 : 360
            let disabled = false
            if (value.operator === OperatorType.存在 || (list.includes(value.operator) && !value.constantType)) {
              disabled = true
            }
            const is$ = [
              ConstantType.布尔变量,
              ConstantType.时间戳变量,
              ConstantType.数字变量,
              ConstantType.字符串变量,
            ].includes(value.constantType)
            let com: ReactNode = <Input disabled={disabled} style={{ width }} />
            if (list.includes(value.operator)) {
              if (value.constantType === ConstantType.数字常量) {
                com = <InputNumber style={{ width }} />
              } else if (value.constantType === ConstantType.布尔常量) {
                com = (
                  <Select style={{ width }}>
                    <Option value={'true'}>true</Option>
                    <Option value={'false'}>false</Option>
                  </Select>
                )
              } else if (is$) {
                com = <Input placeholder={'$.stateInput.key'} />
              }
            } else if (value.operator === OperatorType.类型) {
              com = (
                <Select style={{ width }}>
                  {dataOptions.map((option) => {
                    return (
                      <Option value={option.value} key={option.value}>
                        {option.label}
                      </Option>
                    )
                  })}
                </Select>
              )
            }
            return (
              <Form.Item
                name="value"
                rules={[
                  {
                    validator: (rule, value, callback) => {
                      return new Promise((resolve, reject) => {
                        if (disabled) {
                          resolve('')
                        } else if (value === undefined || value === null) {
                          reject('必填项')
                        } else if (!is$) {
                          resolve('')
                        } else if (value.startsWith('$')) {
                          resolve('')
                        } else {
                          reject('Must use JsonPath')
                        }
                      })
                    },
                  },
                ]}
              >
                {com}
              </Form.Item>
            )
          }}
        </Form.Item>
      </Form>
    </>
  )
})

export default BaseForm
