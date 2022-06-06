import { bindProps } from '../../lib/components'
import { randomStep } from '../../lib/random'
import { stringifyUnit } from '../../lib/stringify'
import {
  Angle,
  Color,
  CSSUnitValue,
  Length,
  NumberPercentage,
  Time,
} from '../../types/css'
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
  function regen({ previousValue }: RegenOptions<Angle>) {
    const unit = previousValue.unit
    const [min, max] = angleRanges[unit]
    return {
      unit,
      value: randomStep(min, max, angleSteps[unit]),
    }
  }
  return {
    input: bindProps(AngleInput, ({ value, onChange }: any) => {
      return {
        onRegenerate: () => {
          onChange(regen({ previousValue: value! }))
        },
      }
    }),
    stringify: stringifyUnit as any,
    defaultValue,
    keywords,
    regen,
  }
}

const timeRanges = {
  s: [0, 2],
  ms: [0, 2000],
}

export function time({
  defaultValue = { value: 0, unit: 's' },
}: {
  defaultValue?: Time
} = {}) {
  function regen({ previousValue }: RegenOptions<Time>) {
    const unit = previousValue.unit
    const [min, max] = timeRanges[unit]
    return {
      unit,
      value: randomStep(min, max, timeSteps[unit]),
    }
  }
  return {
    input: bindProps(TimeInput, ({ value, onChange }: any) => {
      return {
        onRegenerate: () => {
          onChange(regen({ previousValue: value! }))
        },
      }
    }),
    stringify: stringifyUnit as any,
    defaultValue,
  }
}

export function percentage({
  defaultValue = { value: 0, unit: '%' },
}: {
  defaultValue?: CSSUnitValue
} = {}) {
  function regen({ previousValue }: RegenOptions<CSSUnitValue>) {
    const unit = previousValue.unit
    return {
      unit,
      value: randomStep(0, 100, 0.1),
    }
  }
  return {
    input: bindProps(PercentageInput, ({ value, onChange }: any) => {
      return {
        onRegenerate: () => {
          onChange(regen({ previousValue: value! }))
        },
      }
    }),
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
  range?: Range
}
export function length({
  defaultValue = { value: 0, unit: 'px' },
  ...props
}: LengthProps = {}) {
  function regen({ previousValue }: RegenOptions<Length>) {
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
    input: bindProps(PercentageInput, ({ value, onChange }: any) => {
      return {
        ...props,
        onRegenerate: () => {
          onChange(regen({ previousValue: value! }))
        },
      }
    }),
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
  }: {
    defaultValue?: T
  } = {}
): DataTypeSchema<T> {
  return {
    input: bindProps(KeywordInput, { options }),
    stringify: (value) => value,
    defaultValue,
  }
}
