import { image } from './image'
import { objectSchema } from './object'
import { keyword } from './primitives'

export const listStyleImage = image
export const listStylePosition = keyword(['inside', 'outside'])
// TODO there are a *lot* more values for this
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

export const listStyle = objectSchema({
  fields: {
    type: listStyleType,
    position: listStylePosition,
    image: listStyleImage,
  },
})
