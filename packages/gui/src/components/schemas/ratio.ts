import { objectSchema } from './object'
import { number } from './primitives'

export function ratio() {
  return objectSchema({
    type: '<ratio>',
    fields: {
      width: number({ defaultValue: 1 }),
      height: number({ defaultValue: 1 }),
    },
    stringify: ({ width, height }) => `${width} / ${height}`,
  })
}
