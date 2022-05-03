import { Time } from '../../../types/css'
import { EasingFunction } from '../EasingFunction/types'

export interface Transition {
  property: string
  timingFunction: EasingFunction
  duration: Time
  delay: Time
}
