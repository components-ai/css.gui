import { stringifyUnit } from '../../lib/stringify'
import { CSSFilter } from './types'

export function stringifyFilter(filter: CSSFilter | CSSFilter[]) {
  if (Array.isArray(filter)) {
    return filter.map(stringifyEntry).join(' ')
  }
  return stringifyEntry(filter)
}

function stringifyEntry(filter: CSSFilter) {
  const { type } = filter
  switch (type) {
    case 'blur':
      return `${type}(${stringifyUnit(filter.radius)})`
    case 'drop-shadow': {
      const { offsetX, offsetY, blurRadius, color } = filter
      const blurRadiusString = blurRadius ? ` ${stringifyUnit(blurRadius)}` : ''
      const colorString = color ? ' ' + color : ''
      return `${type}(${stringifyUnit(offsetX)} ${stringifyUnit(
        offsetY
      )}${blurRadiusString}${colorString})`
    }
    case 'hue-rotate':
      return `${type}(${stringifyUnit(filter.angle)})`
    default:
      return `${type}(${stringifyUnit(filter.amount)})`
  }
}
