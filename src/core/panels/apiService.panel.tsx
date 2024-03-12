import { Collapse, Form, Select, Tag } from 'antd'
import cn from 'classnames'
import { ArrowDownIcon } from '../svgIcons'
import style from './apiService.panel.module.less'
import themeStyle from '../theme.module.less'
import SourceSelector from './widgets/sourceSelector'

const configure: ConfigureItem = {
  id: '66d540a3-49d4-4c8a-802a-8be009b835a6',
  name: 'inputs',
  required: true,
  type: 'GROUP',
  children: [
    {
      id: '66d540a3-49d4-4c8a-802a-8be009b835a7',
      name: 'path',
      required: true,
      type: 'GROUP',
      children: [
        {
          name: 'name',
          type: 'TEXT',
          required: false,
          id: '7af55468-105c-4c64-bcc5-b51d96f85b6a',
        },
      ],
    },
    {
      id: '66d540a3-49d4-4c8a-802a-8be009b835a5',
      name: 'body',
      required: true,
      type: 'OBJECT',
      children: [
        {
          name: 'name',
          type: 'TEXT',
          required: false,
          id: '7af55468-105c-4c64-bcc5-b51d96f85b6a',
        },
        {
          name: 'age',
          type: 'INTEGER',
          defaultValue: 1,
          required: false,
          id: '292770be-2aad-4514-b2b0-baafce3436d8',
        },
        {
          name: 'fav',
          type: 'ARRAY',
          required: false,
          id: '84bc4afe-6ab6-49db-956b-43e45a2e431a',
          arrayType: 'TEXT',
        },
        {
          name: 'has',
          type: 'BOOLEAN',
          required: false,
          id: 'b20f7ee1-1add-4b83-933a-434553331574',
        },
        {
          name: 'info',
          type: 'OBJECT',
          required: false,
          id: 'e3ff8315-39bd-43fb-9e03-02ab7ec59864',
          children: [
            {
              name: 'timestamp',
              type: 'INTEGER',
              required: false,
              id: 'd87af4c9-978d-4913-8a97-47e47009b13d',
            },
          ],
        },
        {
          name: 'ckck',
          type: 'FLOAT',
          required: false,
          id: 'ccefc46f-8b7a-4b8c-ac4d-4daa1352d642',
        },
      ],
    },
  ],
}

const d: ConfigureItem = {
  id: '66d540a3-49d4-4c8a-802a-8be009b835a5',
  name: 'outputs',
  required: true,
  type: 'GROUP',
  children: [
    {
      name: 'name',
      type: 'TEXT',
      required: false,
      id: '7af55468-105c-4c64-bcc5-b51d96f85b6a',
    },
  ],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ConfigureItem<T = any> {
  id: string
  name: string
  type: 'TEXT' | 'OBJECT' | 'FLOAT' | 'INTEGER' | 'BOOLEAN' | 'ARRAY' | 'GROUP'
  defaultValue?: T
  arrayType?: 'TEXT' | 'OBJECT' | 'FLOAT' | 'INTEGER' | 'BOOLEAN' | 'ARRAY'
  required?: boolean
  children?: Array<ConfigureItem>
}

export default function ApiServicePanel() {
  return (
    <div className={style['api-service-panel-wrapper']}>
      <Form.Item label="选择接口" name="interface" initialValue="i-1">
        <Select
          className={themeStyle['flower-select']}
          suffixIcon={<ArrowDownIcon />}
          options={[
            {
              value: 'i-1',
              label: '接口1',
            },
            {
              value: 'i-2',
              label: '接口2',
            },
          ]}
        />
      </Form.Item>
      <section className="api-service-inputs">
        <div className="api-service-inputs-label">所需入参：</div>
        <ObjectConfigure item={configure} namePath={[configure.name]} />
      </section>
      <section className="api-service-outputs">
        <div className="api-service-outputs-label">所需出参：</div>
        <ObjectConfigure item={d} namePath={[d.name]} />
      </section>
    </div>
  )
}

interface ApiServiceConfigureProps {
  item: ConfigureItem
  namePath: Array<string | number>
  isDarker?: boolean
}

function ObjectConfigure(props: ApiServiceConfigureProps) {
  const { item, namePath, isDarker } = props

  return (
    <Collapse
      className={cn(style['object-configure'], { 'is-darker': isDarker }, 'object-configure-public')}
      collapsible="icon"
      expandIcon={() => <ArrowDownIcon />}
    >
      <Collapse.Panel
        header={
          <header className={cn('object-configure-header', { isCollapsed: false })}>
            <div className="object-configure-header-title">
              <span>{item.name}</span>
              {item.type === 'OBJECT' && (
                <Tag className="object-configure-header-tag" color="#108ee9">
                  Object
                </Tag>
              )}
            </div>
          </header>
        }
        key="418-I-am-a-teapot"
      >
        <main className="object-configure-item-container">
          {item.children?.map((child, idx) => (
            <ApiServiceConfigureItem key={idx} item={child} namePath={namePath} isDarker={!isDarker} />
          ))}
        </main>
      </Collapse.Panel>
    </Collapse>
  )
}

interface ApiServiceConfigureItemProps {
  item: ConfigureItem
  namePath: Array<string | number>
  isDarker?: boolean
}

function ApiServiceConfigureItem(props: ApiServiceConfigureItemProps) {
  const { item, namePath, isDarker } = props

  if (item.type === 'OBJECT' || item.type === 'GROUP') {
    return <ObjectConfigure item={item} namePath={[...namePath, item.name]} isDarker={isDarker} />
  }

  return (
    <div className="input-config-item">
      <div className="input-config-item-label">
        {item.name}({item.type})
      </div>
      <Form.Item name={[...namePath, item.name]} wrapperCol={{ span: 24 }}>
        <SourceSelector />
      </Form.Item>
    </div>
  )
}
