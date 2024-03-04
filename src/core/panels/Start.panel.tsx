import style from './start.panel.module.less'
import ParamsWidget from './widgets/Params.widget'

export default function StartPanel() {
  return (
    <div className={style['start-panel-wrapper']}>
      <ParamsWidget />
    </div>
  )
}
