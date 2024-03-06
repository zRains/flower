import { LabelValue } from './interface'

export function enum2Options(data: object = {}): LabelValue[] {
  return Object.entries(data).map(([label, value]: [string, string]) => ({
    label,
    value,
  }))
}
