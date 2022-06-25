import { SHAPE_BOX_KEYWORDS } from '../../types/css'
import { angle } from './angle'
import { basicShape } from './basic-shape'
import { image } from './image'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { position } from './position'
import { keyword, lengthPercentage } from './primitives'
import { shorthandSchema } from './shorthand'

export const offsetAnchor = joinSchemas([position, keyword(['auto'])])
export const offsetPosition = joinSchemas([position, keyword(['auto'])])
export const offsetDistance = lengthPercentage()
export const offsetPath = joinSchemas([
  image,
  objectSchema({
    type: '<shape>',
    fields: {
      shape: basicShape,
      box: keyword(SHAPE_BOX_KEYWORDS),
    },
  }),
])

// TODO 'auto <angle>'
export const offsetRotate = angle()

export const offset = shorthandSchema({
  fields: {
    position: offsetPosition,
    path: offsetPath,
    distance: offsetDistance,
    rotate: offsetRotate,
    anchor: offsetAnchor,
  },
  slash: ['anchor'],
})
