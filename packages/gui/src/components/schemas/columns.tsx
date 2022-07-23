import { joinSchemas } from './joinSchemas'
import { integer, keyword, length } from './primitives'
import { shorthandSchema } from './shorthand'
import { themeScale } from './theme'

export const columnWidth = joinSchemas([
  length(),
  themeScale('sizes'),
  keyword(['auto']),
])

export const columnCount = joinSchemas([integer(), keyword(['inset'])])

export const columns = shorthandSchema({
  fields: {
    width: columnWidth,
    count: columnCount,
  },
})
