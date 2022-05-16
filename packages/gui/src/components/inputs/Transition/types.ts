import { Time } from '../../../types/css'
import { keywordValues } from '../EasingFunction/keywords'
import { EasingFunction } from '../EasingFunction/types'

export interface Transition {
  property: string
  timingFunction: EasingFunction
  duration: Time
  delay: Time
}

export const DEFAULT_TRANSITION: Transition = {
  delay: { value: 0, unit: 's' },
  duration: { value: 0, unit: 's' },
  property: 'all',
  timingFunction: keywordValues.ease,
}
