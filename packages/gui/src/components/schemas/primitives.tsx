import { compact, get } from 'lodash-es'
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
import { angleSteps } from '../inputs/AngleInput'
import { ColorInput } from '../inputs/ColorInput'
import { Range } from '../inputs/Dimension/Input'
import { KeywordInput } from '../inputs/KeywordInput'
import { lengthSteps } from '../inputs/LengthInput'
import { NumberInput } from '../inputs/NumberInput'
import { IntegerInput } from '../inputs/PrimitiveInput'
import { TextInput } from '../inputs/TextInput'
import { timeSteps } from '../inputs/TimeInput'
import PalettePopover from '../primitives/ColorPicker/PalettePicker'
import { isValidColor } from '../primitives/ColorPicker/util'
import { dimension } from './dimension'
import { joinSchemas } from './joinSchemas'
import { DataTypeSchema } from './types'

function colorObject({
  defaultValue = '#000',
}: {
  defaultValue?: Color
} = {}): DataTypeSchema<Color> {
  return {
    type: 'color',
    inlineInput: ColorInput,
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate: () => randomColor(),
    validate: ((value: any) => {
      return typeof value === 'string' && isValidColor(value)
    }) as any,
  }
}

interface ThemeColor {
  type: 'theme'
  path: string
}

const themeColor: DataTypeSchema<ThemeColor> = {
  type: 'color',
  inlineInput: PalettePopover,
  stringify: (value, theme) => get(theme?.colors, value.path),
  defaultValue: { type: 'theme', path: 'primary' },
  regenerate: () => randomColor(),
  validate: ((value: any) => {
    if (typeof value !== 'object') return false
    return value.type === 'theme' && typeof value.path === 'string'
  }) as any,
}

export function color({
  defaultValue = 'transparent',
}: {
  defaultValue?: any
} = {}) {
  return joinSchemas([
    colorObject({ defaultValue }),
    themeColor,
    keyword(['transparent', 'currentColor']),
  ])
}

const angleRanges = {
  deg: [0, 360],
  turn: [0, 1],
  rad: [0, 2 * Math.PI],
  grad: [0, 400],
} as const

export function angle({ defaultValue }: { defaultValue?: Angle } = {}) {
  return dimension({
    type: 'angle',
    defaultValue,
    steps: angleSteps,
    regenRanges: angleRanges,
    units: ANGLE_UNITS,
  })
}

const timeRanges = {
  s: [0, 2],
  ms: [0, 2000],
} as const

export function time({ defaultValue }: { defaultValue?: Time } = {}) {
  return dimension({
    type: 'time',
    defaultValue,
    steps: timeSteps,
    regenRanges: timeRanges,
    units: TIME_UNITS,
  })
}

export function percentage({
  defaultValue,
}: { defaultValue?: CSSUnitValue } = {}) {
  return dimension({
    type: '%',
    defaultValue,
    steps: { '%': 0.1 },
    regenRanges: { '%': [0, 100] },
    units: ['%'],
  })
}

export function number({
  defaultValue = 0,
}: { defaultValue?: number } = {}): DataTypeSchema<number> {
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
  defaultValue,
}: { defaultValue?: NumberPercentage } = {}) {
  return dimension({
    type: 'number/%',
    defaultValue,
    steps: { '%': 0.1, number: 0.001 },
    regenRanges: { '%': [0, 100], number: [0, 1] },
    units: ['%', 'number'],
  })
}

const lengthRanges = {
  px: [0, 256],
  rem: [0, 16],
  em: [0, 16],
  '%': [0, 100],
  number: [0, 2],
  fr: [0, 5],
  // TODO remaining ranges
} as const

interface LengthProps {
  defaultValue?: Length
  // keywords?: string[]
  number?: boolean
  percentage?: boolean
  flex?: boolean
  // themeValues?: (CSSUnitValue & { id: string })[]
  themeProperty?: string
  range?: Range
}
export function length({
  defaultValue,
  percentage,
  number,
  flex,
  ...props
}: LengthProps = {}) {
  const units = compact([
    ...LENGTH_UNITS,
    percentage && '%',
    number && 'number',
    flex && 'fr',
  ]) as any[]
  return dimension({
    type: 'length',
    defaultValue,
    steps: lengthSteps,
    regenRanges: lengthRanges,
    units,
    ...props,
  })
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
    type = 'keyword',
  }: {
    defaultValue?: T
    themeProperty?: string
    type?: string
  } = {}
): DataTypeSchema<T> {
  function regenerate() {
    return choose(options)
  }
  return {
    type,
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
