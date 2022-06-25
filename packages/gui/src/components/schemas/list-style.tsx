import { image } from './image'
import { keyword } from './primitives'
import { shorthandSchema } from './shorthand'

export const listStyleImage = image
export const listStylePosition = keyword(['inside', 'outside'])
// TODO there are a *lot* more values for this, as well as `symbol` values
export const listStyleType = keyword([
  'none',
  'disc',
  'circle',
  'square',
  'decimal',
  'georgian',
  'trad-chinese-informal',
  'kannada',
  'custom-counter-style',
])

export const listStyle = shorthandSchema({
  fields: {
    type: listStyleType,
    position: listStylePosition,
    image: listStyleImage,
  },
})
