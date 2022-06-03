import { gradient } from './gradient'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { string } from './primitives'

export const image = optionsSchema({
  variants: {
    url: objectSchema({
      fields: {
        value: string({ defaultValue: 'https://source.unsplash.com/random' }),
      },
    }),
    gradient,
  },
  stringify(type, value) {
    if (type === 'url') {
      return `url(${value})`
    }
    return value
  },
})
