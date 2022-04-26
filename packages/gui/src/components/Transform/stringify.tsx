import { Transform } from './types'

export function stringifyTransform(transform: Transform | Transform[]) {
  if (Array.isArray(transform)) {
    return transform.filter(Boolean).map(stringifyEntry).join(', ')
  }

  return stringifyEntry(transform)
}

const stringifyEntry = (transform: Transform) => {
  // switch(transform.type) {
  //   case 'matrix': {
  //     return `matrix(${})`
  //   }
  // }
}
