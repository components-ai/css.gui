import { boxSideSchema } from './box-side'
import { image } from './image'
import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import {
  keyword,
  length,
  lengthPercentage,
  numberPercentage,
} from './primitives'
import { shorthandSchema } from './shorthand'
import { toggle } from './toggle'
import { tupleSchema } from './tuple'

export const borderImageOutset = boxSideSchema({
  itemSchema: length({ number: true }),
})

export const borderImageRepeat = tupleSchema({
  itemSchema: keyword(['stretch', 'repeat', 'round', 'space']),
  labels: ['y', 'x'],
})

export const borderImageSlice = objectSchema({
  fields: {
    value: boxSideSchema({ itemSchema: numberPercentage() }),
    fill: toggle('fill'),
  },
})

export const borderImageSource = joinSchemas([image, keyword(['none'])])

export const borderImageWidth = boxSideSchema({
  itemSchema: joinSchemas([
    lengthPercentage({
      number: true,
      range: 'nonnegative',
    }),
    keyword(['auto']),
  ]),
})

export const borderImage = shorthandSchema({
  fields: {
    source: borderImageSource,
    slice: borderImageSlice,
    width: borderImageWidth,
    outset: borderImageOutset,
    repeat: borderImageRepeat,
  },
  slash: ['width', 'outset'],
})
