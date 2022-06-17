import { joinSchemas } from './joinSchemas'
import { objectSchema } from './object'
import { keyword, lengthPercentage } from './primitives'

// TODO function so we can set default values
// TODO offset values
export const position = objectSchema({
  fields: {
    x: joinSchemas([
      keyword(['left', 'center', 'right']),
      lengthPercentage({
        defaultValue: { value: 50, unit: '%' },
      }),
    ]),
    y: joinSchemas([
      keyword(['top', 'center', 'bottom']),
      lengthPercentage({
        defaultValue: { value: 50, unit: '%' },
      }),
    ]),
  },
})
