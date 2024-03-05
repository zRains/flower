import { useEffect } from 'react'
import ReactFlow, { Background, Panel, ReactFlowProvider, useOnSelectionChange } from 'reactflow'
import RightSidebar from './RightSidebar'
import style from './index.module.less'
import useFStore from './store'
import 'reactflow/dist/style.css'

/** Custom nodes */
import ApiServiceNode from './nodes/ApiService.node'
import EndNode from './nodes/End.node'
import IconButtonNode from './nodes/IconButton.node'
import MessageNode from './nodes/Message.node'
import StartNode from './nodes/Start.node'
import ConditionChildNode from './nodes/condition/Child.node'
import ConditionHeaderNode from './nodes/condition/Header.node'
import CallStatusNode from './nodes/status/CallStatus.node'
import NullNode from './nodes/Null.node'

/** Custom edges */
import BasicStepEdge from './edges/BasicStep.edge'

const nodeTypes = {
  startNode: StartNode,
  endNode: EndNode,
  apiServiceNode: ApiServiceNode,
  conditionHeaderNode: ConditionHeaderNode,
  conditionChildNode: ConditionChildNode,
  iconButtonNode: IconButtonNode,
  messageNode: MessageNode,
  callStatusNode: CallStatusNode,
  nullNode: NullNode,
}

const edgeTypes = {
  basicStepEdge: BasicStepEdge,
}

function LayoutFlow() {
  const nodes = useFStore((store) => store.nodes)
  const edges = useFStore((store) => store.edges)
  const dagreLayout = useFStore((store) => store.dagreLayout)
  const closeNodeMenu = useFStore((store) => store.closeNodeMenu)
  const onNodesChange = useFStore((store) => store.onNodesChange)
  const onEdgesChange = useFStore((store) => store.onEdgesChange)
  const setSelectedNodes = useFStore((store) => store.setSelectedNodes)

  useOnSelectionChange({
    onChange: ({ nodes }) => setSelectedNodes(nodes),
  })

  useEffect(() => {
    console.log('re layout')

    dagreLayout('TB')
  }, [])

  return (
    <div className={style['flower-container']}>
      <section className="flower-render-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          edgesFocusable={false}
          zoomOnDoubleClick={false}
          onPaneClick={() => {
            /** 当点击flow面板时应该关闭所有节点弹出菜单 */
            closeNodeMenu()
          }}
          onError={(id, msg) => {
            if (id === '002') return

            console.warn(msg)
          }}
          defaultEdgeOptions={{ type: 'basicStepEdge' }}
          proOptions={{ hideAttribution: true }}
          fitView
        >
          <Background />
          <Panel position="top-right">
            <button onClick={() => dagreLayout('TB')}>Save</button>
            {/* <button onClick={() => addNode()}>Add Node</button> */}
            {/* <button onClick={() => onLayout('LR')}>LR layout</button> */}
          </Panel>
        </ReactFlow>
      </section>
      <RightSidebar />
    </div>
  )
}

export default function FlowerContainer() {
  return (
    <div className={style['flower-container']}>
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    </div>
  )
}
