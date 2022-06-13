import { ComponentType } from 'react'
import { EditorPropsWithLabel } from '../../types/editor'
import { Theme } from '../../types/theme'

export interface DataTypeSchema<T> {
  input: ComponentType<EditorPropsWithLabel<T>>
  stringify(value: T, theme?: Theme): string
  defaultValue: T
  regenerate?(options: RegenOptions<T>): T
}

export interface RegenOptions<T> {
  previousValue: T
}
