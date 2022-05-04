import { CSSUnitValue, Time } from '../../../types/css'
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
