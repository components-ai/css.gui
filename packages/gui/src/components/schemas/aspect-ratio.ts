import { joinSchemas } from './joinSchemas'
import { keyword } from './primitives'
import { ratio } from './ratio'

export const aspectRatio = joinSchemas([ratio(), keyword(['auto'])])
