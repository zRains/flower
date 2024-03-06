import { ConditionType, ConstantType, OperatorType } from './enum'

export const conditionOptions = [
  { label: '普通声明', value: ConditionType.简单 },
  { label: 'AND', value: ConditionType.与 },
  { label: 'OR', value: ConditionType.或 },
]

export const btnOptions = [
  { label: '添加普通声明', value: '' },
  { label: '添加-AND组', value: ConditionType.与 },
  { label: '添加-OR组', value: ConditionType.或 },
]

export const operatorOptions = [
  { label: 'is present', value: OperatorType.存在 },
  { label: 'is of type', value: OperatorType.类型 },
  { label: 'is equal to', value: OperatorType.等于 },
  { label: 'is less than', value: OperatorType.小于 },
  { label: 'is less than or equal to', value: OperatorType.小于等于 },
  { label: 'is greater than', value: OperatorType.大于 },
  { label: 'is greater than or equal to', value: OperatorType.大于等于 },
  { label: 'matches string', value: OperatorType.匹配字符串 },
]

export const constantOptions = [
  { label: 'Number constant', value: ConstantType.数字常量 },
  { label: 'Number variable', value: ConstantType.数字变量 },
  { label: 'String constant', value: ConstantType.字符串常量 },
  { label: 'String variable', value: ConstantType.字符串变量 },
  { label: 'Timestamp constant', value: ConstantType.时间戳常量 },
  { label: 'Timestamp variable', value: ConstantType.时间戳变量 },
  { label: 'Boolean constant', value: ConstantType.布尔常量 },
  { label: 'Boolean variable', value: ConstantType.布尔变量 },
]
