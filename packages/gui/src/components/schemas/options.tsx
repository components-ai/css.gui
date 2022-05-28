import { getInputProps } from '../../lib/util'
import { SelectInput } from '../inputs/SelectInput'
import { Label } from '../primitives'
import { DataTypeSchema } from './types'

interface CreateOptions<V extends string, T extends object> {
  // TODO figure out how to type the different union options correctly
  variants: Record<V, DataTypeSchema<any>>
  order?: V[]
  stringify?(variant: V, value: string): string
}
export function optionsSchema<V extends string, T extends object>({
  variants,
  order = Object.keys(variants) as any,
  stringify = (variant, value) => value,
}: CreateOptions<V, T>): DataTypeSchema<T & { type: V }> {
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
