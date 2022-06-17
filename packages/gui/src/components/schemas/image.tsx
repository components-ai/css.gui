import { convertGradient, gradient } from './gradient'
import { joinSchemas } from './joinSchemas'
import { optionsSchema } from './options'
import { url } from './url'

// const gradientTypes = Object.keys(gradientVariants)

// TODO conversion logic
export const image = joinSchemas([url, gradient])
// export const image = optionsSchema({
//   variants: {
//     url,
//     ...gradientVariants,
//   },
//   getType: (value) => value.name as any,
//   convert(value, newType) {
//     if (gradientTypes.includes(value.name) && gradientTypes.includes(newType)) {
//       return convertGradient(value, newType as any) as any
//     }
//   },
// })
