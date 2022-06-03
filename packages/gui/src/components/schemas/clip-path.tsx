import { SHAPE_BOX_KEYWORDS } from '../../types/css'
import { basicShape } from './basic-shape'
import { image } from './image'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { keyword } from './primitives'

export const clipPath = optionsSchema({
  variants: {
    image: objectSchema({
      fields: { value: image },
    }),
    shape: objectSchema({
      fields: {
        shape: basicShape,
        box: keyword(SHAPE_BOX_KEYWORDS),
      },
    }),
  },
})
