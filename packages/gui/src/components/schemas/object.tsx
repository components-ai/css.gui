import { mapValues } from 'lodash-es'
import { getInputProps } from '../../lib/util'
import { SchemaInput } from '../inputs/SchemaInput'
import { DataTypeSchema, RegenOptions } from './types'

interface CreateObject<T extends object> {
  type?: string
  fields: {
    [Property in keyof T]: DataTypeSchema<T[Property]>
  }
  keyOrder?: (keyof T)[]
  stringify?(values: Record<keyof T, string>): string
  // wrap the stringify function and return it
  wrapStringify?(value: string): string
  /**
   * Designates keys that should be preceded by a slash when stringified.
   */
  slash?: (keyof T)[]
  separator?: string
  defaultValue?: Partial<T>
}

export function objectSchema<T extends object>({
  type = 'object',
  fields,
  keyOrder = Object.keys(fields) as (keyof T)[],
  separator = ' ',
  slash = [],
  stringify: providedStringify,
  wrapStringify = (value) => value,
  defaultValue: providedDefaultValue,
}: CreateObject<T>): DataTypeSchema<T> {
  function stringify(value: T) {
    if (providedStringify) {
      const stringifiedFields = mapValues(fields, (schema, key: keyof T) => {
        return schema.stringify(value[key])
      }) as any
      return wrapStringify(providedStringify(stringifiedFields))
    }
    // By default, join the stringified values with spaces in key order
    return wrapStringify(
      keyOrder
        .map((key) => {
          const schema = fields[key]
          let stringified = schema.stringify(value[key])
          // prefix with a slash if necessary
          if (slash.includes(key)) {
            stringified = `/ ${stringified}`
          }
          return stringified
        })
        .join(separator)
    )
  }
  const defaultValue = {
    ...mapValues(fields, (schema) => schema.defaultValue),
    ...providedDefaultValue,
  } as any // IDK why the typing doesn't work

  function regenerate({ previousValue }: RegenOptions<T>): T {
    return mapValues(previousValue, (value, key: keyof T) => {
      return fields[key].regenerate?.({ previousValue: value }) ?? value
    }) as T
  }
  return {
    type,
    defaultValue,
    stringify,
    input(props) {
      return (
        <div>
          {keyOrder.map((key) => {
            const schema = fields[key]
            return (
              <SchemaInput schema={schema} {...getInputProps(props, key)} />
            )
          })}
        </div>
      )
    },
    regenerate,
    validate: ((value: any) => {
      if (typeof value !== 'object') {
        return false
      }
      return Object.entries(fields).every(([key, schema]: any) => {
        return schema.validate(value[key])
      })
    }) as any,
  }
}
