import { listSchema } from './list'
import { functionSchema } from './function'
import { optionsSchema } from './options'
import { angle, color, length, numberPercentage } from './primitives'
import { objectSchema } from './object'
import { withKeywords } from './withKeywords'

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

const singleFilter = optionsSchema({
  variants: {
    blur,
    'drop-shadow': dropShadow,
    'hue-rotate': hueRotate,
    brightness: amountFilter('brightness'),
    contrast: amountFilter('contrast'),
    grayscale: amountFilter('grayscale'),
    invert: amountFilter('invert'),
    opacity: amountFilter('opacity'),
    saturate: amountFilter('saturate'),
    sepia: amountFilter('sepia'),
  },
  getType: (value) => value.name as any,
})

export const filter = withKeywords(
  ['none'],
  listSchema({
    itemSchema: singleFilter,
    separator: ' ',
  })
)
