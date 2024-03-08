import { Button, Form, Select } from 'antd'
import cn from 'classnames'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ClickInputEditorWidget from './ClickInputEditor.widget'
import style from './params.widget.module.less'
import { ArrowDownIcon, DeleteIcon, PlusIcon } from '../../svgIcons'

export default function ParamsWidget() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <section className={style['params-widget-wrapper']}>
      <div className="params-config-wrapper">
        <header className={cn('params-widget-header', { isCollapsed })}>
          <div className="collapsed-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            <ArrowDownIcon />
          </div>
          <div className="params-widget-name">
            <Form.Item
              className="params-widget-name-box"
              name="name"
              initialValue={uuidv4()}
              rules={[{ required: true }]}
              wrapperCol={{ span: 24 }}
            >
              <ClickInputEditorWidget />
            </Form.Item>
          </div>
          <div className="delete-btn">
            <DeleteIcon />
          </div>
        </header>
        {!isCollapsed && (
          <main>
            <Form.Item
              label="类型"
              name="type"
              initialValue={'jack'}
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Select
                options={[
                  {
                    value: 'jack',
                    label: 'a',
                  },
                  {
                    value: 'lucy',
                    label: 'b',
                  },
                  {
                    value: 'disabled',
                    label: 'c',
                  },
                  {
                    value: 'Yiminghe',
                    label: 'd',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="值"></Form.Item>
          </main>
        )}
      </div>
      <Button className="params-add-btn" block>
        <span role="img" aria-label="plus" className="anticon anticon-plus">
          <PlusIcon />
        </span>
        添加
      </Button>
    </section>
  )
}
