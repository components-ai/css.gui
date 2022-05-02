import { isElement, isNil } from 'lodash-es'
import { Color, Length } from '../types/css'
import { addPseudoSyntax } from './pseudos'

export function stringifySelector(selector: string): string {
  if (isElement(selector)) {
    return selector
  }

  return addPseudoSyntax(selector)
}

export function stringifyUnit(value: Length) {
  if (value === '0') {
    return value
  }
  if (!value || value.value === undefined) {
    return null
  }

  if (
    value.unit === 'theme' ||
    value.unit === 'raw' ||
    value.unit === 'keyword'
  ) {
    return value.value
  }

  if (value.unit === 'string') {
    // TODO handle string escapes
    return `'${value.value}'`
  }

  if (value.unit === 'number') {
    return String(value.value)
  }

  return `${value.value}${value.unit || DEFAULT_LENGTH_UNIT}`
}

const DEFAULT_LENGTH_UNIT = 'px'

export function stringifyFunction(
  name: string,
  properties: Primitive[],
  separator: string = ', '
) {
  return `${name}(${properties
    .filter((x) => !isNil(x))
    .map(stringifyPrimitive)
    .join(separator)})`
}

export function stringifyValues(
  properties: Primitive[],
  separator: string = ' '
) {
  return `${properties
    .filter((x) => !isNil(x))
    .map(stringifyPrimitive)
    .join(separator)}`
}

export function stringifyPrimitive(value: Primitive) {
  if (typeof value === 'number') {
    return '' + value
  }
  if (typeof value === 'string') {
    return value
  }
  return stringifyUnit(value)
}

type Primitive = Length | number | Color
