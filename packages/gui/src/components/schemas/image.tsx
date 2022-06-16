import { convertGradient, gradientVariants } from './gradient'
import { optionsSchema } from './options'
import { url } from './url'

const gradientTypes = Object.keys(gradientVariants)

export const image = optionsSchema({
  variants: {
    url,
    ...gradientVariants,
  },
  getType: (value) => value.name as any,
  convert(value, newType) {
    if (gradientTypes.includes(value.name) && gradientTypes.includes(newType)) {
      return convertGradient(value, newType as any) as any
    }
  },
})
