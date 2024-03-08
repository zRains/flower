import { Form } from 'antd'
import { useEffect, useMemo } from 'react'
import type { Node } from 'reactflow'
import style from './index.module.less'
import FlowerPanel from './panels/Flower.panel'
import StartPanel from './panels/Start.panel'
import ApiServicePanel from './panels/apiService.panel'
import ConditionChildPanel from './panels/conditionChild.panel'
import MessagePanel from './panels/message.panel'
import ClickInputEditorWidget from './panels/widgets/ClickInputEditor.widget'
import useFStore from './store'

export default function RightSidebar() {
  const [form] = Form.useForm()
  const selectedNodes = useFStore((state) => state.selectedNodes)
  const nodes = useFStore((state) => state.nodes)
  const setNodes = useFStore((state) => state.setNodes)

  const NodePanel = useMemo(() => {
    if (selectedNodes.length === 0) {
      return FlowerPanel
    } else {
      switch (selectedNodes[0].type) {
        case 'startNode':
          return StartPanel
        case 'apiServiceNode':
          return ApiServicePanel
        case 'messageNode':
          return MessagePanel
        case 'conditionChildNode':
          return ConditionChildPanel
        default:
          return () => <></>
      }
    }
  }, [selectedNodes])

  useEffect(() => {
    if (selectedNodes[0]) {
      form.setFieldsValue(selectedNodes[0].data)
    }
  }, [form, selectedNodes])

  return (
    <section className={style['flower-right-sidebar-container']}>
      <div className="flower-right-sidebar">
        <Form
          className="sidebar-form"
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          requiredMark={false}
          onValuesChange={(_, allValues) => {
            if (selectedNodes[0]) {
              const targetNode = nodes.find((node) => node.id === selectedNodes[0].id)!

              selectedNodes[0].data = allValues
              targetNode.data = allValues
              setNodes([...nodes])
            }
          }}
        >
          <header className="sidebar-form-header">
            <SidebarHeader node={selectedNodes[0]} />
          </header>
          <main className="sidebar-form-item-container">
            {/* <StartPanel /> */}
            {/* <ApiServicePanel /> */}
            {/* <FlowerPanel /> */}
            <NodePanel />
          </main>
        </Form>
      </div>
    </section>
  )
}

interface SidebarHeaderProps {
  node?: Node
}

function SidebarHeader(props: SidebarHeaderProps) {
  const { node } = props

  if (typeof node === 'undefined') return <span>基本信息</span>

  if (node.type === 'startNode') return <span>入参</span>

  if (node.type === 'endNode') return <span>出参</span>

  return (
    <div style={{ width: '80%' }}>
      <Form.Item name="name" noStyle wrapperCol={{ span: 24 }}>
        <ClickInputEditorWidget />
      </Form.Item>
    </div>
  )
}
