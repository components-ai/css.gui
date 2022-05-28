import { bindProps } from '../../lib/components'
import { stringifyUnit } from '../../lib/stringify'
import {
  Angle,
  Color,
  CSSUnitValue,
  Length,
  NumberPercentage,
  Time,
} from '../../types/css'
import { AngleInput } from '../inputs/AngleInput'
import { ColorInput } from '../inputs/ColorInput'
import { LengthInput } from '../inputs/LengthInput'
import { NumberPercentageInput } from '../inputs/NumberPercentageInput'
import { SelectInput } from '../inputs/SelectInput'
import { TimeInput } from '../inputs/TimeInput'
import { DataTypeSchema } from './compose'

export function color({
  defaultValue = 'transparent',
}: {
  defaultValue?: Color
} = {}): DataTypeSchema<Color> {
  return {
    input: ColorInput,
    stringify: (value) => value,
    defaultValue,
  }
}

export function angle({
  defaultValue = { value: 0, unit: 'deg' },
}: {
  defaultValue?: Angle
} = {}) {
  return {
    input: AngleInput,
    stringify: stringifyUnit as any,
    defaultValue,
  }
}

export function time({
  defaultValue = { value: 0, unit: 's' },
}: {
  defaultValue?: Time
} = {}) {
  return {
    input: TimeInput,
    stringify: stringifyUnit as any,
    defaultValue,
  }
}

export function numberPercentage({
  defaultValue = { value: 0, unit: '%' },
}: {
  defaultValue?: NumberPercentage
} = {}) {
  return {
    input: NumberPercentageInput,
    stringify: stringifyUnit as any,
    defaultValue,
  }
}

interface LengthProps {
  defaultValue?: Length
  keywords?: string[]
  number?: boolean
  percentage?: boolean
  flex?: boolean
  themeValues?: (CSSUnitValue & { id: string })[]
}
export function length({
  defaultValue = { value: 0, unit: 'px' },
  ...props
}: LengthProps = {}) {
  return {
    input: bindProps(LengthInput, props),
    stringify: stringifyUnit as any,
    defaultValue,
  }
}

export function lengthPercentage(props: Omit<LengthProps, 'percentage'> = {}) {
  return length({ ...props, percentage: true })
}

export function keyword<T extends string>(
  options: readonly T[],
  {
    defaultValue = options[0],
  }: {
    defaultValue?: T
  } = {}
): DataTypeSchema<T> {
  return {
    input: bindProps(SelectInput, { options: options }),
    stringify: (value) => value,
    defaultValue,
  }
}
