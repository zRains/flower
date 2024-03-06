import { CSSProperties, memo } from 'react'
import style from './index.module.less'

interface BracketProps {
  color?: string
}

export default memo(function Bracket(props: BracketProps) {
  return (
    <div className={style['bracket-wrapper']} style={{ '--bracket-color': props.color } as CSSProperties}>
      <div className="bracket">
        <div className="curly-top"></div>
        <div className="pip"></div>
      </div>
    </div>
  )
})
