import { mapValues } from 'lodash-es'
import { getInputProps } from '../../lib/util'
import { InputContainer } from '../inputs/InputContainer'
import { InputHeader } from '../ui/InputHeader'
import { DataTypeSchema } from './types'

interface CreateObject<T extends object, K> {
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
  keywords?: K[]
}

export function objectSchema<T extends object, K extends string = never>({
  fields,
  keyOrder = Object.keys(fields) as (keyof T)[],
  separator = ' ',
  slash = [],
  stringify: providedStringify,
  wrapStringify = (value) => value,
  defaultValue: providedDefaultValue,
  keywords = [],
}: CreateObject<T, K>): DataTypeSchema<T | K> {
  function stringify(value: T | K) {
    if (!value) {
      return null
    }

    if (typeof value === 'string') {
      return value
    }
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
  return {
    defaultValue,
    stringify,
    input(props) {
      return (
        <InputContainer
          {...props}
          keywords={keywords}
          defaultValue={defaultValue}
          stringify={stringify}
        >
          {typeof props.value !== 'string' && (
            <div
              sx={{
                borderLeft: '4px solid',
                borderColor: 'border',
                pl: 3,
                display: 'grid',
                gap: 2,
                ':hover': {
                  borderColor: 'primary',
                },
                transition: 'border-color 250ms',
              }}
            >
              {keyOrder.map((key) => {
                const schema = fields[key]
                const Component = schema.input
                return <Component {...getInputProps(props as any, key)} />
              })}
            </div>
          )}
        </InputContainer>
      )
    },
    // TODO override defaults
  }
}
