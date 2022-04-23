import { BoxShadow } from './types'
import { stringifyUnit } from '../../lib/stringify'

export function toCssValue(boxShadow: BoxShadow | BoxShadow[]): string {
  if (Array.isArray(boxShadow)) {
    return boxShadow.filter(Boolean).map(toCssValue).join(', ')
  }

  return getBoxShadow(boxShadow)
}

export const getBoxShadow = (boxShadow: BoxShadow) => {
  return [
    boxShadow.inset && 'inset',
    stringifyUnit(boxShadow.offsetX),
    stringifyUnit(boxShadow.offsetY),
    stringifyUnit(boxShadow.blur),
    stringifyUnit(boxShadow.spread),
    boxShadow.color,
  ]
    .filter(Boolean)
    .join(' ')
}
