import { color } from './color'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { objectSchema } from './object'
import { keyword, length } from './primitives'
import { themeRecord } from './theme'
import { toggle } from './toggle'

const singleBoxShadow = objectSchema({
  type: '<box-shadow>',
  fields: {
    inset: toggle('inset'),
    color: color(),
    offsetX: length({ themeProperty: 'space' }),
    offsetY: length({ themeProperty: 'space' }),
    blur: length({ range: 'nonnegative', themeProperty: 'space' }),
    spread: length({ themeProperty: 'space' }),
  },
})

export const boxShadow = joinSchemas([
  listSchema({
    itemSchema: singleBoxShadow,
    addItem: (curr: any) => {
      const [last] = curr.slice(-1)
      return last
    },
  }),
  keyword(['none']),
  themeRecord('boxShadows'),
])
