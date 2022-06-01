import { boxSideSchema } from './boxSide'
import { objectSchema } from './object'
import { color, keyword, length } from './primitives'

const borderWidthItem = length({
  keywords: ['thin', 'medium', 'thick'],
})

export const borderTopWidth = borderWidthItem
export const borderRightWidth = borderWidthItem
export const borderBottomWidth = borderWidthItem
export const borderLeftWidth = borderWidthItem
export const borderWidth = boxSideSchema({ itemSchema: borderWidthItem })

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

const borderColorItem = color()

export const borderTopColor = borderColorItem
export const borderRightColor = borderColorItem
export const borderBottomColor = borderColorItem
export const borderLeftColor = borderColorItem
export const borderColor = boxSideSchema({ itemSchema: borderColorItem })

const borderItem = objectSchema({
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
export const border = borderItem
