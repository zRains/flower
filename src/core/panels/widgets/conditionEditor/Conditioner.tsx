import cn from 'classnames'
import { useState } from 'react'
import { Form } from 'antd'
import { DeleteIcon, PlusIcon } from '../../../svgIcons'
import Bracket from './Bracket'
import ConditionerItem, { ConditionTypeSelector } from './ConditionerItem'
import style from './conditioner.module.less'

interface ConditionerProps {
  trace?: boolean
}

export default function Conditioner(props: ConditionerProps) {
  const [condition, setCondition] = useState('AND')
  const [isNotOperating, setIsNotOperating] = useState(false)

  return (
    <div className={style['conditioner-wrapper']}>
      <section className="conditioner-selector-wrapper">
        <div className="conditioner-selector">
          {isNotOperating && <div className="is-not-operating">非</div>}
          <ConditionTypeSelector value={condition} onChange={setCondition} />
          <div className="conditioner-operations">
            <div
              className={cn('not-operating', { active: isNotOperating })}
              onClick={() => setIsNotOperating(!isNotOperating)}
            >
              非
            </div>
            <div className="delete-operating">
              <DeleteIcon />
            </div>
          </div>
        </div>
      </section>
      <Bracket color={condition === 'AND' ? '#1bcd77' : '#ff8552'} />
      <div className="conditioner-item-container">
        {/* <ConditionerItem /> */}
        {/* <ConditionerItem /> */}
        {/* {props.trace && <Conditioner />} */}
        {/* <ConditionerItem /> */}
        <div className="conditioner-item-add-btn" style={{ color: condition === 'AND' ? '#1bcd77' : '#ff8552' }}>
          <PlusIcon /> <span>添加条件</span>
        </div>
      </div>
    </div>
  )
}
