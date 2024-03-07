import { Form, type FormListFieldData } from 'antd'
import { DeleteIcon, PlusIcon } from '../../../svgIcons'
import Bracket from './Bracket'
import ConditionerItem, { ConditionTypeSelector, NotOperatingBtn } from './ConditionerItem'
import cn from 'classnames'
import style from './conditioner.module.less'

interface ConditionerProps {
  field?: FormListFieldData
  trace?: boolean
  className?: string
  fieldPath?: Array<string | number>
  removeHandle?: () => void
}

export default function Conditioner(props: ConditionerProps) {
  const { fieldPath = [], field, className, removeHandle } = props
  const formTypeWatcher = Form.useWatch<string>([...fieldPath, 'type'])
  const formNotWatcher = Form.useWatch<string>([...fieldPath, 'not'])

  if (formTypeWatcher === 'NORMAL') {
    return <ConditionerItem fieldPath={fieldPath} field={field} removeHandle={removeHandle} />
  }

  return (
    <div className={cn(style['conditioner-wrapper'], className)}>
      <section className="conditioner-selector-wrapper">
        <div className="conditioner-selector">
          {formNotWatcher && <div className="is-not-operating">非</div>}
          <Form.Item name={field ? [field.name, 'type'] : [...fieldPath, 'type']}>
            <ConditionTypeSelector />
          </Form.Item>
          <div className="conditioner-operations">
            <Form.Item name={field ? [field.name, 'not'] : [...fieldPath, 'not']} noStyle>
              <NotOperatingBtn />
            </Form.Item>
            <div className="delete-operating" onClick={removeHandle}>
              <DeleteIcon />
            </div>
          </div>
        </div>
      </section>
      <Bracket color={formTypeWatcher === 'AND' ? '#1bcd77' : '#ff8552'} />
      <div className="conditioner-item-container">
        <Form.List name={field ? [field.name, 'children'] : [...fieldPath, 'children']}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Conditioner
                  className="conditioner-wrapper-inner"
                  key={field.key}
                  fieldPath={[...fieldPath, 'children', field.name]}
                  field={field}
                  removeHandle={() => remove(field.name)}
                />
              ))}
              <div
                className="conditioner-item-add-btn"
                style={{ color: formTypeWatcher === 'AND' ? '#1bcd77' : '#ff8552' }}
              >
                <span
                  onClick={() =>
                    add({
                      type: 'NORMAL',
                      not: false,
                      variable: '',
                      operator: 'eq',
                      value: '',
                      children: [],
                    })
                  }
                >
                  <PlusIcon /> <span>添加条件</span>
                </span>
              </div>
            </>
          )}
        </Form.List>
      </div>
    </div>
  )
}
