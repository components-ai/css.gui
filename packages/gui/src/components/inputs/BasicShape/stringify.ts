import {
  stringifyFunction,
  stringifyPosition,
  stringifyUnit,
} from '../../../lib/stringify'
import { BasicShape } from './types'

export function stringifyBasicShape(value: BasicShape) {
  const { type } = value
  switch (type) {
    case 'inset': {
      const { top, right, bottom, left, borderRadius } = value
      return stringifyFunction(
        type,
        [top, right, bottom, left, 'round', borderRadius],
        ' '
      )
    }
    case 'circle': {
      const { radius, position } = value
      return stringifyFunction(
        type,
        [radius, 'at', stringifyPosition(position)],
        ' '
      )
    }
    case 'ellipse': {
      const { rx, ry, position } = value
      return stringifyFunction(
        type,
        [rx, ry, 'at', stringifyPosition(position)],
        ' '
      )
    }
    case 'polygon': {
      const { fillRule, points } = value
      return stringifyFunction(type, [
        fillRule,
        points
          .map(({ x, y }) => `${stringifyUnit(x)} ${stringifyUnit(y)}`)
          .join(', '),
      ])
    }
    case 'path': {
      const { fillRule, path } = value
      return stringifyFunction(type, [fillRule, `"${path}"`])
    }
  }
}
