import { sortBy } from 'lodash-es'
import {
  stringifyFunction,
  stringifyPosition,
  stringifyUnit,
} from '../../../lib/stringify'
import { Gradient } from './types'

export function stringifyGradient(gradient: Gradient): string {
  switch (gradient.type) {
    case 'linear':
    case 'repeating-linear': {
      return stringifyFunction(gradient.type + '-gradient', [
        gradient.angle,
        stringifyStops(gradient, '%'),
      ])
    }
    case 'radial':
    case 'repeating-radial': {
      return stringifyFunction(gradient.type + '-gradient', [
        `${gradient.shape ?? 'circle'} at ${stringifyPosition(
          gradient.position
        )}`,
        stringifyStops(gradient, '%'),
      ])
    }
    case 'conic':
    case 'repeating-conic': {
      console.log(gradient.position, stringifyPosition(gradient.position))
      return stringifyFunction(gradient.type + '-gradient', [
        `from ${stringifyUnit(gradient.angle)} at ${stringifyPosition(
          gradient.position
        )}`,
        stringifyStops(gradient, '%'),
      ])
    }
  }
}

const stringifyStops = (gradient: Gradient, unit: string) => {
  return sortBy(gradient?.stops, (stop) => stop.hinting)
    ?.filter(Boolean)
    ?.map(({ color, hinting }) => `${color} ${hinting}${unit}`)
    ?.join(', ')
}
