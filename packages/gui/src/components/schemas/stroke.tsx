import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import {
  keyword,
  length,
  lengthPercentage,
  number,
  numberPercentage,
} from './primitives'

// TODO url() option
export const stroke = joinSchemas([
  color(),
  keyword(['none', 'context-fill', 'context-stroke']),
])

export const strokeDasharray = listSchema({
  itemSchema: length({ number: true }),
})
export const strokeDashoffset = lengthPercentage({ number: true })
export const strokeLinejoin = keyword([
  'miter',
  'miter-clip',
  'round',
  'bevel',
  'arcs',
])
export const strokeLinecap = keyword(['butt', 'round', 'square'])
export const strokeMiterlimit = number()
export const strokeOpacity = numberPercentage({
  defaultValue: { value: 1, unit: 'number' },
})
export const strokeWidth = lengthPercentage({
  number: true,
  defaultValue: { value: 1, unit: 'px' },
})

// Experimental / non-supported properties
export const strokeAlignment = keyword(['center', 'inner', 'outer'])
export const strokeDashadjust = keyword([
  'none',
  'stretch',
  'compress',
  'dashed',
  'gaps',
])
export const strokeDashcorner = joinSchemas([keyword(['auto']), length()])
