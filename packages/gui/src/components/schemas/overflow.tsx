import { axisSchema } from './axis'
import { keyword } from './primitives'

const overflowKeywords = [
  'visible',
  'hidden',
  'clip',
  'scroll',
  'auto',
] as const
const overflowAxis = keyword(overflowKeywords)

export const overflowX = overflowAxis
export const overflowY = overflowAxis
export const overflowInline = overflowAxis
export const overflowBlock = overflowAxis

export const overflow = axisSchema({ itemSchema: overflowAxis })
