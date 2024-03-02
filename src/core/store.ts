import dagre from '@dagrejs/dagre'
import {
  EdgeChange,
  NodeChange,
  Position,
  applyEdgeChanges,
  applyNodeChanges,
  type NodeProps,
  type EdgeProps,
  type Edge,
  type Node,
  type OnEdgesChange,
  type OnNodesChange,
} from 'reactflow'
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

import { initialEdges, initialNodes } from './nodeMock'
import { getNodeSize } from './utils'

type FState = {
  nodes: Array<Node>
  edges: Array<Edge>
}

type FAction = {
  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  dagreLayout: (direction?: 'TB' | 'LR') => void
  closeNodeMenu: (excludeNode?: string) => void

  /**
   * 在目标节点后添加一个子节点
   * @param sourceNodeId 目标节点
   * @param type 子节点类型
   */
  addNode: (sourceNodeId: string, type: string) => void

  /**
   * 删除目标节点
   * @param sourceNodeId 目标节点id
   * @param sourceNodeId 目标节点类型
   */
  delNode: (nodeId: string, type: string) => void
}

const useFStore = create<FState & FAction>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    })
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    })
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes })
  },
  setEdges: (edges: Edge[]) => {
    set({ edges })
  },
  dagreLayout: (direction: 'TB' | 'LR' = 'TB') => {
    const isHorizontal = direction === 'LR'
    const dagreGraph = new dagre.graphlib.Graph()
    const { nodes, edges } = get()

    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: direction, ranksep: 85 })

    nodes.forEach((node) => {
      /** 需要深克隆 */
      dagreGraph.setNode(node.id, { ...getNodeSize(node.type) })
    })

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id)
      const { width: nodeWidth, height: nodeHeight } = getNodeSize(node.type)

      node.targetPosition = isHorizontal ? Position.Left : Position.Top
      node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom

      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      }

      return node
    })

    set({ nodes: [...nodes], edges: [...edges] })
  },
  closeNodeMenu: (excludeNode?: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id !== excludeNode && Reflect.has(node.data, 'menuOpen')) {
          node.data = {
            ...node.data,
            menuOpen: false,
          }
        }

        return node
      }),
    })
  },
  addNode: (sourceNodeId: string, type: string) => {
    const { nodes, edges, closeNodeMenu, dagreLayout } = get()
    switch (type) {
      case 'apiServiceNode':
        {
          const newNode = createNode({ type })
          // 正常情况下关联Edge是存在的
          const sourceRelatedEdge = edges.find((edge) => edge.source === sourceNodeId)!
          const newEdge = createEdge(sourceNodeId, newNode.id)

          sourceRelatedEdge.source = newNode.id
          set({ nodes: [...nodes, newNode], edges: [newEdge, ...edges] })
        }
        break
      case 'conditionHeaderNode': {
        const { nodes: conditionNodes, edges: conditionEdges } = createConditionRes()
        // 正常情况下关联Edge是存在的
        const sourceRelatedEdge = edges.find((edge) => edge.source === sourceNodeId)!
        const newEdge = createEdge(conditionNodes[3].id, sourceRelatedEdge.target)

        sourceRelatedEdge.target = conditionNodes[0].id
        set({ nodes: [...nodes, ...conditionNodes], edges: [...edges, ...conditionEdges, newEdge] })
        break
      }
      case 'conditionChildNode': {
        const { nodes } = get()
        const targetNode = nodes.find((node) => node.id === sourceNodeId)!
        const newChildNode = createNode({ type, data: {} })
        const newHeaderToChildEdge = createEdge(sourceNodeId, newChildNode.id)
        const newChildToButtonEdge = createEdge(newChildNode.id, targetNode.data.__iconButtonNodes[0])

        newChildNode.data = {
          __targetNodes: [targetNode.data.__iconButtonNodes[0]],
          __headerNodes: [targetNode.id],
        }

        targetNode.data = {
          ...targetNode.data,
          __targetNodes: [...targetNode.data.__targetNodes, newChildNode.id],
        }

        set({ nodes: [...nodes, newChildNode], edges: [...edges, newHeaderToChildEdge, newChildToButtonEdge] })
        break
      }

      default:
        break
    }

    requestAnimationFrame(() => {
      closeNodeMenu()
      dagreLayout()
    })
  },
  delNode: (nodeId: string, type: string) => {
    const { nodes, edges, dagreLayout } = get()

    switch (type) {
      case 'apiServiceNode': {
        const targetRelatedEdge = edges.find((edge) => edge.target === nodeId)!
        const sourceRelatedEdge = edges.find((edge) => edge.source === nodeId)!

        targetRelatedEdge.target = sourceRelatedEdge.target

        set({
          nodes: nodes.filter((node) => node.id !== nodeId),
          edges: edges.filter((edge) => edge.id !== sourceRelatedEdge.id),
        })
        requestAnimationFrame(() => dagreLayout())
        break
      }

      case 'conditionChildNode': {
        const targetRelatedEdge = edges.find((edge) => edge.target === nodeId)!
        const sourceRelatedEdge = edges.find((edge) => edge.source === nodeId)!
        const relatedConditionHeaderNode = nodes.find((node) => node.id === targetRelatedEdge.source)!

        if (relatedConditionHeaderNode.data.targetNodes.length > 2) {
          set({
            nodes: nodes.filter((node) => node.id !== nodeId),
            edges: edges.filter((edge) => edge.id !== targetRelatedEdge.id || edge.id !== sourceRelatedEdge.id),
          })
        }

        break
      }

      default:
        break
    }
  },
}))

export default useFStore

function createConditionRes() {
  const newIconButtonNode = createNode({ type: 'iconButtonNode' })
  const newFirstChildNode = createNode({ type: 'conditionChildNode' })
  const newSecChildNode = createNode({ type: 'conditionChildNode' })
  const newHeaderNode = createNode({
    type: 'conditionHeaderNode',
    data: { __targetNodes: [newFirstChildNode.id, newSecChildNode.id], __iconButtonNodes: [newIconButtonNode.id] },
  })

  newFirstChildNode.data = {
    __targetNodes: [newIconButtonNode.id],
    __headerNodes: [newHeaderNode.id],
  }

  newSecChildNode.data = {
    __targetNodes: [newIconButtonNode.id],
    __headerNodes: [newHeaderNode.id],
  }

  return {
    nodes: [newHeaderNode, newFirstChildNode, newSecChildNode, newIconButtonNode],
    edges: [
      createEdge(newHeaderNode.id, newFirstChildNode.id),
      createEdge(newHeaderNode.id, newSecChildNode.id),
      createEdge(newFirstChildNode.id, newIconButtonNode.id),
      createEdge(newSecChildNode.id, newIconButtonNode.id),
    ],
  }
}

function createNode(nodeProps?: Partial<NodeProps>): Node {
  return {
    data: {},
    id: uuidv4(),
    position: { x: 0, y: 0 },
    draggable: false,
    connectable: false,
    ...nodeProps,
  }
}

function createEdge(sourceNodeId: string, targetNodeId: string, edgeProps?: Partial<EdgeProps>): Edge {
  return {
    id: uuidv4(),
    source: sourceNodeId,
    target: targetNodeId,
    animated: false,
    ...edgeProps,
  }
}
