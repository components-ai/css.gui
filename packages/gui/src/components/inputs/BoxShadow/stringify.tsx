import { BoxShadow } from './types'
import { stringifyUnit } from '../../../lib/stringify'

export function stringifyBoxShadow(boxShadow: BoxShadow | BoxShadow[]): string {
  if (Array.isArray(boxShadow)) {
    return boxShadow.filter(Boolean).map(stringifyBoxShadow).join(', ')
  }

  return stringifyEntry(boxShadow)
}

const stringifyEntry = (boxShadow: BoxShadow) => {
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
