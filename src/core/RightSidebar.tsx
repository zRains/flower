import { Form, Input } from 'antd'
import style from './index.module.less'
import StartPanel from './panels/Start.panel'
import ApiServicePanel from './panels/apiService.panel'

export default function RightSidebar() {
  return (
    <section className={style['flower-right-sidebar-container']}>
      <div className="flower-right-sidebar">
        <header>
          <div>基本信息</div>
        </header>
        <main className="sidebar-form-container">
          <Form
            className="sidebar-form"
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 19 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            requiredMark={false}
          >
            {/* <Form.Item
              label="名称"
              name="name"
              initialValue={'如何干掉产品'}
              rules={[{ required: true, message: '请输入名称' }]}
            >
              <Input />
            </Form.Item> */}
            <StartPanel />
            {/* <ApiServicePanel /> */}
          </Form>
        </main>
      </div>
    </section>
  )
}
