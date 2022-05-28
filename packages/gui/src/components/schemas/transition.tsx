import { ANIMATABLE_PROPERTIES } from '../../data/animatable'
import { EasingFunctionEditor } from '../inputs/EasingFunction'
import { keywordValues } from '../inputs/EasingFunction/keywords'
import { stringifyEasingFunction } from '../inputs/EasingFunction/stringify'
import { EasingFunction } from '../inputs/EasingFunction/types'
import { list } from './list'
import { object } from './object'
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

export const transitionProperty = list({
  itemSchema: singleProperty,
  variant: 'list',
})

export const transitionDuration = list({
  itemSchema: singleDuration,
  variant: 'list',
})

export const transitionDelay = list({
  itemSchema: singleDelay,
  variant: 'list',
})

export const transitionTimingFunction = list({
  itemSchema: singleTimingFunction,
  variant: 'list',
})

const singleTransition = object({
  fields: {
    property: singleProperty,
    duration: singleDuration,
    delay: singleDelay,
    timingFunction: singleTimingFunction,
  },
  keyOrder: ['property', 'duration', 'delay', 'timingFunction'],
})

export const transition = list({
  itemSchema: singleTransition,
})
