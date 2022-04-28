import { stringifyFunction } from '../../../lib/stringify'
import { Transform } from './types'

export function stringifyTransform(transform: Transform | Transform[]) {
  if (Array.isArray(transform)) {
    return transform.filter(Boolean).map(stringifyEntry).join(' ')
  }

  return stringifyEntry(transform)
}

const stringifyEntry = (transform: Transform) => {
  const { type } = transform
  switch (type) {
    case 'matrix': {
      const { a, b, c, d, tx, ty } = transform
      return stringifyFunction(type, [a, b, c, d, tx, ty])
    }
    case 'matrix3d':
      return stringifyFunction(type, transform.values)
    case 'perspective':
      return stringifyFunction(type, [transform.d])
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
      return stringifyFunction(type, [transform.a])
    case 'rotate3d': {
      const { x, y, z, a } = transform
      return stringifyFunction(type, [x, y, z, a])
    }
    case 'scale': {
      const { sx, sy } = transform
      return stringifyFunction(type, [sx, sy])
    }
    case 'scale3d': {
      const { sx, sy, sz } = transform
      return stringifyFunction(type, [sx, sy, sz])
    }
    case 'scaleX': {
      return stringifyFunction(type, [transform.sx])
    }
    case 'scaleY': {
      return stringifyFunction(type, [transform.sy])
    }
    case 'scaleZ': {
      return stringifyFunction(type, [transform.sz])
    }
    case 'skew': {
      const { ax, ay } = transform
      return stringifyFunction(type, [ax, ay])
    }
    case 'skewX': {
      return stringifyFunction(type, [transform.ax])
    }
    case 'skewY': {
      return stringifyFunction(type, [transform.ay])
    }
    case 'translate': {
      const { tx, ty } = transform
      return stringifyFunction(type, [tx, ty])
    }
    case 'translate3d': {
      const { tx, ty, tz } = transform
      return stringifyFunction(type, [tx, ty, tz])
    }
    case 'translateX': {
      return stringifyFunction(type, [transform.tx])
    }
    case 'translateY': {
      return stringifyFunction(type, [transform.ty])
    }
    case 'translateZ': {
      return stringifyFunction(type, [transform.tz])
    }
  }
}
