import type { Node, Edge } from 'reactflow'
const position = { x: 0, y: 0 }
const draggable = false
const connectable = false

export const initialNodes: Array<Node> = [
  {
    id: '1',
    type: 'startNode',
    data: { label: 'input' },
    position,
    draggable,
    connectable,
  },
  {
    id: '2',
    type: 'apiServiceNode',
    data: { label: 'node 2' },
    position,
    draggable,
    connectable,
  },
  {
    id: '3',
    type: 'conditionHeaderNode',
    data: { __conditionChildNodes: ['4', '5', '6'], __conditionEndNode: '7' },
    position,
    draggable,
    connectable,
  },
  {
    id: '4',
    type: 'conditionChildNode',
    data: {},
    position,
    draggable,
    connectable,
  },
  {
    id: '5',
    type: 'conditionChildNode',
    data: {},
    position,
    draggable,
    connectable,
  },
  {
    id: '6',
    type: 'conditionChildNode',
    data: {},
    position,
    draggable,
    connectable,
  },
  {
    id: '7',
    type: 'iconButtonNode',
    data: { label: 'node 3' },
    position,
    draggable,
    connectable,
  },
  {
    id: '8',
    type: 'messageNode',
    data: { label: 'node 3' },
    position,
    draggable,
    connectable,
  },
  {
    id: '9',
    type: 'endNode',
    data: { label: 'node 3' },
    position,
    draggable,
    connectable,
  },
]

export const initialEdges: Array<Edge> = [
  { id: 'e12', source: '1', target: '2' },
  { id: 'e23', source: '2', target: '3' },
  { id: 'e34', source: '3', target: '4' },
  { id: 'e35', source: '3', target: '5' },
  { id: 'e36', source: '3', target: '6' },
  { id: 'e47', source: '4', target: '7' },
  { id: 'e57', source: '5', target: '7' },
  { id: 'e67', source: '6', target: '7' },
  { id: 'e78', source: '7', target: '8' },
  { id: 'e89', source: '8', target: '9' },
]
