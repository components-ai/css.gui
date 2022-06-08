import { omit } from 'lodash-es'
import { getInputProps } from '../../lib/util'
import { SelectInput } from '../inputs/SelectInput'
import { InputHeader } from '../ui/InputHeader'
import { rowGap } from './gap'
import { DataTypeSchema, RegenOptions } from './types'

interface CreateOptions<T extends Record<string, any>> {
  variants: { [V in keyof T]: DataTypeSchema<T[V]> }
  order?: (keyof T)[]
  stringify?(variant: keyof T, value: string): string
  convert?(oldValue: Unionize<T>[any], newType: keyof T): Partial<T[any]>
}

/**
 * Create a schema that lets a user choose between several types,
 * each with a distinct structure as specified by the given `variants`.
 */
export function optionsSchema<T extends Record<string, any>>({
  variants,
  order = Object.keys(variants),
  stringify = (variant, value) => value,
  convert = () => ({}),
}: CreateOptions<T>): DataTypeSchema<Unionize<T>> {
  function regen({ previousValue }: RegenOptions<Unionize<T>>): Unionize<T> {
    const type = previousValue.type
    const newValue = variants[type].regenerate?.({
      previousValue: omit(previousValue, 'type'),
    } as any)
    return ({
      ...newValue,
      type,
    } ?? previousValue) as any
  }

  return {
    input(props) {
      const type = props.value.type as keyof T
      const Component = variants[type].input
      return (
        <div>
          <InputHeader
            {...props}
            onRegenerate={() => {
              props.onChange(regen({ previousValue: props.value }))
            }}
          >
            <SelectInput
              {...getInputProps(props, 'type')}
              label=""
              options={order as string[]}
              onChange={(newType) => {
                // if the type changes, reset the value to the default value of that type
                props.onChange({
                  ...variants[newType].defaultValue,
                  ...convert(props.value, newType),
                  type: newType,
                })
              }}
            />
          </InputHeader>
          <Component value={props.value} onChange={props.onChange} label={''} />
        </div>
      )
    },
    stringify(value) {
      const type = value.type as keyof T
      return stringify(type, variants[type].stringify(value))
    },
    defaultValue: {
      ...variants[order[0]].defaultValue,
      type: order[0],
    },
    regenerate: regen,
  }
}

// Utility types to help typecheck these options correctly,
// based on: https://stackoverflow.com/questions/62591230/typescript-convert-a-tagged-union-into-an-union-type
type Unionize<T> = { [K in keyof T]: { type: K } & T[K] }[keyof T]
