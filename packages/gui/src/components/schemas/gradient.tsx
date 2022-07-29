import { bindProps } from '../../lib/components'
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
import { listSchema } from './list'
import { stringifyStops } from '../inputs/Gradient/stringify'

const gradientStop = objectSchema({
  fields: {
    color: color({ defaultValue: '#000000' }),
    hinting: number({
      stringify: (x) => `${x}%`,
    }), // TODO should be length or percentage
  },
})

function stops(repeating: boolean = false): DataTypeSchema<GradientStop[]> {
  return listSchema({
    itemSchema: gradientStop,
    input: bindProps(GradientStopsField, { repeating }),
    stringify: stringifyStops,
  })
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

function linearArgs(repeating?: boolean) {
  return objectSchema({
    fields: {
      angle: joinSchemas([angle(), keyword(directions)]),
      stops: stops(repeating),
    },
    separator: ', ',
  })
}

const linear = functionSchema('linear-gradient', linearArgs())
const repeatingLinear = functionSchema(
  'repeating-linear-gradient',
  linearArgs(true)
)

function radialArgs(repeating?: boolean) {
  return objectSchema({
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
      stops: stops(repeating),
    },
    stringify: ({ shape, size, position, stops }) =>
      `${shape} ${size} at ${position}, ${stops}`,
  })
}

const radial = functionSchema('radial-gradient', radialArgs())
const repeatingRadial = functionSchema(
  'repeating-radial-gradient',
  radialArgs(true)
)

function conicArgs(repeating?: boolean) {
  return objectSchema({
    fields: {
      angle: angle(),
      position,
      stops: stops(repeating),
    },
    stringify: ({ angle, position, stops }) =>
      `from ${angle} at ${position}, ${stops}`,
  })
}
const conic = functionSchema('conic-gradient', conicArgs())
const repeatingConic = functionSchema(
  'repeating-conic-gradient',
  conicArgs(true)
)

export const gradient = joinSchemas(
  [linear, repeatingLinear, radial, repeatingRadial, conic, repeatingConic],
  { type: 'gradient' }
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
