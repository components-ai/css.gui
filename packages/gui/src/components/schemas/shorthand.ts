import { objectSchema } from './object'
import { DataTypeSchema } from './types'

interface CreateShorthand<T extends object> {
  type?: string
  fields: {
    [Property in keyof T]: DataTypeSchema<T[Property]>
  }
  keyOrder?: (keyof T)[]
  /** Designates keys that should be preceded by a slash when stringified. */
  slash?: (keyof T)[]
  defaultValue?: Partial<T>
}

/**
 * Used for objects representing CSS shorthands, like `background` or `border`.
 * These consist of one or more optional properties.
 *
 * When certain properties are
 */
export function shorthandSchema<T extends object>({
  type,
  fields,
  keyOrder = Object.keys(fields) as (keyof T)[],
  slash,
  defaultValue,
}: CreateShorthand<T>) {
  return objectSchema({
    type,
    fields,
    keyOrder,
    defaultValue,
    stringify: (stringifiedFields) => {
      return keyOrder
        .map((field) => {
          const stringified = stringifiedFields[field]
          return slash?.includes(field) ? `/ ${stringified}` : stringified
        })
        .join(' ')
    },
  })
}
