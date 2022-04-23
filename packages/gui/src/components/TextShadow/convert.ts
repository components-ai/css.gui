import { TextShadow } from './types'
import { stringifyUnit } from '../../lib/stringify'

export function toCssValue(textShadow: TextShadow | TextShadow[]): string {
  if (Array.isArray(textShadow)) {
    return textShadow.filter(Boolean).map(toCssValue).join(', ')
  }

  return getTextShadow(textShadow)
}

export const getTextShadow = (textShadow: TextShadow) => {
  return [
    stringifyUnit(textShadow?.offsetX),
    stringifyUnit(textShadow?.offsetY),
    stringifyUnit(textShadow?.blur),
    textShadow?.color,
  ]
    .filter(Boolean)
    .join(' ')
}
