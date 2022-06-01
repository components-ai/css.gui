import { getInputProps } from '../../lib/util'
import { Label } from '../primitives'
import { DataTypeSchema } from './types'
import * as Toggle from '@radix-ui/react-toggle'
import { Link } from 'react-feather'

interface CreateTupleSchema<K, T> {
  itemSchema: DataTypeSchema<T>
  labels: K[]
}

/**
 * Schema for elements that take a set of values
 * in a defined order that may be linked together
 * (e.g. x/y, row/column, start/end)
 */
export function tupleSchema<K extends string, T>({
  itemSchema,
  labels,
}: CreateTupleSchema<K, T>): DataTypeSchema<T[]> {
  function isLinked(value: T[]) {
    return value.length <= 1
  }
  return {
    input(props) {
      const linked = isLinked(props.value)
      const ItemInput = itemSchema.input
      return (
        <div>
          <Label>{props.label}</Label>
          <div sx={{ display: 'flex', gap: 2 }}>
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
                  props.onChange([props.value[0]])
                } else {
                  props.onChange(labels.map(() => props.value[0]))
                }
              }}
            >
              <Link size={14} />
            </Toggle.Root>
            {linked ? (
              <ItemInput {...getInputProps(props, 0)} label="" />
            ) : (
              labels.map((label, i) => {
                return (
                  <ItemInput
                    key={label}
                    {...getInputProps(props, i)}
                    label={label}
                  />
                )
              })
            )}
          </div>
        </div>
      )
    },
    stringify(value) {
      return value.map(itemSchema.stringify).join(' ')
    },
    defaultValue: labels.map(() => itemSchema.defaultValue),
  }
}
