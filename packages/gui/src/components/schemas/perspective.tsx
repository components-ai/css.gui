import { joinSchemas } from './joinSchemas'
import { position } from './position'
import { keyword, length } from './primitives'

export const perspective = joinSchemas([length(), keyword(['none'])])
export const perspectiveOrigin = position
