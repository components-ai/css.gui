import { listSchema } from './list'
import { functionSchema } from './function'
import { optionsSchema } from './options'
import { angle, color, length, numberPercentage } from './primitives'

const blur = functionSchema('blur', {
  fields: {
    radius: length(),
  },
})

const dropShadow = functionSchema('drop-shadow', {
  fields: {
    color: color(),
    offsetX: length(),
    offsetY: length(),
    blurRadius: length(),
  },
  separator: ' ',
})

const hueRotate = functionSchema('hue-rotate', {
  fields: {
    angle: angle(),
  },
})

const amountFilter = (name: string) =>
  functionSchema(name, {
    fields: {
      amount: numberPercentage(),
    },
  })

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
})

export const filter = listSchema({
  itemSchema: singleFilter,
  separator: ' ',
  keywords: ['none'],
})
