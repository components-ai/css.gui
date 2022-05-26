import { ComponentType } from 'react'
import { EditorPropsWithLabel } from '../types/editor'

export interface DataTypeSchema<T> {
  component: ComponentType<EditorPropsWithLabel<T>>
  stringify(value: T): string
  defaultValue: T
}

interface CreateDataTypeSchema<T extends object> {
  fields: {
    [Property in keyof T]: {
      type: DataTypeSchema<T[Property]>
      props: Record<string, any>
    }
  }
  component?: ComponentType
  keyOrder?: (keyof T)[]
  stringify?(): string
  defaultValue?: Partial<T>
}

export function createDataTypeSchema<T extends object>({
  fields,
  component,
  stringify,
  keyOrder = Object.keys(fields) as (keyof T)[],
  defaultValue,
}: CreateDataTypeSchema<T>): DataTypeSchema<T> {}
