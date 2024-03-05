import { Button, Form, Select } from 'antd'
import cn from 'classnames'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ClickInputEditorWidget from './ClickInputEditor.widget'
import style from './params.widget.module.less'

export default function ParamsWidget() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <section className={style['params-widget-wrapper']}>
      <div className="params-config-wrapper">
        <header className={cn('params-widget-header', { isCollapsed })}>
          <div className="collapsed-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1a2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1"
              />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
              />
            </svg>
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
                    label: '如何干掉产品',
                  },
                  {
                    value: 'lucy',
                    label: '如何升职加薪',
                  },
                  {
                    value: 'disabled',
                    label: '母猪的产后护理',
                  },
                  {
                    value: 'Yiminghe',
                    label: '谢谢',
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
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 100 100">
            <path
              fill="currentColor"
              d="M84.437 39.721H60.273V15.563a1.814 1.814 0 0 0-1.812-1.813H41.536a1.813 1.813 0 0 0-1.812 1.813l-.001 24.16l-24.159-.001c-.961 0-1.812.851-1.813 1.813V58.46a1.81 1.81 0 0 0 1.813 1.812h24.16v24.165a1.814 1.814 0 0 0 1.813 1.813H58.46a1.813 1.813 0 0 0 1.813-1.813V60.273l24.163-.001a1.81 1.81 0 0 0 1.813-1.813l.001-16.925a1.813 1.813 0 0 0-1.813-1.813"
            />
          </svg>
        </span>
        添加
      </Button>
    </section>
  )
}
