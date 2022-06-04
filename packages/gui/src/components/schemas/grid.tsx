import { functionSchema } from './function'
import { listSchema } from './list'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { integer, keyword, lengthPercentage } from './primitives'

const inflexibleBreadth = lengthPercentage({
  range: 'nonnegative',
  keywords: ['min-content', 'max-content', 'auto'],
})
const trackBreadth = lengthPercentage({
  flex: true,
  range: 'nonnegative',
  keywords: ['min-content', 'max-content', 'auto'],
})

const trackSizeVariants = {
  breadth: objectSchema({
    fields: { value: trackBreadth },
  }),
  minmax: functionSchema('minmax', {
    fields: { min: inflexibleBreadth, max: trackBreadth },
  }),
  'fit-content': functionSchema('fit-content', {
    fields: { value: lengthPercentage() },
  }),
}

const trackSize = optionsSchema({
  variants: trackSizeVariants,
})

const trackList = optionsSchema({
  variants: {
    ...trackSizeVariants,
    repeat: functionSchema('repeat', {
      fields: {
        count: integer({ defaultValue: { value: 1, unit: 'number' } }),
        trackList: listSchema({ itemSchema: trackSize, separator: ' ' }),
      },
      separator: ', ',
    }),
  },
})

export const gridAutoRow = listSchema({ itemSchema: trackSize, separator: ' ' })
export const gridAutoColumns = listSchema({
  itemSchema: trackSize,
  separator: ' ',
})
export const gridAutoFlow = keyword([
  'row',
  'column',
  'dense',
  'row dense',
  'column dense',
])

export const gridTemplateRows = listSchema({
  itemSchema: trackList,
  separator: ' ',
})
export const gridTemplateColumns = listSchema({
  itemSchema: trackList,
  separator: ' ',
})

// TODO grid-template, grid-template-areas, grid
