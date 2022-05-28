import { listSchema } from './list'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { angle, color, length, numberPercentage } from './primitives'

const blur = objectSchema({
  fields: {
    radius: length(),
  },
})

const dropShadow = objectSchema({
  fields: {
    color: color(),
    offsetX: length(),
    offsetY: length(),
    blurRadius: length(),
  },
})

const hueRotate = objectSchema({
  fields: {
    angle: angle(),
  },
})

const amountFilter = objectSchema({
  fields: {
    amount: numberPercentage(),
  },
})

const singleFilter = optionsSchema({
  variants: {
    blur,
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

export const filter = listSchema({
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
