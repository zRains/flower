export interface Condition {
  type: 'AND' | 'OR' | 'NORMAL'
  not: boolean
  children?: Condition[]
  variable?: string
  operator?: 'eq' | 'neq' | 'gt' | 'lt' | 'empty' | 'no-empty'
  value?: unknown
}
