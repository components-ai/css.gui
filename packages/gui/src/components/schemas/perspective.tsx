import { joinSchemas } from './joinSchemas'
import { position } from './position'
import { keyword, length } from './primitives'

export const perspective = joinSchemas([keyword(['none']), length()])
export const perspectiveOrigin = position
