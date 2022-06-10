import { getInputProps } from '../../lib/util'
import { DataTypeSchema, RegenOptions } from './types'
import * as Toggle from '@radix-ui/react-toggle'
import { Link } from 'react-feather'
import { replace } from '../../lib/array'
import { InputContainer } from '../inputs/InputContainer'
import { choose } from '../../lib/random'

interface CreateTupleSchema<T, K> {
  itemSchema: DataTypeSchema<T>
  labels: string[]
  keywords?: K[]
  linkable?: boolean
  separator?: string
}

/**
 * Schema for elements that take a set of values
 * in a defined order that may be linked together
 * (e.g. x/y, row/column, start/end)
 */
export function tupleSchema<T, K extends string = never>({
  itemSchema,
  labels,
  keywords = [],
  linkable = true,
  separator = ' ',
}: CreateTupleSchema<T, K>): DataTypeSchema<T[] | K> {
  function isLinked(value: T[] | K) {
    return value.length <= 1
  }

  const defaultValue = linkable
    ? [itemSchema.defaultValue]
    : labels.map(() => itemSchema.defaultValue)

  function stringify(value: T[] | K) {
    if (typeof value === 'string') {
      return value
    }

    return (
      value?.map((item) => itemSchema.stringify(item)).join(separator) ?? null
    )
  }

  function regenerate({ previousValue }: RegenOptions<T[] | K>) {
    if (typeof previousValue === 'string') {
      return choose(keywords)
    }
    return previousValue.map(
      (item) => itemSchema.regenerate?.({ previousValue: item }) ?? item
    )
  }

  return {
    input(props) {
      const { value, onChange } = props
      const linked = isLinked(value)
      const ItemInput = itemSchema.input
      return (
        <InputContainer
          {...props}
          stringify={stringify}
          regenerate={regenerate}
          defaultValue={defaultValue}
          keywords={keywords}
        >
          {!(typeof value === 'string') && (
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
                      props.onChange([value[0]])
                    } else {
                      props.onChange(labels.map(() => value[0]))
                    }
                  }}
                >
                  <Link size={14} />
                </Toggle.Root>
              )}
              {value.map((item, i) => {
                return (
                  <ItemInput
                    key={i}
                    // @ts-ignore
                    {...getInputProps(props, i)}
                    onChange={(newItem) => onChange(replace(value, i, newItem))}
                    label={linked ? '' : labels[i]}
                  />
                )
              })}
            </div>
          )}
        </InputContainer>
      )
    },
    stringify,
    defaultValue,
    regenerate,
  }
}
