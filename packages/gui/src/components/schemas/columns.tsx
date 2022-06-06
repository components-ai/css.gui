import { objectSchema } from './object'
import { integer, length } from './primitives'

const columnWidth = length({
  keywords: ['auto'],
  range: 'nonnegative',
})

const columnCount = integer({
  keywords: ['auto'],
})

export const columns = objectSchema({
  fields: {
    width: columnWidth,
    count: columnCount,
  },
})
