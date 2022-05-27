import { createObjectSchema, createUnionSchema } from './data-type'
import { angle, color, length, numberPercentage } from './primitives'

const blur = createObjectSchema({
  fields: {
    radius: { schema: length },
  },
})

const dropShadow = createObjectSchema({
  fields: {
    color: { schema: color },
    offsetX: { schema: length },
    offsetY: { schema: length },
    blurRadius: { schema: length },
  },
})

const hueRotate = createObjectSchema({
  fields: {
    angle: { schema: angle },
  },
})

const amountFilter = createObjectSchema({
  fields: {
    amount: { schema: numberPercentage },
  },
})

const singleFilter = createUnionSchema({
  variants: {
    blur: { schema: blur },
    dropShadow: { schema: dropShadow },
    hueRotate: { schema: hueRotate },
    brightness: { schema: amountFilter },
    contrast: { schema: amountFilter },
    grayscale: { schema: amountFilter },
    invert: { schema: amountFilter },
    opacity: { schema: amountFilter },
    saturate: { schema: amountFilter },
    sepia: { schema: amountFilter },
  },
})
