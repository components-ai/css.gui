import { listSchema } from './list'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { integer, keyword, lengthPercentage } from './primitives'

const inflexibleBreadth = lengthPercentage({
  keywords: ['min-content', 'max-content', 'auto'],
})
const trackBreadth = lengthPercentage({
  flex: true,
  keywords: ['min-content', 'max-content', 'auto'],
})

const trackSizeVariants = {
  breadth: objectSchema({
    fields: { value: trackBreadth },
  }),
  minmax: objectSchema({
    fields: {
      min: inflexibleBreadth,
      max: trackBreadth,
    },
    separator: ', ',
  }),
  'fit-content': objectSchema({
    fields: { value: lengthPercentage() },
  }),
}

const trackSize = optionsSchema({
  variants: trackSizeVariants,
  stringify(variant, value) {
    if (variant === 'breadth') {
      return value
    }
    return `${variant}(${value})`
  },
})

const trackList = optionsSchema({
  variants: {
    ...trackSizeVariants,
    repeat: objectSchema({
      fields: {
        count: integer({ defaultValue: { value: 1, unit: 'number' } }),
        trackList: trackSize,
      },
      separator: ', ',
    }),
  },
  stringify(variant, value) {
    if (variant === 'breadth') {
      return value
    }
    return `${variant}(${value})`
  },
})

export const gridAutoRow = listSchema({ itemSchema: trackSize })
export const gridAutoColumns = listSchema({ itemSchema: trackSize })
export const gridAutoFlow = keyword([
  'row',
  'column',
  'dense',
  'row dense',
  'column dense',
])

export const gridTemplateRows = listSchema({ itemSchema: trackList })
export const gridTemplateColumns = listSchema({ itemSchema: trackList })
