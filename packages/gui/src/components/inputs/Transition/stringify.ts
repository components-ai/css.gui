import { stringifyValues } from '../../../lib/stringify'
import { stringifyEasingFunction } from '../EasingFunction/stringify'
import { Transition } from './types'

export function stringifyTransitionList(transitionList: Transition[]) {
  return transitionList.map(stringifyTransition).join(', ')
}

function stringifyTransition(transition: Transition) {
  const { timingFunction, duration, property, delay } = transition
  return stringifyValues([
    property,
    duration,
    stringifyEasingFunction(timingFunction),
    delay,
  ])
}
