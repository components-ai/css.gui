import { isNil } from 'lodash-es'
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
    // a function's display type is its name
    type: name,
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
    validate: ((value: any) => {
      if (typeof value !== 'object') return false
      return value.name === name && argsSchema.validate(value.arguments)
    }) as any,
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
    parse(tokens) {
      const [token, ...rest] = tokens
      if (typeof token === 'string') return [undefined, tokens]
      const { name: parseName, arguments: parseArgs } = token
      if (name !== parseName) return [undefined, tokens]
      const [argsResult, argsRest] = argsSchema.parse!(parseArgs)
      if (isNil(argsResult) || argsRest.length > 0) return [undefined, tokens]
      return [{ name, arguments: argsResult }, rest]
    },
  }
}
