import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { objectSchema } from './object'
import { keyword, length } from './primitives'

const singleTextShadow = objectSchema({
  type: '<text-shadow>',
  fields: {
    color: color(),
    offsetX: length(),
    offsetY: length(),
    blur: length({ range: 'nonnegative' }),
  },
})

export const textShadow = joinSchemas([
  listSchema({ itemSchema: singleTextShadow }),
  keyword(['none']),
])
