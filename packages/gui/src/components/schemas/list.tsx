import { ComponentType } from 'react'
import FieldArray from '../FieldArray'
import { DataTypeSchema, RegenOptions } from './types'

interface CreateList<T> {
  itemSchema: DataTypeSchema<T>
  separator?: string
  thumbnail?: ComponentType<{ value: string }>
}

export function listSchema<T>({
  itemSchema,
  separator = ', ',
}: CreateList<T>): DataTypeSchema<T[]> {
  const stringify = (value: T[]) => {
    const stringified = value.map((item) => itemSchema.stringify(item))
    return stringified.join(separator)
  }
  const defaultValue = [itemSchema.defaultValue]

  function regenerate({ previousValue }: RegenOptions<T[]>) {
    return previousValue.map((value) => {
      return itemSchema.regenerate?.({ previousValue: value }) ?? value
    })
  }

  return {
    type: `${itemSchema.type} list`,
    stringify,
    defaultValue,
    input(props) {
      return (
        <FieldArray
          {...props}
          defaultValue={defaultValue}
          newItem={() => itemSchema.defaultValue}
          stringify={stringify}
          itemSchema={itemSchema}
          regenerate={regenerate}
        />
      )
    },
    regenerate,
    validate: ((value: any) => {
      if (!(value instanceof Array)) {
        return false
      }
      return value.every((item) => itemSchema.validate(item))
    }) as any,
  }
}
