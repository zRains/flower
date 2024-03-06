import Conditioner from './Conditioner'
import style from './index.module.less'

interface ConditionEditorProps {}

export default function ConditionEditor(props: ConditionEditorProps) {
  return (
    <div className={style['condition-editor-wrapper']}>
      <Conditioner />
    </div>
  )
}
