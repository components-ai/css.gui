import { objectSchema } from './object'
import { lengthPercentage, number } from './primitives'

export const flexGrow = number({
  range: 'nonnegative',
})

export const flexShrink = number({
  range: 'nonnegative',
  defaultValue: 1,
})

export const flexBasis = lengthPercentage({
  range: 'nonnegative',
})

export const flex = objectSchema({
  fields: {
    grow: flexGrow,
    shrink: flexShrink,
    basis: flexBasis,
  },
})
