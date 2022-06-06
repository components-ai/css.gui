import { CheckboxInput } from '../inputs/CheckboxInput'
import { boxSideSchema } from './box-side'
import { image } from './image'
import { objectSchema } from './object'
import {
  keyword,
  length,
  lengthPercentage,
  numberPercentage,
} from './primitives'
import { tupleSchema } from './tuple'
import { DataTypeSchema } from './types'

export const maskBorderMode = keyword(['alpha', 'luminance'])
export const maskBorderOutset = boxSideSchema({
  itemSchema: length({ number: true }),
})

export const maskBorderRepeat = tupleSchema({
  itemSchema: keyword(['stretch', 'repeat', 'round', 'space']),
  labels: ['y', 'x'],
})

const fill: DataTypeSchema<boolean> = {
  defaultValue: false,
  input: CheckboxInput,
  stringify: (value) => (value ? 'fill' : ''),
}
export const maskBorderSlice = objectSchema({
  fields: {
    value: boxSideSchema({ itemSchema: numberPercentage() }),
    fill,
  },
})

// TODO "none"
export const maskBorderSource = image

export const maskBorderWidth = boxSideSchema({
  itemSchema: lengthPercentage({ number: true, keywords: ['auto'] }),
})

export const maskBorder = objectSchema({
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
