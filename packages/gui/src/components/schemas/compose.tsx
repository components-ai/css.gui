import { mapValues } from 'lodash-es'
import { ComponentType } from 'react'
import { getInputProps } from '../../lib/util'
import { EditorPropsWithLabel } from '../../types/editor'
import FieldArray from '../FieldArray'
import { SelectInput } from '../inputs/SelectInput'
import Layers from '../Layers'
import { Label } from '../primitives'

export interface DataTypeSchema<T> {
  input: ComponentType<EditorPropsWithLabel<T>>
  stringify(value: T): string
  defaultValue: T
}

interface CreateObject<T extends object> {
  fields: {
    [Property in keyof T]: DataTypeSchema<T[Property]>
  }
  // component?: ComponentType
  keyOrder?: (keyof T)[]
  stringify?(): string
  defaultValue?: Partial<T>
}

export function object<T extends object>({
  fields,
  stringify,
  keyOrder = Object.keys(fields) as (keyof T)[],
  defaultValue,
}: CreateObject<T>): DataTypeSchema<T> {
  return {
    input(props) {
      return (
        <div>
          <Label>{props.label}</Label>
          <div sx={{ display: 'grid', gap: 2 }}>
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

interface CreateList<T> {
  itemSchema: DataTypeSchema<T>
  separator?: string
  variant?: 'layers' | 'list'
  thumbnail?: ComponentType<{ value: string }>
}

export function list<T>({
  itemSchema,
  separator = ', ',
  variant = 'layers',
  thumbnail,
}: CreateList<T>): DataTypeSchema<T[]> {
  const stringify = (value: T[]) => {
    const stringified = value.map((item) => itemSchema.stringify(item))
    return stringified.join(separator)
  }

  return {
    input(props) {
      switch (variant) {
        case 'layers':
          return (
            <Layers
              {...props}
              newItem={() => itemSchema.defaultValue}
              stringify={stringify}
              content={itemSchema.input as any}
              thumbnail={thumbnail}
            />
          )
        case 'list':
          return (
            <FieldArray
              {...props}
              newItem={() => itemSchema.defaultValue}
              stringify={stringify}
              content={itemSchema.input as any}
            />
          )
      }
    },
    stringify,
    defaultValue: [itemSchema.defaultValue],
  }
}

interface CreateUnion<V extends string, T extends object> {
  // TODO figure out how to type the different union options correctly
  variants: Record<V, DataTypeSchema<any>>
  order?: V[]
  stringify?(variant: V, value: string): string
}
export function union<V extends string, T extends object>({
  variants,
  order = Object.keys(variants) as any,
  stringify = (variant, value) => value,
}: CreateUnion<V, T>): DataTypeSchema<T & { type: V }> {
  return {
    input(props) {
      const Component = variants[props.value.type].input
      return (
        <div>
          <Label>{props.label}</Label>
          <SelectInput
            {...getInputProps(props, 'type')}
            options={order}
            onChange={(newType) => {
              // if the type changes, reset the value to the default value of that type
              props.onChange({
                ...variants[newType].defaultValue,
                type: newType,
              })
            }}
          />
          <Component {...props} label={''} />
        </div>
      )
    },
    stringify(value: T & { type: V }) {
      const type = value.type
      return stringify(type, variants[type].stringify(value))
    },
    defaultValue: {
      ...variants[order[0]].defaultValue,
      type: order[0],
    },
  }
}
