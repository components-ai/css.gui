import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { integer, keyword, length } from './primitives'
import { theme } from './theme'

export const columnWidth = joinSchemas([
  theme('sizes'),
  length(),
  keyword(['auto']),
])

export const columnCount = joinSchemas([integer(), keyword(['inset'])])

export const columns = objectSchema({
  fields: {
    width: columnWidth,
    count: columnCount,
  },
})
