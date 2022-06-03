import { ComponentType } from 'react'
import FieldArray from '../FieldArray'
import Layers from '../Layers'
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
  variant = 'layers',
  thumbnail,
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
      switch (variant) {
        case 'layers':
          return (
            <Layers
              {...props}
              newItem={() => itemSchema.defaultValue}
              stringify={stringify}
              content={itemSchema.input as any}
              thumbnail={thumbnail}
            />
          )
        case 'list':
          return (
            <FieldArray
              {...props}
              newItem={() => itemSchema.defaultValue}
              stringify={stringify}
              content={itemSchema.input as any}
            />
          )
      }
    },
    stringify,
    defaultValue: [itemSchema.defaultValue],
  }
}
