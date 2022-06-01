import { Header } from '@radix-ui/react-accordion'
import { mapValues } from 'lodash-es'
import { getInputProps } from '../../lib/util'
import { Label } from '../primitives'
import { InputHeader } from '../ui/InputHeader'
import { DataTypeSchema } from './types'

interface CreateObject<T extends object> {
  fields: {
    [Property in keyof T]: DataTypeSchema<T[Property]>
  }
  // component?: ComponentType
  keyOrder?: (keyof T)[]
  stringify?(): string
  defaultValue?: Partial<T>
}

export function objectSchema<T extends object>({
  fields,
  stringify,
  keyOrder = Object.keys(fields) as (keyof T)[],
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
              px: 3,
              borderLeft: '2px solid',
              borderColor: 'border',
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
          return schema.stringify(value[key])
        })
        .join(' ')
    },
    // TODO override defaults
    defaultValue: {
      ...mapValues(fields, (schema) => schema.defaultValue),
      ...defaultValue,
    } as any, // IDK why the typing doesn't work,
  }
}
