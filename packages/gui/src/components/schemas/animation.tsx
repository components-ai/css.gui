import { easingFunction } from './easing-function'
import { joinSchemas } from './joinSchemas'
import { listSchema } from './list'
import { objectSchema } from './object'
import { ident, integer, keyword } from './primitives'
import { shorthandSchema } from './shorthand'
import { time } from './time'

const delay = time()
const direction = keyword([
  'normal',
  'reverse',
  'alternate',
  'alternate-reverse',
])
const duration = time({
  defaultValue: { value: 350, unit: 'ms' },
})
const fillMode = keyword(['none', 'forwards', 'backwards', 'both'])
const iterationCount = joinSchemas([integer(), keyword(['infinite'])])
const name = ident({ defaultValue: 'none' })
const playState = keyword(['running', 'paused'])
const timingFunction = easingFunction

export const animationDelay = listSchema({ itemSchema: delay })
export const animationDirection = listSchema({ itemSchema: direction })
export const animationDuration = listSchema({ itemSchema: duration })
export const animationFillMode = listSchema({ itemSchema: fillMode })
export const animationIterationCount = listSchema({
  itemSchema: iterationCount,
})
export const animationName = listSchema({ itemSchema: name })
export const animationPlayState = listSchema({ itemSchema: playState })
export const animationTimingFunction = listSchema({
  itemSchema: timingFunction,
})

const singleAnimation = shorthandSchema({
  type: '<animation>',
  fields: {
    name,
    duration,
    timingFunction,
    delay,
    iterationCount,
    direction,
    fillMode,
    playState,
  },
})
export const animation = listSchema({ itemSchema: singleAnimation })
