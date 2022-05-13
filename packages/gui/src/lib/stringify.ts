import { isElement, isNil } from 'lodash-es'
import {
  Color,
  Length,
  MultidimensionalLengthUnit,
  Position,
} from '../types/css'
import { addPseudoSyntax } from './pseudos'

export function stringifySelector(selector: string): string {
  if (isElement(selector)) {
    return selector
  }

  return addPseudoSyntax(selector)
}

export function stringifyUnit(
  providedValue: Length | MultidimensionalLengthUnit
): string | number | null {
  if (
    (providedValue as MultidimensionalLengthUnit).type ===
    'multidimensionalLength'
  ) {
    return (providedValue as MultidimensionalLengthUnit).values
      .map(stringifyUnit)
      .join(' ')
  }

  const value = providedValue as Length

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
  properties: (Primitive | null)[],
  separator: string = ' '
) {
  return `${properties
    .filter((x) => !isNil(x))
    .map(stringifyPrimitive as any)
    .join(separator)}`
}

export function stringifyPosition(position: Position) {
  return `${stringifyUnit(position.x)} ${stringifyUnit(position.y)}`
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

type Primitive = Length | number | Color | MultidimensionalLengthUnit
