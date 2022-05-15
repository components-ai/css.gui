import { CSSUnitValue, Time } from '../../../types/css'
import { keywordValues } from '../EasingFunction/keywords'
import { EasingFunction } from '../EasingFunction/types'

export interface Animation {
  delay: Time
  direction: AnimationDirection
  duration: Time
  fillMode: AnimationFillMode
  iterationCount: CSSUnitValue
  name: string
  playState: AnimationPlayState
  timingFunction: EasingFunction
}

export const animationDirections = [
  'normal',
  'reverse',
  'alternate',
  'alternate-reverse',
] as const
export type AnimationDirection = typeof animationDirections[number]

export const animationFillModes = [
  'none',
  'forwards',
  'backwards',
  'both',
] as const
export type AnimationFillMode = typeof animationFillModes[number]

export const animationPlayStates = ['running', 'paused'] as const
export type AnimationPlayState = typeof animationPlayStates[number]

export const DEFAULT_ANIMATION: Animation = {
  delay: { value: 0, unit: 's' },
  duration: { value: 0, unit: 's' },
  direction: 'normal',
  fillMode: 'none',
  iterationCount: { value: 1, unit: 'number' },
  name: 'none',
  playState: 'running',
  timingFunction: keywordValues.ease,
}
