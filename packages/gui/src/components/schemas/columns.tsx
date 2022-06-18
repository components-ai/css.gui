import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { integer, keyword, length } from './primitives'
import { theme } from './theme'

const columnWidth = joinSchemas([keyword(['auto']), theme('sizes'), length()])

const columnCount = joinSchemas([keyword(['inset']), integer()])

export const columns = objectSchema({
  fields: {
    width: columnWidth,
    count: columnCount,
  },
})
