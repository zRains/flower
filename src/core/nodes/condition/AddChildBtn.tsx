import { useNodeId } from 'reactflow'
import useFStore from '../../store'
import cn from 'classnames'
import style from '../../index.module.less'

export default function AddChildBtn() {
  const currentNodeId = useNodeId()
  const addNode = useFStore((state) => state.addNode)

  return (
    <div className={cn(style['menu-wrapper'], 'attach-menu')}>
      <div className="menu-trigger" onClick={() => addNode(currentNodeId!, 'conditionChildNode')}>
        <span className="menu-trigger-icon">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="plus"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
            <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path>
          </svg>
        </span>
      </div>
    </div>
  )
}
