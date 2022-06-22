import { ANIMATABLE_PROPERTIES } from '../../data/animatable'
import { easingFunction } from './easing-function'
import { listSchema } from './list'
import { objectSchema } from './object'
import { keyword } from './primitives'
import { time } from './time'

const singleProperty = keyword(ANIMATABLE_PROPERTIES, {
  defaultValue: 'all',
  themeProperty: 'transitions',
})
const singleDuration = time({
  defaultValue: { value: 350, unit: 'ms' },
})
const singleDelay = time()
const singleTimingFunction = easingFunction

export const transitionProperty = listSchema({
  itemSchema: singleProperty,
})
export const transitionDuration = listSchema({
  itemSchema: singleDuration,
})
export const transitionDelay = listSchema({
  itemSchema: singleDelay,
})
export const transitionTimingFunction = listSchema({
  itemSchema: singleTimingFunction,
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
