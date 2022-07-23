import { boxSideSchema } from './box-side'
import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, length } from './primitives'
import { shorthandSchema } from './shorthand'
import { themeScale } from './theme'
import { tupleSchema } from './tuple'

/* Border width */

const borderWidthItem = joinSchemas([
  length({ range: 'nonnegative' }),
  keyword(['thin', 'medium', 'thick']),
  themeScale('borderWidths'),
])

export const borderTopWidth = borderWidthItem
export const borderRightWidth = borderWidthItem
export const borderBottomWidth = borderWidthItem
export const borderLeftWidth = borderWidthItem

export const borderBlockStartWidth = borderWidthItem
export const borderBlockEndWidth = borderWidthItem
export const borderInlineStartWidth = borderWidthItem
export const borderInlineEndWidth = borderWidthItem

export const borderBlockWidth = tupleSchema({
  itemSchema: borderWidthItem,
  labels: ['Start', 'End'],
})
export const borderInlineWidth = tupleSchema({
  itemSchema: borderWidthItem,
  labels: ['Start', 'End'],
})

export const borderWidth = boxSideSchema({ itemSchema: borderWidthItem })

/* Border style */

const borderStyleItem = keyword([
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
])
export const borderTopStyle = borderStyleItem
export const borderRightStyle = borderStyleItem
export const borderBottomStyle = borderStyleItem
export const borderLeftStyle = borderStyleItem
export const borderStyle = boxSideSchema({ itemSchema: borderStyleItem })

export const borderBlockStartStyle = borderStyleItem
export const borderBlockEndStyle = borderStyleItem
export const borderInlineStartStyle = borderStyleItem
export const borderInlineEndStyle = borderStyleItem

export const borderBlockStyle = tupleSchema({
  itemSchema: borderStyleItem,
  labels: ['Start', 'End'],
})
export const borderInlineStyle = tupleSchema({
  itemSchema: borderStyleItem,
  labels: ['Start', 'End'],
})

/* Border color */

const borderColorItem = color()

export const borderTopColor = borderColorItem
export const borderRightColor = borderColorItem
export const borderBottomColor = borderColorItem
export const borderLeftColor = borderColorItem
export const borderColor = boxSideSchema({ itemSchema: borderColorItem })

export const borderBlockStartColor = borderColorItem
export const borderBlockEndColor = borderColorItem
export const borderInlineStartColor = borderColorItem
export const borderInlineEndColor = borderColorItem

export const borderBlockColor = tupleSchema({
  itemSchema: borderColorItem,
  labels: ['Start', 'End'],
})
export const borderInlineColor = tupleSchema({
  itemSchema: borderColorItem,
  labels: ['Start', 'End'],
})

const borderItem = shorthandSchema({
  fields: {
    width: borderWidthItem,
    style: borderStyleItem,
    color: borderColorItem,
  },
})

export const borderTop = borderItem
export const borderRight = borderItem
export const borderBottom = borderItem
export const borderLeft = borderItem

export const borderBlockStart = borderItem
export const borderBlockEnd = borderItem
export const borderInlineStart = borderItem
export const borderInlineEnd = borderItem

export const borderBlock = borderItem
export const borderInline = borderItem

export const border = borderItem
