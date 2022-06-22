import { SHAPE_BOX_KEYWORDS } from '../../types/css'
import { basicShape } from './basic-shape'
import { image } from './image'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, lengthPercentage, numberPercentage } from './primitives'

export const shapeOutside = joinSchemas([
  image,
  objectSchema({
    type: '<shape>',
    fields: {
      shape: basicShape,
      box: keyword(SHAPE_BOX_KEYWORDS),
    },
  }),
])

export const shapeImageThreshold = numberPercentage()
export const shapeMargin = lengthPercentage()
