import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, lengthPercentage } from './primitives'

const positionX = joinSchemas([
  lengthPercentage({
    defaultValue: { value: 50, unit: '%' },
  }),
  objectSchema({
    type: 'offset',
    fields: {
      direction: keyword(['left', 'right']),
      offset: lengthPercentage(),
    },
  }),
  keyword(['left', 'center', 'right']),
])

const positionY = joinSchemas([
  lengthPercentage({
    defaultValue: { value: 50, unit: '%' },
  }),
  objectSchema({
    type: 'offset',
    fields: {
      direction: keyword(['top', 'bottom']),
      offset: lengthPercentage(),
    },
  }),
  keyword(['top', 'center', 'bottom']),
])

// TODO function so we can set default values
export const position = objectSchema({
  fields: { x: positionX, y: positionY },
})
