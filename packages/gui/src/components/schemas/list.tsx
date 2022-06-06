import { ComponentType } from 'react'
import FieldArray from '../FieldArray'
import { DataTypeSchema } from './types'

interface CreateList<T, K> {
  itemSchema: DataTypeSchema<T>
  separator?: string
  variant?: 'layers' | 'list'
  thumbnail?: ComponentType<{ value: string }>
  keywords?: K[]
}

export function listSchema<T, K extends string = never>({
  itemSchema,
  keywords,
  separator = ', ',
}: CreateList<T, K>): DataTypeSchema<T[] | K> {
  const stringify = (value: T[] | K) => {
    if (!value) {
      return null
    }

    if (typeof value === 'string') {
      return value
    }

    const stringified = value.map((item) => itemSchema.stringify(item))
    return stringified.join(separator)
  }
  const defaultValue = [itemSchema.defaultValue]

  return {
    stringify,
    defaultValue,
    input(props) {
      return (
        <FieldArray
          {...props}
          keywords={keywords}
          defaultValue={defaultValue}
          newItem={() => itemSchema.defaultValue}
          stringify={stringify}
          content={itemSchema.input}
        />
      )
    },
  }
}
