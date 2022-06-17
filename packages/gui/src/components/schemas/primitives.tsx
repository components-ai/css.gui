import { compact } from 'lodash-es'
import { randomColor } from '../../lib/color'
import { bindProps } from '../../lib/components'
import { choose, randomStep } from '../../lib/random'
import { stringifyUnit } from '../../lib/stringify'
import { randomInt } from '../../lib/util'
import {
  Angle,
  ANGLE_UNITS,
  Color,
  CSSUnitValue,
  Length,
  LENGTH_UNITS,
  NumberPercentage,
  Time,
  TIME_UNITS,
} from '../../types/css'
import { Theme } from '../../types/theme'
import { AngleInput, angleSteps } from '../inputs/AngleInput'
import { ColorInput } from '../inputs/ColorInput'
import { Range } from '../inputs/Dimension/Input'
import { KeywordInput } from '../inputs/KeywordInput'
import { LengthInput, lengthSteps } from '../inputs/LengthInput'
import { NumberInput } from '../inputs/NumberInput'
import { NumberPercentageInput } from '../inputs/NumberPercentageInput'
import { IntegerInput, PercentageInput } from '../inputs/PrimitiveInput'
import { TextInput } from '../inputs/TextInput'
import { TimeInput, timeSteps } from '../inputs/TimeInput'
import { isValidColor } from '../primitives/ColorPicker/util'
import { DataTypeSchema, RegenOptions } from './types'

export function color({
  defaultValue = { value: 'transparent' },
  themeProperty = 'color',
}: {
  defaultValue?: Color
  themeProperty?: string
} = {}): DataTypeSchema<Color> {
  return {
    type: 'color',
    inlineInput: bindProps(ColorInput, { themeProperty }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate: () => randomColor(),
    validate: ((value: unknown) => {
      return typeof value === 'object' && isValidColor((value as any).value)
    }) as any,
  }
}

function validateDimension(value: any, units: readonly string[]) {
  if (typeof value !== 'object') return false
  return units.includes(value.unit) && typeof value.value === 'number'
}

const angleRanges = {
  deg: [0, 360],
  turn: [0, 1],
  rad: [0, 2 * Math.PI],
  grad: [0, 400],
}

export function angle({
  defaultValue = { value: 0, unit: 'deg' },
}: {
  defaultValue?: Angle
} = {}): DataTypeSchema<Angle> {
  function regenerate({ previousValue }: RegenOptions<Angle>) {
    const unit = previousValue.unit
    const [min, max] = angleRanges[unit]
    return {
      unit,
      value: randomStep(min, max, angleSteps[unit]),
    }
  }
  return {
    type: 'angle',
    inlineInput: bindProps(AngleInput, { regenerate }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate,
    validate: ((value: any) => validateDimension(value, ANGLE_UNITS)) as any,
  }
}

const timeRanges = {
  s: [0, 2],
  ms: [0, 2000],
}

export function time({
  defaultValue = { value: 0, unit: 's' },
  themeProperty,
}: {
  defaultValue?: Time
  themeProperty?: Theme
} = {}): DataTypeSchema<Time> {
  function regenerate({ previousValue }: RegenOptions<Time>) {
    const unit = previousValue.unit
    const [min, max] = timeRanges[unit]
    return {
      unit,
      value: randomStep(min, max, timeSteps[unit]),
    }
  }
  return {
    type: 'time',
    inlineInput: bindProps(TimeInput, { regenerate, themeProperty }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate,
    validate: ((value: any) => validateDimension(value, TIME_UNITS)) as any,
  }
}

export function percentage({
  defaultValue = { value: 0, unit: '%' },
}: {
  defaultValue?: CSSUnitValue
} = {}): DataTypeSchema<CSSUnitValue> {
  function regenerate({ previousValue }: RegenOptions<CSSUnitValue>) {
    const unit = previousValue.unit
    return {
      unit,
      value: randomStep(0, 100, 0.1),
    }
  }
  return {
    type: '%',
    inlineInput: bindProps(PercentageInput, { regenerate }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate,
    validate: ((value: any) => validateDimension(value, ['%'])) as any,
  }
}

export function number({
  defaultValue = 0,
}: {
  defaultValue?: number
} = {}): DataTypeSchema<number> {
  function regenerate() {
    return randomStep(0, 2, 0.1)
  }
  return {
    type: 'number',
    inlineInput: bindProps(NumberInput, regenerate),
    stringify: (x: number) => x.toString(),
    defaultValue,
    regenerate,
    validate: ((value: any) => typeof value === 'number') as any,
  }
}

export function numberPercentage({
  defaultValue = { value: 0, unit: '%' },
}: {
  defaultValue?: NumberPercentage
} = {}): DataTypeSchema<NumberPercentage> {
  return {
    type: 'number/%',
    inlineInput: NumberPercentageInput,
    stringify: stringifyUnit as any,
    defaultValue,
    validate: ((value: any) =>
      validateDimension(value, ['%', 'number'])) as any,
  }
}

const lengthRanges = {
  px: [0, 256],
  rem: [0, 16],
  em: [0, 16],
  '%': [0, 100],
  number: [0, 2],
  fr: [0, 5],
  // TODO remaining ranges
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
}: LengthProps = {}): DataTypeSchema<Length> {
  function regenerate({ previousValue }: RegenOptions<Length>) {
    const unit = previousValue === '0' ? 'px' : previousValue.unit
    // @ts-ignore
    const [min, max] = lengthRanges[unit]
    return {
      unit,
      // @ts-ignore
      value: randomStep(min, max, lengthSteps[unit]),
    }
  }
  const units = compact([
    ...LENGTH_UNITS,
    percentage ?? '%',
    number ?? 'number',
  ]) as any[]
  return {
    type: 'length',
    inlineInput: bindProps(LengthInput, { ...props, regenerate }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate,
    validate: ((value: any) => validateDimension(value, units)) as any,
  }
}

export function lengthPercentage(props: Omit<LengthProps, 'percentage'> = {}) {
  return length({ ...props, percentage: true })
}

export function integer({
  defaultValue = 0,
}: {
  defaultValue?: number
} = {}): DataTypeSchema<number> {
  function regenerate() {
    return randomInt(0, 11)
  }
  return {
    type: 'integer',
    inlineInput: bindProps(IntegerInput, { regenerate }),
    stringify: stringifyUnit as any,
    defaultValue,
    validate: ((value: any) => typeof value === 'number') as any,
  }
}

export function ident({
  defaultValue = '',
}: {
  defaultValue?: string
} = {}): DataTypeSchema<string> {
  return {
    type: 'identifier',
    // Right now, just use a text input.
    // In the future we may want to do smart-identification of identifiers
    // the user has used in other places
    inlineInput: TextInput,
    stringify: (value) => value,
    defaultValue,
    validate: ((value: any) => typeof value === 'string') as any,
  }
}

export function string({
  defaultValue = '',
}: {
  defaultValue?: string
} = {}): DataTypeSchema<string> {
  return {
    type: 'string',
    inlineInput: TextInput,
    stringify: (value) => `"${value}"`,
    defaultValue,
    validate: ((value: any) => typeof value === 'string') as any,
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
  function regenerate() {
    return choose(options)
  }
  return {
    type: 'keyword',
    inlineInput: bindProps(KeywordInput, {
      options,
      regenerate,
      themeProperty,
    }),
    stringify: (value) => value,
    defaultValue,
    regenerate: regenerate,
    validate: ((value: any) => options.includes(value)) as any,
  }
}
