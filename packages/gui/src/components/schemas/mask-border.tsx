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

export const maskBorderMode = keyword(['alpha', 'luminance'])
export const maskBorderOutset = boxSideSchema({
  itemSchema: length({ number: true }),
})

export const maskBorderRepeat = tupleSchema({
  itemSchema: keyword(['stretch', 'repeat', 'round', 'space']),
  labels: ['y', 'x'],
})

export const maskBorderSlice = objectSchema({
  fields: {
    value: boxSideSchema({ itemSchema: numberPercentage() }),
    fill: toggle('fill'),
  },
})

// TODO "none"
export const maskBorderSource = image

export const maskBorderWidth = joinSchemas([
  boxSideSchema({
    itemSchema: lengthPercentage({ number: true }),
  }),
  keyword(['auto']),
])

export const maskBorder = shorthandSchema({
  fields: {
    source: maskBorderSource,
    slice: maskBorderSlice,
    width: maskBorderWidth,
    outset: maskBorderOutset,
    repeat: maskBorderRepeat,
    mode: maskBorderMode,
  },
  slash: ['width', 'outset'],
})
