import { color } from './color'
import { keyword } from './primitives'
import { shorthandSchema } from './shorthand'

export const textEmphasisColor = color()
// TODO separate [open/filled] properties
export const textEmphasisStyle = keyword([
  'filled',
  'open',
  'dot',
  'circle',
  'double-circle',
  'triangle',
  'filled sesame',
  'open sesame',
])

export const textEmphasis = shorthandSchema({
  fields: {
    color: textEmphasisColor,
    style: textEmphasisStyle,
  },
})

// TODO separate keywords
export const textEmphasisPosition = keyword([
  'over right',
  'over left',
  'under right',
  'under left',
  'left over',
  'right under',
  'left under',
])
