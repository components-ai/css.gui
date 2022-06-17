import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, lengthPercentage } from './primitives'

const positionX = joinSchemas([
  keyword(['left', 'center', 'right']),
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
])

const positionY = joinSchemas([
  keyword(['top', 'center', 'bottom']),
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
])

// TODO function so we can set default values
export const position = objectSchema({
  fields: { x: positionX, y: positionY },
})
