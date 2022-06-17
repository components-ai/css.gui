import { listSchema } from './list'
import { functionSchema } from './function'
import { angle, color, keyword, length, numberPercentage } from './primitives'
import { objectSchema } from './object'
import { joinSchemas } from './joinSchemas'

const blur = functionSchema('blur', length())

const dropShadow = functionSchema(
  'drop-shadow',
  objectSchema({
    fields: {
      color: color(),
      offsetX: length(),
      offsetY: length(),
      blurRadius: length(),
    },
    separator: ' ',
  })
)

const hueRotate = functionSchema('hue-rotate', angle())

const amountFilter = (name: string) => functionSchema(name, numberPercentage())

const singleFilter = joinSchemas(
  [
    blur,
    dropShadow,
    hueRotate,
    amountFilter('brightness'),
    amountFilter('contrast'),
    amountFilter('grayscale'),
    amountFilter('invert'),
    amountFilter('opacity'),
    amountFilter('saturate'),
    amountFilter('sepia'),
  ],
  'filter'
)

export const filter = joinSchemas([
  listSchema({
    itemSchema: singleFilter,
    separator: ' ',
  }),
  keyword(['none']),
])
