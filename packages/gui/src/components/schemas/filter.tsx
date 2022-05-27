import {
  createArraySchema,
  createObjectSchema,
  createUnionSchema,
} from './data-type'
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

// TODO URL schema
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
