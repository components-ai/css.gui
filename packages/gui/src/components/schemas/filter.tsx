import {
  createArraySchema,
  createObjectSchema,
  createUnionSchema,
} from './data-type'
import { angle, color, length, numberPercentage } from './primitives'

const blur = createObjectSchema({
  fields: {
    radius: length(),
  },
})

const dropShadow = createObjectSchema({
  fields: {
    color: color(),
    offsetX: length(),
    offsetY: length(),
    blurRadius: length(),
  },
})

const hueRotate = createObjectSchema({
  fields: {
    angle: angle(),
  },
})

const amountFilter = createObjectSchema({
  fields: {
    amount: numberPercentage(),
  },
})

// TODO URL schema
const singleFilter = createUnionSchema({
  variants: {
    blur: blur,
    'drop-shadow': dropShadow,
    'hue-rotate': hueRotate,
    brightness: amountFilter,
    contrast: amountFilter,
    grayscale: amountFilter,
    invert: amountFilter,
    opacity: amountFilter,
    saturate: amountFilter,
    sepia: amountFilter,
  },
  stringify(type, value) {
    return `${type}(${value})`
  },
})

export const filter = createArraySchema({
  itemSchema: singleFilter,
  separator: '',
  thumbnail: Thumbnail,
})

function Thumbnail({ value }: { value: string }) {
  return (
    <div
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        sx={{
          width: '1rem',
          height: '1rem',
          filter: value,
          borderRadius: '9999px',
          backgroundImage:
            'conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
        }}
      />
    </div>
  )
}
