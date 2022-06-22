import { functionSchema } from './function'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { integer, keyword, lengthPercentage } from './primitives'

const inflexibleBreadth = joinSchemas([
  keyword(['min-content', 'max-content', 'auto']),
  lengthPercentage({ range: 'nonnegative' }),
])
const trackBreadth = joinSchemas([
  keyword(['min-content', 'max-content', 'auto']),
  lengthPercentage({ range: 'nonnegative', flex: true }),
])

const trackSizeVariants = {
  breadth: trackBreadth,
  minmax: functionSchema(
    'minmax',
    objectSchema({
      fields: { min: inflexibleBreadth, max: trackBreadth },
    })
  ),
  'fit-content': functionSchema('fit-content', lengthPercentage()),
}

const trackSize = optionsSchema({ variants: trackSizeVariants })

const trackList = optionsSchema({
  variants: {
    ...trackSizeVariants,
    repeat: functionSchema(
      'repeat',
      objectSchema({
        fields: {
          count: integer({ defaultValue: 1 }),
          trackList: listSchema({ itemSchema: trackSize, separator: ' ' }),
        },
        separator: ', ',
      })
    ),
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
