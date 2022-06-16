import { SHAPE_BOX_KEYWORDS } from '../../types/css'
import { basicShape } from './basic-shape'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { keyword } from './primitives'
import { url } from './url'

export const clipPath = optionsSchema({
  variants: {
    url,
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
