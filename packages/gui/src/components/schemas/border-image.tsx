import { CheckboxInput } from '../inputs/CheckboxInput'
import { boxSideSchema } from './boxSide'
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

export const borderImageOutset = boxSideSchema({
  itemSchema: length({ number: true }),
})

export const borderImageRepeat = tupleSchema({
  itemSchema: keyword(['stretch', 'repeat', 'round', 'space']),
  labels: ['y', 'x'],
})

const fill: DataTypeSchema<boolean> = {
  defaultValue: false,
  input: CheckboxInput,
  stringify: (value) => (value ? 'fill' : ''),
}
export const borderImageSlice = objectSchema({
  fields: {
    value: boxSideSchema({ itemSchema: numberPercentage() }),
    fill,
  },
})

// TODO "none"
export const borderImageSource = image

export const borderImageWidth = boxSideSchema({
  itemSchema: lengthPercentage({ number: true, keywords: ['auto'] }),
})

export const borderImage = objectSchema({
  fields: {
    source: borderImageSource,
    slice: borderImageSlice,
    width: borderImageWidth,
    outset: borderImageOutset,
    repeat: borderImageRepeat,
  },
  slash: ['width', 'outset'],
})
