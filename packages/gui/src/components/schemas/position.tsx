import { objectSchema } from './object'
import { lengthPercentage } from './primitives'

// TODO function so we can set default values
// TODO offset values
export const position = objectSchema({
  fields: {
    x: lengthPercentage({
      defaultValue: { value: 50, unit: '%' },
      keywords: ['left', 'center', 'right'],
    }),
    y: lengthPercentage({
      defaultValue: { value: 50, unit: '%' },
      keywords: ['top', 'center', 'bottom'],
    }),
  },
})
