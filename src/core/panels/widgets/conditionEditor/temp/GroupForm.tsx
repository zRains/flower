import { Button, Select } from 'antd'
import BaseForm, { FormRefProps } from './BaseForm'
import React, { useEffect, useState } from 'react'
import { ConditionType, IfType, OperatorType } from './enum'
import { Condition } from './interface'
import styles from './index.module.less'
import { btnOptions } from './options'

const { Option } = Select

interface GroupFormProps {
  condition: Condition
  deleteGroup?: (item: Condition) => void
}

export default function GroupForm(props: GroupFormProps) {
  const { condition, deleteGroup } = props
  const [data, setData] = useState<Condition>(condition)

  useEffect(() => {
    setData(condition)
  }, [condition])

  function addSimple() {
    data?.group?.children.push({
      type: data.group?.type,
      if: IfType[' '],
      variable: '',
      operator: OperatorType.存在,
      value: '',
      form: React.createRef<FormRefProps>(),
    })
    setData({ ...data })
  }

  function addGroup(type?: ConditionType) {
    if (type) {
      data.group?.children?.push({
        type: data.group.type,
        group: {
          type: type,
          children: [
            {
              type: type,
              if: IfType[' '],
              variable: '',
              operator: OperatorType.存在,
              value: '',
              form: React.createRef<FormRefProps>(),
            },
            {
              type: type,
              if: IfType[' '],
              variable: '',
              operator: OperatorType.存在,
              value: '',
              form: React.createRef<FormRefProps>(),
            },
          ],
        },
      })
      setData({ ...data })
    } else {
      addSimple()
    }
  }

  function deleteItem(item: Condition) {
    const index = data.group?.children?.findIndex((child) => child === item)
    if (index !== undefined) {
      data.group?.children?.splice(index, 1)
    }
    setData({ ...data })
  }

  return (
    <div className={data.type !== ConditionType.简单 ? styles.group : ''}>
      {data?.group?.children.map((item, index) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            <span style={{ width: 50, fontWeight: 'bold' }}>{index !== 0 ? item.type : ''}</span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {item.group ? (
                <GroupForm condition={item} deleteGroup={() => deleteItem(item)} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {index === 0 && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: 100, marginRight: 16 }}>Not</div>
                      <div style={{ width: 174, marginRight: 16 }}>Variable</div>
                      <div style={{ width: 200, marginRight: 16 }}>Operator</div>
                      <div style={{ width: 100, marginRight: 16 }}>Value</div>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <BaseForm ref={item.form} initialValues={item} />
                    <span style={{ fontSize: 18, marginTop: -24 }} onClick={() => deleteItem(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
      {data.type !== ConditionType.简单 && (
        <div className={styles.btnGroup}>
          <Select placeholder={'添加'} style={{ width: 120, marginRight: 12 }} onSelect={addGroup}>
            {btnOptions.map((btn) => (
              <Option value={btn.value} key={btn.value}>
                {btn.label}
              </Option>
            ))}
          </Select>
          {data.group?.children?.length === 0 && deleteGroup && (
            <Button danger onClick={() => deleteGroup(data)}>
              删除
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
