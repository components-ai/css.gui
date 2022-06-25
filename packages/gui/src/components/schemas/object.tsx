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
  separator?: string
  defaultValue?: Partial<T>
}

export function objectSchema<T extends object>({
  type = 'object',
  fields,
  keyOrder = Object.keys(fields) as (keyof T)[],
  separator = ' ',
  stringify: providedStringify,
  defaultValue: providedDefaultValue,
}: CreateObject<T>): DataTypeSchema<T> {
  function stringify(value: T) {
    if (providedStringify) {
      const stringifiedFields = mapValues(fields, (schema, key: keyof T) => {
        return schema.stringify(value[key])
      }) as any
      return providedStringify(stringifiedFields)
    }
    // By default, join the stringified values with spaces in key order
    return keyOrder
      .map((key) => {
        return fields[key].stringify(value[key])
      })
      .join(separator)
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
        <div
          sx={{
            display: 'grid',
            gap: 2,
            borderLeft: '4px solid',
            borderColor: 'border',
            pl: 2,
          }}
        >
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
