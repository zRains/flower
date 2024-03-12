import { Button, Collapse, Form, Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ArrowDownIcon, DeleteIcon, PlusIcon } from '../../svgIcons'
import ClickInputEditorWidget from './ClickInputEditor.widget'
import style from './params.widget.module.less'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ParamsItemData<Data = any> {
  id: string
  type: string
  data: Data
}

interface ParamsWidgetProps {
  value?: Array<ParamsItemData>
  onChange?: (value: Array<ParamsItemData>) => void
}

export default function ParamsWidget(props: ParamsWidgetProps) {
  const { value, onChange } = props

  return (
    <section className={style['params-widget-wrapper']}>
      <div className="params-item-container">
        <ParamsItem />
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

function ParamsItem() {
  return (
    <Collapse className={style['params-item']} collapsible="icon" expandIcon={() => <ArrowDownIcon />}>
      <Collapse.Panel
        forceRender
        header={
          <header className="params-item-header">
            <Form.Item
              className="params-item-name-box"
              name="name"
              initialValue={uuidv4()}
              rules={[{ required: true }]}
              wrapperCol={{ span: 24 }}
            >
              <ClickInputEditorWidget />
            </Form.Item>
          </header>
        }
        extra={<DeleteIcon />}
        key="418-I-am-a-teapot"
      >
        <main className="params-item-container">
          <Form.Item label="类型" name="type" initialValue={'jack'} rules={[{ required: true, message: '请输入名称' }]}>
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
              ]}
            />
          </Form.Item>
          <Form.Item label="值"></Form.Item>
        </main>
      </Collapse.Panel>
    </Collapse>
  )
}
