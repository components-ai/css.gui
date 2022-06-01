import { keyword } from './primitives'
import { tupleSchema } from './tuple'

const overscrollKeywords = ['auto', 'contain', 'none'] as const
const overscrollAxis = keyword(overscrollKeywords)

export const overscrollBehaviorInline = overscrollAxis
export const overscrollBehaviorBlock = overscrollAxis
export const overscrollBehaviorX = overscrollAxis
export const overscrollBehaviorY = overscrollAxis

export const overscrollBehavior = tupleSchema({
  itemSchema: overscrollAxis,
  labels: ['x', 'y'],
})
