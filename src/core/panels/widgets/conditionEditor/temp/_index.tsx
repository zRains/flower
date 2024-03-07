import { FormRefProps } from './BaseForm'
import React, { useState } from 'react'
import { Button, Select } from 'antd'
import { ConditionType, IfType, OperatorType } from './enum'
import { Condition } from './interface'
import GroupForm from './GroupForm'
import { conditionOptions } from './options'

const { Option } = Select

function getData(type: ConditionType): Condition {
  const num = type === ConditionType.简单 ? 1 : 2

  return {
    type,
    group: {
      type,
      children: Array.from({ length: num }).map(() => {
        return {
          type: type,
          if: IfType[' '],
          variable: '',
          operator: OperatorType.存在,
          value: '',
          form: React.createRef<FormRefProps>(),
        }
      }),
    },
  }
}

interface ConditionProps {
  value?: Condition
  onOk?: (data: Condition) => void
  onCancel?: () => void
}

export default function Index(props: ConditionProps) {
  const { value, onOk, onCancel } = props
  const initData = value || getData(ConditionType.简单)
  const initSData = !value || value?.type === ConditionType.简单 ? getData(ConditionType.与) : value
  const [data, setData] = useState<Condition>(initData)
  const [sData, setSData] = useState<Condition>(initSData)

  function getForm(data: Condition): any {
    if (data.form) {
      return [data.form.current?.form.validateFields()]
    }
    if (data.group?.children) {
      return data.group.children.map((child) => {
        return getForm(child)
      })
    }
  }

  function setValue(data: Condition) {
    if (data.form) {
      const value = data.form.current?.form.getFieldsValue()
      delete data.form
      Object.assign(data, value)
    }
    data.group?.children.forEach((child) => setValue(child))
  }

  function submit() {
    const allForm = Array.prototype.flatMap.apply(getForm(data))
    Promise.all(allForm).then((res) => {
      setValue(data)
      onOk?.(data)
    })
  }

  function changeType(type: ConditionType) {
    let newData = data
    if (type === ConditionType.简单) {
      newData = {
        type,
        group: {
          type,
          children: sData.group!?.children.slice(0, 1),
        },
      }
    } else {
      if (sData.group) {
        sData.group.type = type
        sData.group.children?.forEach((child) => (child.type = type))
        newData = sData
      }
    }
    setData({ ...newData })
  }

  return (
    <>
      <div style={{ flex: 1, overflow: 'auto', paddingRight: 24 }}>
        <Select style={{ width: 100, marginBottom: 16 }} defaultValue={data.type} onChange={changeType}>
          {conditionOptions.map((option) => {
            return (
              <Option value={option.value} key={option.value}>
                {option.label}
              </Option>
            )
          })}
        </Select>
        <GroupForm condition={data} />
      </div>
      <div className={'ant-modal-footer'} style={{ margin: '20px -20px -20px -20px' }}>
        <Button type="primary" onClick={submit}>
          提交
        </Button>
      </div>
    </>
  )
}
