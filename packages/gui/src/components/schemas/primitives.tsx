import { stringifyUnit } from '../../lib/stringify'
import { Angle, Color, Length, NumberPercentage } from '../../types/css'
import { AngleInput } from '../inputs/AngleInput'
import { ColorInput } from '../inputs/ColorInput'
import { LengthInput } from '../inputs/LengthInput'
import { NumberPercentageInput } from '../inputs/NumberPercentageInput'
import { SelectInput } from '../inputs/SelectInput'
import { DataTypeSchema } from './data-type'

export const color: DataTypeSchema<Color> = {
  type: ColorInput,
  stringify: (value) => value,
  defaultValue: 'transparent',
}

export const length: DataTypeSchema<Length> = {
  type: LengthInput,
  stringify: stringifyUnit as any,
  defaultValue: { value: 0, unit: 'px' },
}

export const angle: DataTypeSchema<Angle> = {
  type: AngleInput,
  stringify: stringifyUnit as any,
  defaultValue: { value: 0, unit: 'deg' },
}

export const numberPercentage: DataTypeSchema<NumberPercentage> = {
  type: NumberPercentageInput,
  stringify: stringifyUnit as any,
  defaultValue: { value: 0, unit: '%' },
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
