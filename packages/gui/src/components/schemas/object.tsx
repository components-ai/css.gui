import { mapValues } from 'lodash-es'
import { getInputProps } from '../../lib/util'
import { InputHeader } from '../ui/InputHeader'
import { DataTypeSchema } from './types'

interface CreateObject<T extends object> {
  fields: {
    [Property in keyof T]: DataTypeSchema<T[Property]>
  }
  // component?: ComponentType
  keyOrder?: (keyof T)[]
  stringify?(): string
  /**
   * Designates keys that should be preceded by a slash when stringified.
   */
  slash?: (keyof T)[]
  separator?: string
  defaultValue?: Partial<T>
}

export function objectSchema<T extends object>({
  fields,
  stringify,
  keyOrder = Object.keys(fields) as (keyof T)[],
  separator = ' ',
  slash = [],
  defaultValue,
}: CreateObject<T>): DataTypeSchema<T> {
  return {
    input(props) {
      return (
        <div>
          <InputHeader {...props} />
          <div
            sx={{
              display: 'grid',
              gap: 2,
            }}
          >
            {keyOrder.map((key) => {
              const schema = fields[key]
              const Component = schema.input
              return <Component {...getInputProps(props, key)} />
            })}
          </div>
        </div>
      )
    },
    // TODO custom stringify
    stringify(value) {
      // By default, join the stringified values with spaces in key order
      return keyOrder
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
    },
    // TODO override defaults
    defaultValue: {
      ...mapValues(fields, (schema) => schema.defaultValue),
      ...defaultValue,
    } as any, // IDK why the typing doesn't work,
  }
}
