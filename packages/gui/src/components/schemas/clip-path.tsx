import { SHAPE_BOX_KEYWORDS } from '../../types/css'
import { basicShape } from './basic-shape'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword } from './primitives'
import { url } from './url'

export const clipPath = joinSchemas([
  url,
  objectSchema({
    type: '<shape>',
    fields: {
      shape: basicShape,
      box: keyword(SHAPE_BOX_KEYWORDS),
    },
  }),
])
