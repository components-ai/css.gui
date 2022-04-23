import { TextShadow } from './types'
import { Length } from '../../types/css'

export function toCssValue(textShadow: TextShadow | TextShadow[]): string {
  if (Array.isArray(textShadow)) {
    return textShadow.filter(Boolean).map(toCssValue).join(', ')
  }

  return getTextShadow(textShadow)
}

export const getTextShadow = (textShadow: TextShadow) => {
  return [
    getLength(textShadow?.offsetX),
    getLength(textShadow?.offsetY),
    getLength(textShadow?.blur),
    textShadow?.color,
  ]
    .filter(Boolean)
    .join(' ')
}

export const getStyles = (textShadow: TextShadow | TextShadow[]) => {
  const value = squeeze(toCssValue(textShadow))

  return {
    textShadow: value,
  }
}

const getLength = (length: Length) => {
  if (length === '0') {
    return length
  }
  if (length.unit === 'number' || length.unit === 'keyword') {
    return length.value
  }
  return length ? `${length.value}${length.unit}` : null
}

export const squeeze = (s: string) => s.replace(/\s+/g, ' ').trim() // Remove duplicate whitespace
