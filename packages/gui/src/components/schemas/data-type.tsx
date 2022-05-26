import { mapValues } from 'lodash-es'
import { ComponentType } from 'react'
import { getInputProps } from '../../lib/util'
import { EditorPropsWithLabel } from '../../types/editor'
import Layers from '../Layers'
import { Label } from '../primitives'

export interface DataTypeSchema<T> {
  type: ComponentType<EditorPropsWithLabel<T>>
  stringify(value: T): string
  defaultValue: T
}

interface CreateObjectSchema<T extends object> {
  fields: {
    [Property in keyof T]: {
      schema: DataTypeSchema<T[Property]>
      props?: Record<string, any>
    }
  }
  // component?: ComponentType
  keyOrder?: (keyof T)[]
  stringify?(): string
  defaultValue?: Partial<T>
}

export function createObjectSchema<T extends object>({
  fields,
  stringify,
  keyOrder = Object.keys(fields) as (keyof T)[],
  defaultValue,
}: CreateObjectSchema<T>): DataTypeSchema<T> {
  return {
    type(props) {
      return (
        <div>
          <Label>{props.label}</Label>
          <div sx={{ display: 'grid', gap: 2 }}>
            {keyOrder.map((key) => {
              const { schema, props: componentProps = {} } = fields[key]
              const Component = schema.type
              return (
                <Component {...getInputProps(props, key)} {...componentProps} />
              )
            })}
          </div>
        </div>
      )
    },
    // TODO custom stringify
    stringify(value) {
      const stringified = mapValues(value, (value, key: keyof T) =>
        fields[key].schema.stringify(value)
      )
      // By default, join the stringified values with spaces in key order
      return keyOrder.map((key) => stringified[key]).join(' ')
    },
    // TODO override defaults
    defaultValue: {
      ...mapValues(fields, (field) => field.schema.defaultValue),
      ...defaultValue,
    } as any, // IDK why the typing doesn't work,
  }
}

interface CreateArraySchema<T> {
  itemSchema: DataTypeSchema<T>
  separator: string
  thumbnail?: ComponentType<{ value: string }>
}

export function createArraySchema<T>({
  itemSchema,
  separator,
  thumbnail,
}: CreateArraySchema<T>): DataTypeSchema<T[]> {
  const stringify = (value: T[]) => {
    const stringified = value.map((item) => itemSchema.stringify(item))
    return stringified.join(separator)
  }

  return {
    type(props) {
      return (
        <Layers
          {...props}
          newItem={() => itemSchema.defaultValue}
          stringify={stringify}
          content={itemSchema.type as any}
          thumbnail={thumbnail}
        />
      )
    },
    stringify,
    defaultValue: [itemSchema.defaultValue],
  }
}
