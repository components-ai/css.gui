import { Length } from '../../types/css'
import { BoxShadow } from './types'

export function toCssValue(boxShadow: BoxShadow | BoxShadow[]): string {
  if (Array.isArray(boxShadow)) {
    return boxShadow.filter(Boolean).map(toCssValue).join(', ')
  }

  return getBoxShadow(boxShadow)
}

export const getBoxShadow = (boxShadow: BoxShadow) => {
  return [
    boxShadow.inset && 'inset',
    getLength(boxShadow.offsetX),
    getLength(boxShadow.offsetY),
    getLength(boxShadow.blur),
    getLength(boxShadow.spread),
    boxShadow.color,
  ]
    .filter(Boolean)
    .join(' ')
}

export const getStyles = (boxShadow: BoxShadow | BoxShadow[]) => {
  const value = squeeze(toCssValue(boxShadow))

  return {
    boxShadow: value,
  }
}

const getLength = (length: Length) => {
  if (length === '0') {
    return length
  }
  return length ? `${length.value}${length.unit}` : null
}

export const squeeze = (s: string) => s.replace(/\s+/g, ' ').trim() // Remove duplicate whitespace
