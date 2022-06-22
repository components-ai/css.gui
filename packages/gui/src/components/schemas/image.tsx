import { gradient } from './gradient'
import { joinSchemas } from './joinSchemas'
import { url } from './url'

// TODO conversion logic
export const image = joinSchemas([url, gradient])
