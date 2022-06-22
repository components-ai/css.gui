import { CheckboxInput } from '../inputs/CheckboxInput'
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
  type: 'fill',
  defaultValue: false,
  input: CheckboxInput,
  stringify: (value) => (value ? 'fill' : ''),
  validate: ((value: any) => typeof value === 'boolean') as any,
}
export const borderImageSlice = objectSchema({
  fields: {
    value: boxSideSchema({ itemSchema: numberPercentage() }),
    fill,
  },
})

export const borderImageSource = joinSchemas([keyword(['none']), image])

export const borderImageWidth = boxSideSchema({
  itemSchema: joinSchemas([
    keyword(['auto']),
    lengthPercentage({
      number: true,
      range: 'nonnegative',
    }),
  ]),
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
