import { functionSchema } from './function'
import { gradient } from './gradient'
import { objectSchema } from './object'
import { optionsSchema } from './options'
import { string } from './primitives'

export const image = optionsSchema({
  variants: {
    url: functionSchema('url', {
      fields: {
        value: string({ defaultValue: 'https://source.unsplash.com/random' }),
      },
    }),
    gradient: objectSchema({
      fields: { value: gradient },
    }),
  },
})
