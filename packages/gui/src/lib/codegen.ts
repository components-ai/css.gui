import {
  Styles,
  AbsoluteLengthUnits,
  Length,
  ThemeUnits,
  KeywordUnits,
  CSSUnitValue,
} from '../types/css'

import { toCssValue as convertEasingFunction } from '../components/EasingFunction/convert'
import { has } from 'immer/dist/internal'

const DEFAULT_LENGTH_UNIT = AbsoluteLengthUnits.Px
export const stringifyUnit = (
  property?: string, // In the future the property might determine how we stringify
  value?: unknown
): Array<string | null> | string | number | null => {
  if (Array.isArray(value)) {
    // @ts-ignore
    return value.map((v: Length | string | null) => stringifyUnit(property, v))
  }

  if (
    ['transitionTimingFunction', 'animationTimingFunction'].includes(
      property || ''
    )
  ) {
    return convertEasingFunction(value as any)
  }

  if (!isCSSUnitValue(value)) {
    return String(value) ?? null
  }

  if (value.value === undefined) {
    return null
  }

  if (
    value.unit === ThemeUnits.Theme ||
    value.unit === 'raw' ||
    value.unit === KeywordUnits.Keyword
  ) {
    return value.value
  }

  if (value.unit === 'number') {
    return String(value.value)
  }

  return `${value.value}${value.unit || DEFAULT_LENGTH_UNIT}`
}

type StyleEntry = [string, Length | string | null | undefined]
export const toCSSObject = (styles: Styles) => {
  return Object.entries(styles).reduce((acc: Styles, curr: StyleEntry) => {
    const [property, value] = curr
    return {
      ...acc,
      [property]: stringifyUnit(property, value),
    }
  }, {})
}

function isCSSUnitValue(value: any): value is CSSUnitValue {
  if (typeof value !== 'object') {
    return false
  }

  if (!has(value, 'value') || !has(value, 'unit')) {
    return false
  }

  return true
}
