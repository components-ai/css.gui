import { color } from './color'
import { objectSchema } from './object'
import { keyword } from './primitives'

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

export const textEmphasis = objectSchema({
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
