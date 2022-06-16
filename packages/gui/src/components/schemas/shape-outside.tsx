import { SHAPE_BOX_KEYWORDS } from '../../types/css'
import { basicShape } from './basic-shape'
import { image } from './image'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { keyword, lengthPercentage, numberPercentage } from './primitives'

export const shapeOutside = optionsSchema({
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

export const shapeImageThreshold = numberPercentage()
export const shapeMargin = lengthPercentage()
