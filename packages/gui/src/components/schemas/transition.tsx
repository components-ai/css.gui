import { ANIMATABLE_PROPERTIES } from '../../data/animatable'
import { EasingFunctionEditor } from '../inputs/EasingFunction'
import { keywordValues } from '../inputs/EasingFunction/keywords'
import { stringifyEasingFunction } from '../inputs/EasingFunction/stringify'
import { EasingFunction } from '../inputs/EasingFunction/types'
import { listSchema } from './list'
import { objectSchema } from './object'
import { keyword, time } from './primitives'
import { DataTypeSchema } from './types'

const singleProperty = keyword(ANIMATABLE_PROPERTIES, { defaultValue: 'all' })

const singleDuration = time({
  defaultValue: { value: 350, unit: 'ms' },
})

const singleDelay = time()

// TODO move elsewhere so we can share with animation
const singleTimingFunction: DataTypeSchema<EasingFunction> = {
  input: EasingFunctionEditor,
  stringify: stringifyEasingFunction,
  defaultValue: keywordValues.ease,
}

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
