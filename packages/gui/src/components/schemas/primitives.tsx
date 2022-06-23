import { compact } from 'lodash-es'
import { bindProps } from '../../lib/components'
import { choose, randomStep } from '../../lib/random'
import { stringifyUnit } from '../../lib/stringify'
import { randomInt } from '../../lib/util'
import {
  CSSUnitValue,
  Length,
  LENGTH_UNITS,
  NumberPercentage,
} from '../../types/css'
import { Range } from '../inputs/Dimension/Input'
import { KeywordInput } from '../inputs/KeywordInput'
import { NumberInput } from '../inputs/NumberInput'
import { IntegerInput } from '../inputs/PrimitiveInput'
import { TextInput } from '../inputs/TextInput'
import { dimension } from './dimension'
import { DataTypeSchema } from './types'

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

const lengthConversions = {
  px: 16,
  rem: 1,
  em: 1,
}

export const lengthSteps = {
  number: 0.1,
  theme: 1,
  px: 1,
  em: 0.125,
  rem: 0.125,
  '%': 0.1,
  fr: 0.1,
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
    conversions: lengthConversions,
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
    stringify: (value) => value.toString(),
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
  if (options.length === 1) {
    return literal(options[0])
  }
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
    validate: ((value: any) => options.includes(value.toString())) as any,
  }
}

function literal<T extends string>(value: T): DataTypeSchema<T> {
  return {
    type: value,
    inlineInput: () => <div sx={{ fontSize: 1 }}>{value}</div>,
    stringify: (value) => value,
    defaultValue: value,
    regenerate: () => value,
    validate: ((testValue: any) => testValue === value) as any,
  }
}
