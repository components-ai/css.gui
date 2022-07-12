import { BOX_KEYWORDS } from '../../types/css'
import { image } from './image'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { objectSchema } from './object'
import { position } from './position'
import { keyword, lengthPercentage } from './primitives'
import { shorthandSchema } from './shorthand'
import { tupleSchema } from './tuple'

const attachment = keyword(['scroll', 'fixed', 'local'])
const clip = keyword([...BOX_KEYWORDS, 'text'])
const origin = keyword(BOX_KEYWORDS)
const repeat = joinSchemas([
  tupleSchema({
    itemSchema: keyword(['repeat', 'space', 'round', 'no-repeat']),
    labels: ['x', 'y'],
  }),
  keyword(['repeat-x', 'repeat-y']),
])
const size = joinSchemas([
  keyword(['cover', 'contain']),
  tupleSchema({
    itemSchema: joinSchemas([
      keyword(['auto']),
      lengthPercentage({
        defaultValue: { value: 100, unit: '%' },
      }),
    ]),
    labels: ['x', 'y'],
  }),
])

export const backgroundAttachment = listSchema({ itemSchema: attachment })
export const backgroundClip = listSchema({ itemSchema: clip })
export const backgroundOrigin = listSchema({ itemSchema: origin })
export const backgroundRepeat = listSchema({ itemSchema: repeat })
export const backgroundSize = listSchema({ itemSchema: size })
export const backgroundImage = listSchema({ itemSchema: image })
export const backgroundPosition = listSchema({ itemSchema: position })

const singleBackground = shorthandSchema({
  type: '<background>',
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

const blendMode = keyword([
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
])
export const backgroundBlendMode = listSchema({ itemSchema: blendMode })
