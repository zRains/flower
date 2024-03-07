import { Form, type FormListFieldData } from 'antd'
import { DeleteIcon, PlusIcon } from '../../../svgIcons'
import Bracket from './Bracket'
import ConditionerItem, { ConditionTypeSelector, NotOperatingBtn } from './ConditionerItem'
import cn from 'classnames'
import style from './conditioner.module.less'
import { useEffect, useRef } from 'react'

interface ConditionerProps {
  field?: FormListFieldData
  trace?: boolean
  className?: string
  fieldPath?: Array<string | number>
  removeHandle?: () => void
}

export default function Conditioner(props: ConditionerProps) {
  const { fieldPath = [], field, className, removeHandle } = props
  const form = Form.useFormInstance()
  const formWatcher = Form.useWatch([...fieldPath]) ?? {}
  const formWatcherRef = useRef(formWatcher)
  const formListUtilHandles = useRef<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    add?: (defaultValue?: any, insertIndex?: number | undefined) => void
    remove?: (index: number | number[]) => void
  }>({})

  useEffect(() => {
    if (formWatcherRef.current.type) {
      if (
        formWatcherRef.current.type !== 'NORMAL' &&
        formWatcher.type === 'NORMAL' &&
        formWatcher?.children?.length > 0
      ) {
        const { variable = '', operator = 'eq', value = '', not = false } = formWatcher.children[0]

        form.setFieldValue([...fieldPath], { type: formWatcher.type, variable, operator, value, not, children: [] })
      }

      if (formWatcherRef.current.type === 'NORMAL' && ['AND', 'OR'].includes(formWatcher.type)) {
        const { variable = '', operator = 'eq', value = '', not = false } = formWatcherRef.current

        form.setFieldValue(
          [...fieldPath, 'children'],
          [{ type: 'NORMAL', variable, operator, value, not, children: [] }],
        )
      }
    }

    formWatcherRef.current = formWatcher
  }, [formWatcher])

  if (formWatcher.type === 'NORMAL') {
    return <ConditionerItem fieldPath={fieldPath} field={field} removeHandle={removeHandle} />
  }

  return (
    <div className={cn(style['conditioner-wrapper'], className)}>
      <section className="conditioner-selector-wrapper">
        <div className="conditioner-selector">
          {formWatcher.not && <div className="is-not-operating">非</div>}
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
      <Bracket color={formWatcher.type === 'AND' ? '#1bcd77' : '#ff8552'} />
      <div className="conditioner-item-container">
        <Form.List name={field ? [field.name, 'children'] : [...fieldPath, 'children']}>
          {(fields, { add, remove }) => {
            formListUtilHandles.current.add = add
            formListUtilHandles.current.remove = remove

            return (
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
                  style={{ color: formWatcher.type === 'AND' ? '#1bcd77' : '#ff8552' }}
                >
                  <span
                    onClick={() =>
                      formListUtilHandles.current.add?.({
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
            )
          }}
        </Form.List>
      </div>
    </div>
  )
}
