import { EasingFunction } from './types'

// Convert the transition function to a CSS Value
export function stringifyEasingFunction(value: EasingFunction) {
  switch (value.type) {
    case 'cubic-bezier':
      return `cubic-bezier(${value.p1}, ${value.p2}, ${value.p3}, ${value.p4})`
    case 'steps':
      return `steps(${value.stops}, ${value.jumpTerm})`
  }
}
