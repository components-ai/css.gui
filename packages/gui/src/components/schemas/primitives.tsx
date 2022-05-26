import { stringifyUnit } from '../../lib/stringify'
import { Color, Length } from '../../types/css'
import { LengthInput } from '../inputs/LengthInput'
import { SelectInput } from '../inputs/SelectInput'
import { ColorPopover } from '../primitives'
import { DataTypeSchema } from './data-type'

export const color: DataTypeSchema<Color> = {
  type: ColorPopover,
  stringify: (value) => value,
  defaultValue: 'transparent',
}

export const length: DataTypeSchema<Length> = {
  type: LengthInput,
  stringify: stringifyUnit as any,
  defaultValue: { value: 0, unit: 'px' },
}

export function keywordSchema<T extends string>(
  options: readonly T[]
): { schema: DataTypeSchema<T>; props: any } {
  return {
    schema: {
      type: SelectInput as any,
      stringify: (value) => value,
      defaultValue: options[0],
    },
    props: { options },
  }
}
