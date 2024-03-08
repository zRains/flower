import { Button, Modal } from 'antd'
import style from './conditionChild.panel.module.less'
import { useState } from 'react'
import ConditionEditor from './widgets/conditionEditor'

interface ConditionChildPanelProps {}

export default function ConditionChildPanel(props: ConditionChildPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className={style['condition-child-panel-wrapper']}>
      <Button className="open-modal-btn" block onClick={() => setIsModalOpen(true)}>
        配置条件
      </Button>
      <Modal
        wrapClassName={style['condition-modal-wrapper']}
        width={800}
        title="配置条件"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="condition-editor-box">
          <ConditionEditor />
        </div>
      </Modal>
    </div>
  )
}
