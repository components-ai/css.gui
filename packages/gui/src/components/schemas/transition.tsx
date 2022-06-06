import { ANIMATABLE_PROPERTIES } from '../../data/animatable'
import { easingFunction } from './easing-function'
import { listSchema } from './list'
import { objectSchema } from './object'
import { keyword, time } from './primitives'

const singleProperty = keyword(ANIMATABLE_PROPERTIES, { defaultValue: 'all' })
const singleDuration = time({
  defaultValue: { value: 350, unit: 'ms' },
})
const singleDelay = time()
const singleTimingFunction = easingFunction

export const transitionProperty = listSchema({
  itemSchema: singleProperty,
  variant: 'list',
})
export const transitionDuration = listSchema({
  itemSchema: singleDuration,
  variant: 'list',
})
export const transitionDelay = listSchema({
  itemSchema: singleDelay,
  variant: 'list',
})
export const transitionTimingFunction = listSchema({
  itemSchema: singleTimingFunction,
  variant: 'list',
})

const singleTransition = objectSchema({
  fields: {
    property: singleProperty,
    duration: singleDuration,
    delay: singleDelay,
    timingFunction: singleTimingFunction,
  },
  keyOrder: ['property', 'duration', 'delay', 'timingFunction'],
})

export const transition = listSchema({
  itemSchema: singleTransition,
})
