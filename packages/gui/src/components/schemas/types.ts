import { ComponentType } from 'react'
import { EditorPropsWithLabel } from '../../types/editor'

export interface DataTypeSchema<T> {
  input: ComponentType<EditorPropsWithLabel<T>>
  stringify(value: T): string
  defaultValue: T
  regen?(options: RegenOptions<T>): T
}

export interface RegenOptions<T> {
  previousValue: T
}
