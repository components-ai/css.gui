import { DataTypeSchema, RegenOptions } from './types'
import * as Toggle from '@radix-ui/react-toggle'
import { Link } from 'react-feather'
import { SchemaInput } from '../inputs/SchemaInput'
import { replace } from '../../lib/array'
import { ComponentType } from 'react'
import { EditorPropsWithLabel } from '../../types/editor'

interface CreateTupleSchema<T> {
  itemSchema: DataTypeSchema<T>
  labels: string[]
  linkable?: boolean
  separator?: string
  /** Custom block input for the schema */
  input?: ComponentType<EditorPropsWithLabel<T[]>>
  defaultValue?: T[]
}

/**
 * Schema for elements that take a set of values
 * in a defined order that may be linked together
 * (e.g. x/y, row/column, start/end)
 */
export function tupleSchema<T>({
  itemSchema,
  labels,
  linkable = true,
  separator = ' ',
  input: CustomInput,
  defaultValue: providedDefault,
}: CreateTupleSchema<T>): DataTypeSchema<T[]> {
  function isLinked(value: T[]) {
    return value.length <= 1
  }

  const defaultValue = linkable
    ? [itemSchema.defaultValue]
    : labels.map(() => itemSchema.defaultValue)

  function stringify(value: T[], ...args: any[]) {
    return (
      value
        ?.map((item) => itemSchema.stringify(item, ...args))
        .join(separator) ?? null
    )
  }

  function regenerate({ theme, previousValue }: RegenOptions<T[]>) {
    return previousValue.map(
      (item) => itemSchema.regenerate?.({ theme, previousValue: item }) ?? item
    )
  }

  return {
    type: `${itemSchema.type} list`,
    stringify,
    defaultValue: providedDefault ?? defaultValue,
    regenerate,
    validate: ((value: any) => {
      if (!(value instanceof Array)) {
        return false
      }
      return value.every((item) => itemSchema.validate(item))
    }) as any,
    input(props) {
      if (CustomInput) {
        return <CustomInput {...props} />
      }
      const { value, onChange } = props
      const linked = isLinked(value)
      return (
        <div sx={{ display: 'flex', gap: 2 }}>
          {linkable && (
            <Toggle.Root
              title="Link inputs"
              sx={{
                p: 0,
                background: 'none',
                border: 'none',
                color: 'muted',

                '&[data-state=on]': {
                  color: 'text',
                },
              }}
              pressed={linked}
              onPressedChange={(pressed) => {
                if (pressed) {
                  onChange([value[0]])
                } else {
                  onChange(labels.map(() => value[0]))
                }
              }}
            >
              <Link size={14} />
            </Toggle.Root>
          )}
          {value.map((item, i) => {
            return (
              <SchemaInput
                key={i}
                schema={itemSchema}
                value={value[i]}
                onChange={(newValue) => {
                  onChange(replace(value, i, newValue))
                }}
                label=""
              />
            )
          })}
        </div>
      )
    },
  }
}
