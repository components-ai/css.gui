import { toNumber } from 'lodash-es'
import { UnitConversions, UnitSteps } from '../../lib'
import { bindProps } from '../../lib/components'
import { Token } from '../../lib/parse'
import { randomStep } from '../../lib/random'
import { stringifyUnit } from '../../lib/stringify'
import { DimensionInput } from '../inputs/Dimension'
import { Range } from '../inputs/Dimension/Input'
import { calc } from './calc'
import { joinSchemas } from './joinSchemas'
import { DataTypeSchema, RegenOptions } from './types'

type UnitRanges<U extends string> = Record<U, readonly [number, number]>

interface DimensionProps<U extends string> {
  type: string
  range?: Range
  steps: UnitSteps
  units: readonly U[]
  conversions?: UnitConversions
  defaultValue?: UnitValue<U>
  regenRanges: UnitRanges<U>
}

type UnitValue<U> = { value: number; unit: U }

function basicDimension<U extends string>({
  type,
  range,
  steps,
  units,
  conversions,
  defaultValue = { value: 0, unit: units[0] },
  regenRanges,
}: DimensionProps<U>): DataTypeSchema<UnitValue<U>> {
  function regenerate({ previousValue }: RegenOptions<UnitValue<U>>) {
    const unit = previousValue.unit
    const [min, max] = regenRanges[unit] ?? [0, 100]
    return {
      unit,
      value: randomStep(min, max, steps[unit] ?? 1),
    }
  }
  return {
    type,
    inlineInput: bindProps(DimensionInput, {
      conversions,
      range,
      steps,
      units,
    }),
    stringify: stringifyUnit as any,
    defaultValue,
    regenerate,
    validate: ((value: any) => validateDimension(value, units)) as any,
    parse(tokens) {
      const [first, ...rest] = tokens
      const result = parseDimension(first, units)
      if (!result) {
        return [undefined, tokens]
      }
      return [result, rest]
    },
  }
}

export function dimension<U extends string>(options: DimensionProps<U>) {
  const base = basicDimension(options)
  return joinSchemas([base, calc(base)], { type: base.type })
}

function validateDimension(value: any, units: readonly string[]) {
  if (typeof value !== 'object') return false
  return units.includes(value.unit) && typeof value.value === 'number'
}

function parseDimension<U extends string>(
  token: Token,
  units: readonly U[]
): UnitValue<U> | undefined {
  if (typeof token !== 'string') return undefined
  // special case handling for raw numbers
  if ((units as any).includes('number') && !isNaN(+token)) {
    return { value: +token, unit: 'number' as U }
  }
  const unit = units.find((unit) => token.endsWith(unit))
  if (!unit) return undefined
  const numberPart = toNumber(token.replace(unit, ''))
  if (isNaN(numberPart)) return undefined
  return { value: numberPart, unit }
}
