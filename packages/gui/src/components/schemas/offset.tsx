import { SHAPE_BOX_KEYWORDS } from '../../types/css'
import { basicShape } from './basic-shape'
import { image } from './image'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { position } from './position'
import { angle, keyword, lengthPercentage } from './primitives'

// TODO 'auto' keyword
export const offsetAnchor = position
export const offsetPosition = position
export const offsetDistance = lengthPercentage()
export const offsetPath = optionsSchema({
  variants: {
    image,
    shape: objectSchema({
      fields: {
        shape: basicShape,
        box: keyword(SHAPE_BOX_KEYWORDS),
      },
    }),
  },
  getType(value) {
    if ((value as any).shape) {
      return 'shape' as any
    }
    return 'image'
  },
})
// TODO 'auto <angle>'
export const offsetRotate = angle()

export const offset = objectSchema({
  fields: {
    position: offsetPosition,
    path: offsetPath,
    distance: offsetDistance,
    rotate: offsetRotate,
    anchor: offsetAnchor,
  },
  slash: ['anchor'],
})
