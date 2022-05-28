import { ComponentType } from 'react'
import { EditorPropsWithLabel } from '../../types/editor'

export interface DataTypeSchema<T> {
  input: ComponentType<EditorPropsWithLabel<T>>
  stringify(value: T): string
  defaultValue: T
}
