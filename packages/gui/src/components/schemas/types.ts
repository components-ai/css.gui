import { ComponentType } from 'react'
import { EditorPropsWithLabel } from '../../types/editor'
import { Theme } from '../../types/theme'

export interface DataTypeSchema<T> {
  /** the display type of the schema */
  type: string
  /** The block input for the schema, to display below the label */
  input?: ComponentType<EditorPropsWithLabel<T>>
  /** The inline input for the schema, to be displayed next to the label */
  inlineInput?: ComponentType<EditorPropsWithLabel<T>>
  /** The default value to render for the schema */
  defaultValue: T
  /** Validates whether a value adheres to the schema */
  validate(value: unknown): value is T
  /** How to stringify the values of the schema */
  stringify(value: T, theme?: Theme): string
  /** Function to generate a new value in the schema, based on the provided options */
  regenerate?(options: RegenOptions<T>): T
  /** Variants of the schema for use in joining multiple types of schema together */
  variants?: SchemaVariants<T>
}

export interface RegenOptions<T> {
  previousValue: T
}

export type SchemaVariants<T> = { [V in keyof T]: DataTypeSchema<T[V]> }
