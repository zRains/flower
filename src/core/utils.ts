export interface NodeSize {
  width: number
  height: number
}

export const NodeSizeMap = new Map<string, NodeSize>([
  ['apiServiceNode', { width: 200, height: 80 }],
  ['messageNode', { width: 200, height: 80 }],
  ['conditionHeaderNode', { width: 140, height: 40 }],
  ['conditionChildNode', { width: 140, height: 40 }],
  ['iconButtonNode', { width: 22, height: 22 }],
])

export function getNodeSize(nodeType?: string): NodeSize {
  const DEFAULT_NODE_SIZE = { width: 160, height: 54 }

  if (!nodeType) return DEFAULT_NODE_SIZE

  return NodeSizeMap.get(nodeType) ?? DEFAULT_NODE_SIZE
}
