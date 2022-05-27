import { mapValues } from 'lodash-es'
import { ComponentType } from 'react'
import { getInputProps } from '../../lib/util'
import { EditorPropsWithLabel } from '../../types/editor'
import { SelectInput } from '../inputs/SelectInput'
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

interface CreateUnionSchema<V extends string, T extends object> {
  variants: Record<
    V,
    {
      schema: DataTypeSchema<T>
      props?: Record<string, any>
    }
  >
  order?: V[]
  stringify?(variant: V, value: string): string
}
export function createUnionSchema<V extends string, T extends object>({
  variants,
  order = Object.keys(variants) as any,
  stringify = (value) => value,
}: CreateUnionSchema<V, T>): DataTypeSchema<T & { type: V }> {
  return {
    type(props) {
      const Component = variants[props.value.type].schema.type
      return (
        <div>
          <SelectInput
            {...getInputProps(props, 'type')}
            options={order}
            onChange={(newType) => {
              // if the type changes, reset the value to the default value of that type
              return {
                type: newType,
                ...variants[newType].schema.defaultValue,
              }
            }}
          />
          <Component {...props} />
        </div>
      )
    },
    stringify(value: T & { type: V }) {
      const type = value.type
      return stringify(type, variants[type].schema.stringify(value))
    },
    defaultValue: {
      ...variants[order[0]].schema.defaultValue,
      type: order[0],
    },
  }
}
