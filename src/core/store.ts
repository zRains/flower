import dagre from '@dagrejs/dagre'
import {
  EdgeChange,
  NodeChange,
  Position,
  applyEdgeChanges,
  applyNodeChanges,
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
    const { nodes, edges } = get()
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedRes([...nodes], [...edges], direction)

    set({ nodes: layoutedNodes, edges: layoutedEdges })
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
    const { nodes, edges, closeNodeMenu } = get()
    switch (type) {
      case 'apiServiceNode':
        {
          const newNode = createNode({ type })
          // 正常情况下关联Edge是存在的
          const sourceRelatedEdge = edges.find((edge) => edge.source === sourceNodeId)!
          const newEdge = createEdge(sourceNodeId, newNode.id)

          sourceRelatedEdge.source = newNode.id
          set(getLayoutedRes([...nodes, newNode], [newEdge, ...edges]))
        }
        break
      case 'conditionHeaderNode': {
        const { nodes: conditionNodes, edges: conditionEdges } = createConditionRes()
        // 正常情况下关联Edge是存在的
        const sourceRelatedEdge = edges.find((edge) => edge.source === sourceNodeId)!
        const newEdge = createEdge(sourceNodeId, conditionNodes[0].id)

        sourceRelatedEdge.source = conditionNodes[3].id
        set(getLayoutedRes([...nodes, ...conditionNodes], [...edges, ...conditionEdges, newEdge]))
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

        set(getLayoutedRes([...nodes, newChildNode], [...edges, newHeaderToChildEdge, newChildToButtonEdge]))
        break
      }

      default:
        break
    }

    requestAnimationFrame(() => closeNodeMenu())
  },
  delNode: (nodeId: string, type: string) => {
    const { nodes, edges, dagreLayout } = get()

    switch (type) {
      case 'apiServiceNode': {
        const targetRelatedEdge = edges.find((edge) => edge.target === nodeId)!
        const sourceRelatedEdge = edges.find((edge) => edge.source === nodeId)!

        sourceRelatedEdge.source = targetRelatedEdge.source
        set(
          getLayoutedRes(
            nodes.filter((node) => node.id !== nodeId),
            edges.filter((edge) => edge.id !== targetRelatedEdge.id),
          ),
        )
        break
      }

      case 'conditionChildNode': {
        const nodeMap = new Map(nodes.map((node) => [node.id, node]))
        let targetRelatedEdge = edges.find((edge) => edge.target === nodeId)!
        let sourceRelatedEdge = edges.find((edge) => edge.source === nodeId)!
        const relatedConditionHeaderNode = nodeMap.get(targetRelatedEdge.source)!

        if (relatedConditionHeaderNode.data.__targetNodes.length > 2) {
          relatedConditionHeaderNode.data.__targetNodes = relatedConditionHeaderNode.data.__targetNodes.filter(
            (id: string) => nodeId !== id,
          )
          set(
            getLayoutedRes(
              nodes.filter((node) => node.id !== nodeId),
              edges.filter((edge) => ![targetRelatedEdge.id, sourceRelatedEdge.id].includes(edge.id)),
            ),
          )
        } /** 删除整个条件节点组 */ else {
          const iconButtonNode = nodeMap.get(relatedConditionHeaderNode.data.__iconButtonNodes[0])!
          const { nodeIds, edgeIds } = patchGraphRes(
            edges,
            relatedConditionHeaderNode.id,
            relatedConditionHeaderNode.data.__iconButtonNodes[0],
          )

          targetRelatedEdge = edges.find((edge) => edge.target === relatedConditionHeaderNode.id)!
          sourceRelatedEdge = edges.find((edge) => edge.source === iconButtonNode.id)!
          sourceRelatedEdge.source = targetRelatedEdge.source
          set(
            getLayoutedRes(
              nodes.filter((node) => !nodeIds.has(node.id)),
              edges.filter((edge) => !(edgeIds.has(edge.id) || targetRelatedEdge.id === edge.id)),
            ),
          )
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

function createNode(nodeProps?: Partial<Node>): Node {
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

/**
 * 给出开始节点和结束节点，返回两点及其之间的所有节点和边的id
 * @param nodes 全部节点
 * @param edges 全部边
 * @param startNodeId 开始节点
 * @param endNodeId 结束节点
 * @returns
 */
function patchGraphRes(edges: Array<Edge>, startNodeId: string, endNodeId: string) {
  const relatedNodeIds: string[] = [startNodeId, endNodeId]
  const relatedEdgeIds: string[] = []
  const recur = (targetNodeId: string) => {
    edges
      .filter((edge) => edge.source === targetNodeId)
      .forEach((edge) => {
        relatedEdgeIds.push(edge.id)
        if (edge.target !== endNodeId) {
          relatedNodeIds.push(edge.target)
          recur(edge.target)
        }
      })
  }

  recur(startNodeId)

  return { nodeIds: new Set(relatedNodeIds), edgeIds: new Set(relatedEdgeIds) }
}

function getLayoutedRes(nodes: Array<Node>, edges: Array<Edge>, direction: 'TB' | 'LR' = 'TB') {
  const isHorizontal = direction === 'LR'
  const dagreGraph = new dagre.graphlib.Graph()

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

  return { nodes, edges }
}
