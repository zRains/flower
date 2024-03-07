import cn from 'classnames'
import { useState } from 'react'
import Bracket from './Bracket'
import ConditionerItem, { ConditionTypeSelector } from './ConditionerItem'
import style from './index.module.less'
import { DeleteIcon } from '../../../svgIcons'

interface ConditionerProps {
  trace?: boolean
}

export default function Conditioner(props: ConditionerProps) {
  const [condition, setCondition] = useState('AND')
  const [isNotOperating, setIsNotOperating] = useState(false)

  return (
    <div className={cn(style['conditioner-wrapper'], `condition-${condition.toLocaleLowerCase()}`)}>
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
        <ConditionerItem />
        <ConditionerItem />
        {props.trace && <Conditioner />}
      </div>
    </div>
  )
}
