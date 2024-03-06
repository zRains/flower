export enum ConditionType {
  简单 = 'SIMPLE',
  与 = 'AND',
  或 = 'OR',
}

export enum IfType {
  NOT = 'NOT',
  ' ' = '',
}

export enum OperatorType {
  存在 = 'is present',
  类型 = 'is',
  等于 = '==',
  小于 = '<',
  小于等于 = '<=',
  大于 = '>',
  大于等于 = '>=',
  匹配字符串 = '~=',
}

export enum ValueType {
  常数 = '1',
  数字变量 = '2',
  字符串常量 = '3',
  字符串变量 = '4',
  时间戳常量 = '5',
  时间戳变量 = '6',
  布尔常数 = '7',
  布尔变量 = '8',
}

export enum FormType {
  单一 = '1',
  组 = '2',
}

export enum DataType {
  Number = 'numeric',
  Timestamp = 'timestamp',
  Boolean = 'boolean',
  String = 'string',
  Null = 'null',
}

export enum ConstantType {
  数字常量 = '1',
  数字变量 = '2',
  字符串常量 = '3',
  字符串变量 = '4',
  时间戳常量 = '5',
  时间戳变量 = '6',
  布尔常量 = '7',
  布尔变量 = '8',
}
