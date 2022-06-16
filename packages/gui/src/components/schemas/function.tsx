import { getInputProps } from '../../lib/util'
import { SchemaInput } from '../inputs/SchemaInput'
import { DataTypeSchema } from './types'

export interface FunctionData<N extends string, T> {
  name: N
  arguments: T
}

/**
 * Wrapper on an object schema representing a CSS function
 */
export function functionSchema<N extends string, T>(
  name: N,
  argsSchema: DataTypeSchema<T>
): DataTypeSchema<FunctionData<N, T>> {
  return {
    stringify(value: FunctionData<N, T>) {
      return `${value.name}(${argsSchema.stringify(value.arguments)})`
    },
    defaultValue: {
      name,
      arguments: argsSchema.defaultValue,
    },
    regenerate({ previousValue }) {
      return {
        name,
        arguments:
          argsSchema.regenerate?.({ previousValue: previousValue.arguments }) ??
          argsSchema.defaultValue,
      }
    },
    input(props) {
      return (
        <div>
          <SchemaInput
            schema={argsSchema}
            {...getInputProps(props, 'arguments')}
            label=""
          />
        </div>
      )
    },
  }
}
