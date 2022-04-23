import { TextShadow } from './types'
import { stringifyUnit } from '../../lib/stringify'

export function stringifyTextShadow(
  textShadow: TextShadow | TextShadow[]
): string {
  if (Array.isArray(textShadow)) {
    return textShadow.filter(Boolean).map(stringifyTextShadow).join(', ')
  }

  return stringifyEntry(textShadow)
}

const stringifyEntry = (textShadow: TextShadow) => {
  return [
    stringifyUnit(textShadow?.offsetX),
    stringifyUnit(textShadow?.offsetY),
    stringifyUnit(textShadow?.blur),
    textShadow?.color,
  ]
    .filter(Boolean)
    .join(' ')
}
