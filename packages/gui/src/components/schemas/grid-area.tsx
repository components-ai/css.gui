import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { ident, integer, keyword } from './primitives'
import { toggle } from './toggle'

const gridLine = joinSchemas([
  objectSchema({
    fields: {
      span: toggle('span'),
      position: integer(),
      ident: ident(),
    },
  }),
  keyword(['auto']),
])

export const gridColumnStart = gridLine
export const gridRowStart = gridLine
export const gridColumnEnd = gridLine
export const gridRowEnd = gridLine

// TODO gridRow, gridColumn, gridArea
