import { randomColor } from '../../lib/color'
import { bindProps } from '../../lib/components'
import { choose, randomStep } from '../../lib/random'
import { stringifyUnit } from '../../lib/stringify'
import { randomInt } from '../../lib/util'
import {
  Angle,
  Color,
  CSSUnitValue,
  Length,
  NumberPercentage,
  Time,
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
import { DataTypeSchema, RegenOptions } from './types'

export function color({
  defaultValue = { value: 'transparent' },
  themeProperty = 'color',
}: {
  defaultValue?: Color
  themeProperty?: string
} = {}): DataTypeSchema<Color> {
  return {
    inlineInput: bindProps(ColorInput, { themeProperty }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate: () => randomColor(),
  }
}

const angleRanges = {
  deg: [0, 360],
  turn: [0, 1],
  rad: [0, 2 * Math.PI],
  grad: [0, 400],
}

export function angle({
  defaultValue = { value: 0, unit: 'deg' },
  keywords = [],
}: {
  defaultValue?: Angle
  keywords?: readonly string[]
} = {}) {
  function regenerate({ previousValue }: RegenOptions<Angle>) {
    const unit = previousValue.unit
    const [min, max] = angleRanges[unit]
    return {
      unit,
      value: randomStep(min, max, angleSteps[unit]),
    }
  }
  return {
    inlineInput: bindProps(AngleInput, { regenerate }),
    stringify: stringifyUnit as any,
    defaultValue,
    keywords,
    regenerate,
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
} = {}) {
  function regenerate({ previousValue }: RegenOptions<Time>) {
    const unit = previousValue.unit
    const [min, max] = timeRanges[unit]
    return {
      unit,
      value: randomStep(min, max, timeSteps[unit]),
    }
  }
  return {
    inlineinlineInput: bindProps(TimeInput, { regenerate, themeProperty }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate,
  }
}

export function percentage({
  defaultValue = { value: 0, unit: '%' },
}: {
  defaultValue?: CSSUnitValue
} = {}) {
  function regenerate({ previousValue }: RegenOptions<CSSUnitValue>) {
    const unit = previousValue.unit
    return {
      unit,
      value: randomStep(0, 100, 0.1),
    }
  }
  return {
    inlineInput: bindProps(PercentageInput, { regenerate }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate,
  }
}

export function number({
  defaultValue = 0,
}: {
  defaultValue?: number
} = {}) {
  function regenerate() {
    return randomStep(0, 2, 0.1)
  }
  return {
    inlineInput: bindProps(NumberInput, regenerate),
    stringify: (x: number) => x.toString(),
    defaultValue,
    regenerate,
  }
}

export function numberPercentage({
  defaultValue = { value: 0, unit: '%' },
}: {
  defaultValue?: NumberPercentage
} = {}) {
  return {
    inlineInput: NumberPercentageInput,
    stringify: stringifyUnit as any,
    defaultValue,
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
}: LengthProps = {}) {
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
  return {
    inlineInput: bindProps(LengthInput, { ...props, regenerate }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate,
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
  function regenerate() {
    return randomInt(0, 11)
  }
  return {
    inlineInput: bindProps(IntegerInput, { regenerate }),
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
    inlineInput: TextInput,
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
    inlineInput: TextInput,
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
  function regenerate() {
    return choose(options)
  }
  return {
    inlineInput: bindProps(KeywordInput, {
      options,
      regenerate,
      themeProperty,
    }),
    stringify: (value) => value,
    defaultValue,
    regenerate: regenerate,
  }
}
