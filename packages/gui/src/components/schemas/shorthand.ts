import { isNil } from 'lodash-es'
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
    parse(tokens) {
      let remaining = [...tokens]
      const result: Partial<T> = {}
      while (remaining.length > 0) {
        let foundMatch = false
        // Iterate through the fields to see if we can find a matching parse
        for (const key of keyOrder) {
          const fieldSchema = fields[key]
          // TODO handle slashed fields
          const [parsed, rest] = fieldSchema.parse!(remaining)
          if (!isNil(parsed)) {
            result[key] = parsed
            remaining = rest
            foundMatch = true
            break
          }
        }
        if (!foundMatch) {
          break
        }
      }
      // If we got no matches at all, then parsing failed
      if (Object.keys(result).length === 0) {
        return [undefined, tokens]
      }
      // Fill the rest with defaults
      for (const key of keyOrder) {
        if (isNil(result[key])) {
          result[key] = fields[key].defaultValue
        }
      }
      return [result as T, remaining]
    },
  })
}
