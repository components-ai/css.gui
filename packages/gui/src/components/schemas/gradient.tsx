import { sortBy } from 'lodash-es'
import { bindProps } from '../../lib/components'
import { Theme } from '../../types/theme'
import GradientStopsField from '../inputs/Gradient/stops'
import { GradientStop } from '../inputs/Gradient/types'
import { functionSchema } from './function'
import { optionsSchema } from './options'
import { position } from './position'
import { angle, keyword } from './primitives'
import { DataTypeSchema } from './types'

export const stringifyStops = (stops: GradientStop[], theme?: Theme, unit: string = '%') => {
  return sortBy(stops, (stop) => stop.hinting)
    ?.filter(Boolean)
    ?.map(({ color, hinting }) => `${color.value} ${hinting}${unit}`)
    ?.join(', ')
}

function stops(repeating: boolean = false): DataTypeSchema<GradientStop[]> {
  return {
    input: bindProps(GradientStopsField, { repeating }),
    stringify: stringifyStops,
    defaultValue: [
      { color: { value: 'black' }, hinting: 0 },
      { color: { value: 'transparent' }, hinting: 100 },
    ],
  }
}

const directions = [
  'to left',
  'to right',
  'to top',
  'to bottom',
  'to top left',
  'to top right',
  'to bottom right',
  'to bottom left',
] as const

const linear = functionSchema('linear-gradient', {
  fields: {
    angle: angle({ keywords: directions }),
    stops: stops(),
  },
})
const repeatingLinear = functionSchema('repeating-linear-gradient', {
  fields: {
    angle: angle({ keywords: directions }),
    stops: stops(true),
  },
})

const radial = functionSchema('radial-gradient', {
  fields: {
    shape: keyword(['circle', 'ellipse']),
    // TODO length sizes
    size: keyword([
      'farthest-corner',
      'nearest-corner',
      'farthest-side',
      'nearest-side',
    ]),
    position,
    stops: stops(),
  },
  stringify: ({ shape, size, position, stops }) =>
    `${shape} ${size} at ${position}, ${stops}`,
})

const repeatingRadial = functionSchema('repeating-radial-gradient', {
  fields: {
    shape: keyword(['circle', 'ellipse']),
    size: keyword([
      'farthest-corner',
      'nearest-corner',
      'farthest-side',
      'nearest-side',
    ]),
    position,
    stops: stops(true),
  },
  stringify: ({ shape, size, position, stops }) =>
    `${shape} ${size} at ${position}, ${stops}`,
})

const conic = functionSchema('conic-gradient', {
  fields: {
    angle: angle(),
    position,
    stops: stops(),
  },
  stringify: ({ angle, position, stops }) =>
    `from ${angle} at ${position}, ${stops}`,
})
const repeatingConic = functionSchema('repeating-conic-gradient', {
  fields: {
    angle: angle(),
    position,
    stops: stops(true),
  },
  stringify: ({ angle, position, stops }) =>
    `from ${angle} at ${position}, ${stops}`,
})

export const gradient = optionsSchema({
  variants: {
    linear,
    'repeating-linear': repeatingLinear,
    radial,
    'repeating-radial': repeatingRadial,
    conic,
    'repeating-conic': repeatingConic,
  },
  // TODO keep values when switching between repeating and non-
  convert: (oldValue, newType) => {
    if (
      oldValue.type === `repeating-${newType}` ||
      newType === `repeating-${oldValue.type}`
    ) {
      return oldValue
    }
    return {
      stops: oldValue.stops,
    }
  },
})
