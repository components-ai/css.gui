import { getInputProps } from '../../lib/util'
import { DataTypeSchema } from './types'
import * as Toggle from '@radix-ui/react-toggle'
import { Link } from 'react-feather'
import { InputHeader } from '../ui/InputHeader'
import { replace } from '../../lib/array'

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
          <InputHeader {...props} />
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
            {props.value.map((value, i) => {
              return (
                <ItemInput
                  key={i}
                  {...getInputProps(props, i)}
                  onChange={(newItem) =>
                    props.onChange(replace(props.value, i, newItem))
                  }
                  label={linked ? '' : labels[i]}
                />
              )
            })}
          </div>
        </div>
      )
    },
    stringify(value) {
      return value.map((item) => itemSchema.stringify(item)).join(' ')
    },
    defaultValue: [itemSchema.defaultValue],
  }
}
