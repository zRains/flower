import { useNodeId } from 'reactflow'
import useFStore from '../../store'
import cn from 'classnames'
import style from '../../index.module.less'
import { PlusIcon } from '../../svgIcons'

export default function AddChildBtn() {
  const currentNodeId = useNodeId()
  const addNode = useFStore((state) => state.addNode)

  return (
    <div className={cn(style['menu-wrapper'], 'attach-menu')}>
      <div className="menu-trigger" onClick={() => addNode(currentNodeId!, 'conditionChildNode')}>
        <span className="menu-trigger-icon">
          <PlusIcon />
        </span>
      </div>
    </div>
  )
}
