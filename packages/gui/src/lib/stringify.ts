import { isElement } from 'lodash-es'
import { Length } from '../types/css'
import { addPseudoSyntax, isPseudoClass } from './pseudos'

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

  if (value.unit === 'number') {
    return String(value.value)
  }

  return `${value.value}${value.unit || DEFAULT_LENGTH_UNIT}`
}

const DEFAULT_LENGTH_UNIT = 'px'
