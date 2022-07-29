import { sortBy } from 'lodash-es'
import {
  stringifyFunction,
  stringifyPosition,
  stringifyUnit,
} from '../../../lib/stringify'
import { Theme } from '../../../types/theme'
import { color } from '../../schemas/color'
import { Gradient, GradientStop } from './types'

export function stringifyGradient(gradient: Gradient, theme?: Theme): string {
  switch (gradient.type) {
    case 'linear':
    case 'repeating-linear': {
      return stringifyFunction(gradient.type + '-gradient', [
        gradient.angle,
        stringifyStops(gradient.stops, theme),
      ])
    }
    case 'radial':
    case 'repeating-radial': {
      return stringifyFunction(gradient.type + '-gradient', [
        `${gradient.shape ?? 'circle'} at ${stringifyPosition(
          gradient.position
        )}`,
        stringifyStops(gradient.stops, theme),
      ])
    }
    case 'conic':
    case 'repeating-conic': {
      return stringifyFunction(gradient.type + '-gradient', [
        `from ${stringifyUnit(gradient.angle)} at ${stringifyPosition(
          gradient.position
        )}`,
        stringifyStops(gradient.stops, theme),
      ])
    }
  }
}

export const stringifyStops = (stops: GradientStop[], theme?: Theme) => {
  return sortBy(stops, (stop) => stop.hinting)
    ?.filter(Boolean)
    ?.map(
      ({ color: stopColor, hinting }) =>
        `${color().stringify(stopColor, theme)} ${hinting}%`
    )
    ?.join(', ')
}
