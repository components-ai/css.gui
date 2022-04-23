import { Styles, Length, CSSUnitValue } from '../types/css'

import { toCssValue as convertEasingFunction } from '../components/EasingFunction/convert'
import { toCssValue as convertBoxShadow } from '../components/BoxShadow/convert'
import { toCssValue as convertTextShadow } from '../components/TextShadow/convert'
import { stringifyUnit } from './stringify'
import { has } from 'lodash-es'

export const stringifyProperty = (
  property?: string, // In the future the property might determine how we stringify
  value?: unknown
): Array<string | null> | string | number | null => {
  if (property === 'boxShadow') {
    return convertBoxShadow(value as any)
  }
  if (property === 'textShadow') {
    return convertTextShadow(value as any)
  }

  if (Array.isArray(value)) {
    // @ts-ignore
    return value.map((v: Length | string | null) =>
      stringifyProperty(property, v)
    )
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
  return stringifyUnit(value)
}

type StyleEntry = [string, Length | string | null | undefined]
export const toCSSObject = (styles: Styles) => {
  return Object.entries(styles).reduce((acc: Styles, curr: StyleEntry) => {
    const [property, value] = curr
    return {
      ...acc,
      [property]: stringifyProperty(property, value),
    }
  }, {})
}

function isCSSUnitValue(value: unknown): value is CSSUnitValue {
  if (typeof value !== 'object') {
    return false
  }

  if (!has(value, 'value') || !has(value, 'unit')) {
    return false
  }

  return true
}
