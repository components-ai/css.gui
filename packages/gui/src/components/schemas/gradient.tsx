import { sortBy } from 'lodash-es'
import { bindProps } from '../../lib/components'
import { Theme } from '../../types/theme'
import { randomInt } from '../../lib/util'
import GradientStopsField from '../inputs/Gradient/stops'
import { GradientStop } from '../inputs/Gradient/types'
import { functionSchema } from './function'
import { position } from './position'
import { keyword, number } from './primitives'
import { angle } from './angle'
import { DataTypeSchema } from './types'
import { objectSchema } from './object'
import { joinSchemas } from './joinSchemas'
import { color } from './color'

export const stringifyStops = (
  stops: GradientStop[],
  unit: string = '%',
  theme?: Theme
) => {
  return sortBy(stops, (stop) => stop.hinting)
    ?.filter(Boolean)
    ?.map(({ color: hintColor, hinting }) => {
      const resolved = color().stringify(hintColor)
      return `${resolved} ${hinting}${unit}`
    })
    ?.join(', ')
}

function stops(repeating: boolean = false): DataTypeSchema<GradientStop[]> {
  return {
    type: 'gradient stops',
    input: bindProps(GradientStopsField, { repeating }),
    stringify: (value, theme) => stringifyStops(value, '%', theme),
    defaultValue: [
      { color: 'black', hinting: 0 },
      { color: 'transparent', hinting: 100 },
    ],
    regenerate({ previousValue }) {
      const newStops = previousValue.map(() => randomInt(0, 101))
      newStops.sort()
      return newStops.map((hinting) => {
        return {
          hinting,
          color: color().regenerate!({ previousValue: 'black' }),
        }
      })
    },
    validate: ((value: any) => {
      if (!(value instanceof Array)) return false
      return value.every((item) => {
        return color().validate(item.color) && number().validate(item.hinting)
      })
    }) as any,
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

const linear = functionSchema(
  'linear-gradient',
  objectSchema({
    fields: {
      angle: joinSchemas([keyword(directions), angle()]),
      stops: stops(),
    },
  })
)
const repeatingLinear = functionSchema(
  'repeating-linear-gradient',
  objectSchema({
    fields: {
      angle: joinSchemas([keyword(directions), angle()]),
      stops: stops(true),
    },
  })
)

const radial = functionSchema(
  'radial-gradient',
  objectSchema({
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
)

const repeatingRadial = functionSchema(
  'repeating-radial-gradient',
  objectSchema({
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
)

const conic = functionSchema(
  'conic-gradient',
  objectSchema({
    fields: {
      angle: angle(),
      position,
      stops: stops(),
    },
    stringify: ({ angle, position, stops }) =>
      `from ${angle} at ${position}, ${stops}`,
  })
)
const repeatingConic = functionSchema(
  'repeating-conic-gradient',
  objectSchema({
    fields: {
      angle: angle(),
      position,
      stops: stops(true),
    },
    stringify: ({ angle, position, stops }) =>
      `from ${angle} at ${position}, ${stops}`,
  })
)

export const gradient = joinSchemas(
  [linear, repeatingLinear, radial, repeatingRadial, conic, repeatingConic],
  'gradient'
)

type DataTypeOfSchema<S> = S extends DataTypeSchema<infer T> ? T : never
type GradientVariants = typeof gradient
type Gradient = DataTypeOfSchema<GradientVariants>

export function convertGradient(
  oldValue: Gradient,
  newType: keyof GradientVariants
) {
  if (
    oldValue.name === `repeating-${newType}` ||
    newType === `repeating-${oldValue.name}`
  ) {
    return oldValue
  }
  return {
    stops: oldValue.arguments.stops,
  }
}
