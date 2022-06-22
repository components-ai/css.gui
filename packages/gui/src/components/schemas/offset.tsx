import { SHAPE_BOX_KEYWORDS } from '../../types/css'
import { angle } from './angle'
import { basicShape } from './basic-shape'
import { image } from './image'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { position } from './position'
import { keyword, lengthPercentage } from './primitives'

export const offsetAnchor = joinSchemas([keyword(['auto']), position])
export const offsetPosition = joinSchemas([keyword(['auto']), position])
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
