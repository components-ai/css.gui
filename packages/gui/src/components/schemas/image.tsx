import { convertGradient, gradient } from './gradient'
import { joinSchemas } from './joinSchemas'
import { optionsSchema } from './options'
import { url } from './url'

// TODO conversion logic
export const image = joinSchemas([url, gradient])
