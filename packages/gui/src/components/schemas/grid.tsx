import { functionSchema } from './function'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { objectSchema } from './object'
import { integer, keyword, lengthPercentage } from './primitives'

const inflexibleBreadth = joinSchemas([
  lengthPercentage({ range: 'nonnegative' }),
  keyword(['min-content', 'max-content', 'auto']),
])
const trackBreadth = joinSchemas([
  lengthPercentage({
    range: 'nonnegative',
    flex: true,
    defaultValue: { value: 1, unit: 'fr' },
  }),
  keyword(['min-content', 'max-content', 'auto']),
])

const trackSize = joinSchemas([
  trackBreadth,
  functionSchema(
    'minmax',
    objectSchema({
      fields: { min: inflexibleBreadth, max: trackBreadth },
      separator: ', ',
    })
  ),
  functionSchema('fit-content', lengthPercentage()),
])

const repeatTrackCount = joinSchemas([
  integer({ defaultValue: 3 }),
  keyword(['auto-fit', 'auto-fill']),
])

const trackList = joinSchemas(
  [
    trackSize,
    functionSchema(
      'repeat',
      objectSchema({
        fields: {
          count: repeatTrackCount,
          trackList: listSchema({ itemSchema: trackSize, separator: ' ' }),
        },
        separator: ', ',
      })
    ),
  ],
  { defaultType: 'repeat' }
)

export const gridAutoRows = listSchema({
  itemSchema: trackSize,
  separator: ' ',
})
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
