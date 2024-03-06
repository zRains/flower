import cn from 'classnames'
import { useState } from 'react'
import Bracket from './Bracket'
import ConditionerItem, { ConditionTypeSelector } from './ConditionerItem'
import style from './index.module.less'

export default function Conditioner() {
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
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4zm2 2h6V4H9zM6.074 8l.857 12H17.07l.857-12zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <Bracket color={condition === 'AND' ? '#1bcd77' : '#ff8552'} />
      <div className="conditioner-item-container">
        <ConditionerItem />
        <ConditionerItem />
      </div>
    </div>
  )
}
