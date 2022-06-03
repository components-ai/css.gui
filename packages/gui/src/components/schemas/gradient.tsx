import { sortBy } from 'lodash-es'
import { bindProps } from '../../lib/components'
import GradientStopsField from '../inputs/Gradient/stops'
import { GradientStop } from '../inputs/Gradient/types'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { position } from './position'
import { angle, keyword } from './primitives'
import { DataTypeSchema } from './types'

export const stringifyStops = (stops: GradientStop[], unit: string = '%') => {
  return sortBy(stops, (stop) => stop.hinting)
    ?.filter(Boolean)
    ?.map(({ color, hinting }) => `${color} ${hinting}${unit}`)
    ?.join(', ')
}

function stops(repeating: boolean = false): DataTypeSchema<GradientStop[]> {
  return {
    input: bindProps(GradientStopsField, { repeating }),
    stringify: stringifyStops,
    defaultValue: [
      { color: 'black', hinting: 0 },
      { color: 'transparent', hinting: 100 },
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

const linear = objectSchema({
  fields: {
    angle: angle({ keywords: directions }),
    stops: stops(),
  },
  separator: ', ',
})
const repeatingLinear = objectSchema({
  fields: {
    angle: angle({ keywords: directions }),
    stops: stops(true),
  },
  separator: ', ',
})

const radial = objectSchema({
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

const repeatingRadial = objectSchema({
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

const conic = objectSchema({
  fields: {
    angle: angle(),
    position,
    stops: stops(),
  },
  stringify: ({ angle, position, stops }) =>
    `from ${angle} at ${position}, ${stops}`,
})
const repeatingConic = objectSchema({
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
  stringify: (type, value) => `${type}-gradient(${value})`,
  // TODO keep values when switching between repeating and non-
  convert: (oldValue, newType) => {
    return {
      stops: oldValue.stops,
    }
  },
})
