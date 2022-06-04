import { ComponentType } from 'react'
import FieldArray from '../FieldArray'
import { DataTypeSchema } from './types'
interface CreateList<T> {
  itemSchema: DataTypeSchema<T>
  separator?: string
  variant?: 'layers' | 'list'
  thumbnail?: ComponentType<{ value: string }>
}

export function listSchema<T>({
  itemSchema,
  separator = ', ',
}: CreateList<T>): DataTypeSchema<T[]> {
  const stringify = (value: T[]) => {
    if (typeof value === 'string') {
      return value
    }

    const stringified = value.map((item) => itemSchema.stringify(item))
    return stringified.join(separator)
  }

  return {
    input(props) {
      return (
        <FieldArray
          {...props}
          newItem={() => itemSchema.defaultValue}
          stringify={stringify}
          content={itemSchema.input}
        />
      )
    },
    stringify,
    defaultValue: [itemSchema.defaultValue],
  }
}
