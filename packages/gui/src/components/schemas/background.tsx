import { BOX_KEYWORDS } from '../../types/css'
import { image } from './image'
import { listSchema } from './list'
import { objectSchema } from './object'
import { position } from './position'
import { keyword, lengthPercentage } from './primitives'
import { tupleSchema } from './tuple'

const attachment = keyword(['scroll', 'fixed', 'local'])
const clip = keyword([...BOX_KEYWORDS, 'text'])
const origin = keyword(BOX_KEYWORDS)
const repeat = tupleSchema({
  itemSchema: keyword(['repeat', 'space', 'round', 'no-repeat']),
  labels: ['x', 'y'],
  keywords: ['repeat-x', 'repeat-y'],
})
const size = tupleSchema({
  itemSchema: lengthPercentage({
    keywords: ['auto'],
    defaultValue: { value: 100, unit: '%' },
  }),
  labels: ['x', 'y'],
  keywords: ['cover', 'contain'],
})

export const backgroundAttachment = listSchema({ itemSchema: attachment })
export const backgroundClip = listSchema({ itemSchema: clip })
export const backgroundOrigin = listSchema({ itemSchema: origin })
export const backgroundRepeat = listSchema({ itemSchema: repeat })
export const backgroundSize = listSchema({ itemSchema: size })
export const backgroundImage = listSchema({ itemSchema: image })
export const backgroundPosition = listSchema({ itemSchema: position })

const singleBackground = objectSchema({
  fields: {
    image,
    position,
    size,
    repeat,
    attachment,
    origin,
    clip,
  },
  slash: ['size'],
})
export const background = listSchema({ itemSchema: singleBackground })
