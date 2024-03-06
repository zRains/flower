import { ConditionType, IfType, OperatorType } from './enum'
import { RefObject } from 'react'
import { FormRefProps } from './BaseForm'

export interface Condition {
  type: ConditionType
  if?: IfType
  variable?: string
  operator?: OperatorType
  value?: any
  form?: RefObject<FormRefProps>
  group?: {
    type: ConditionType
    children: Condition[]
  }
}

export interface LabelValue {
  label: string
  value: string
}
