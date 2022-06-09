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
import { Theme } from '../../types/theme'
import { AngleInput } from '../inputs/AngleInput'
import { ColorInput } from '../inputs/ColorInput'
import { Range } from '../inputs/Dimension/Input'
import { KeywordInput } from '../inputs/KeywordInput'
import { LengthInput } from '../inputs/LengthInput'
import { NumberInput } from '../inputs/NumberInput'
import { NumberPercentageInput } from '../inputs/NumberPercentageInput'
import { IntegerInput, PercentageInput } from '../inputs/PrimitiveInput'
import { TextInput } from '../inputs/TextInput'
import { TimeInput } from '../inputs/TimeInput'
import { DataTypeSchema } from './types'

export function color({
  defaultValue = { value: 'transparent'},
  themeProperty = 'color',
}: {
  defaultValue?: Color
  themeProperty?: string
} = {}): DataTypeSchema<Color> {
  return {
    input: bindProps(ColorInput, { themeProperty }),
    stringify: stringifyUnit as any,
    defaultValue,
  }
}

export function angle({
  defaultValue = { value: 0, unit: 'deg' },
  keywords = [],
}: {
  defaultValue?: Angle
  keywords?: readonly string[]
} = {}) {
  return {
    input: AngleInput,
    stringify: stringifyUnit as any,
    defaultValue,
    keywords,
  }
}

export function time({
  defaultValue = { value: 0, unit: 's' },
  themeProperty,
}: {
  defaultValue?: Time,
  themeProperty?: Theme
} = {}) {
  return {
    input: bindProps(TimeInput, { themeProperty }),
    stringify: stringifyUnit as any,
    defaultValue,
  }
}

export function percentage({
  defaultValue = { value: 0, unit: '%' },
}: {
  defaultValue?: CSSUnitValue
} = {}) {
  return {
    input: PercentageInput,
    stringify: stringifyUnit as any,
    defaultValue,
  }
}

export function number({
  defaultValue = 0,
}: {
  defaultValue?: number
} = {}) {
  return {
    input: NumberInput,
    stringify: (x: number) => x.toString(),
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
  themeProperty?: string
  range?: Range
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

export function integer({
  defaultValue = { value: 0, unit: 'number' },
  keywords,
}: {
  defaultValue?: CSSUnitValue
  keywords?: string[]
} = {}) {
  return {
    input: IntegerInput,
    stringify: stringifyUnit as any,
    defaultValue,
    keywords,
  }
}

export function ident({
  defaultValue = '',
}: {
  defaultValue?: string
} = {}): DataTypeSchema<string> {
  return {
    // Right now, just use a text input.
    // In the future we may want to do smart-identification of identifiers
    // the user has used in other places
    input: TextInput,
    stringify: (value) => value,
    defaultValue,
  }
}

export function string({
  defaultValue = '',
}: {
  defaultValue?: string
} = {}): DataTypeSchema<string> {
  return {
    input: TextInput,
    stringify: (value) => `"${value}"`,
    defaultValue,
  }
}

export function keyword<T extends string>(
  options: readonly T[],
  {
    defaultValue = options[0],
    themeProperty,
  }: {
    defaultValue?: T
    themeProperty?: string
  } = {}
): DataTypeSchema<T> {
  return {
    input: bindProps(KeywordInput, { options, themeProperty }),
    stringify: (value) => value,
    defaultValue,
  }
}
