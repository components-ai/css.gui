import { stringifyValues } from '../../../lib/stringify'
import { stringifyEasingFunction } from '../EasingFunction/stringify'
import { Animation, animationDirections } from './types'

export function stringifyAnimationList(animationList: Animation[]) {
  return animationList.map(stringifyAnimation).join(', ')
}

export function stringifyAnimation(animation: Animation) {
  const {
    duration,
    delay,
    fillMode,
    iterationCount,
    name,
    playState,
    direction,
    timingFunction,
  } = animation

  return stringifyValues([
    name,
    duration,
    stringifyEasingFunction(timingFunction),
    delay,
    iterationCount,
    direction,
    fillMode,
    playState,
  ])
}
