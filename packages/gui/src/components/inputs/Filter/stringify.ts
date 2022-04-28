import { stringifyFunction, stringifyUnit } from '../../../lib/stringify'
import { Filter } from './types'

export function stringifyFilter(filter: Filter | Filter[]) {
  if (Array.isArray(filter)) {
    return filter.map(stringifyEntry).join(' ')
  }
  return stringifyEntry(filter)
}

function stringifyEntry(filter: Filter) {
  const { type } = filter
  switch (type) {
    case 'blur':
      return stringifyFunction(type, [filter.radius])
    case 'drop-shadow': {
      const { offsetX, offsetY, blurRadius, color } = filter
      return stringifyFunction(type, [offsetX, offsetY, blurRadius, color], ' ')
    }
    case 'hue-rotate':
      return stringifyFunction(type, [filter.angle])
    default:
      return stringifyFunction(type, [filter.amount])
  }
}
