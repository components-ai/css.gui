import { EasingFunctionEditor } from '../inputs/EasingFunction'
import { keywordValues } from '../inputs/EasingFunction/keywords'
import { stringifyEasingFunction } from '../inputs/EasingFunction/stringify'
import { EasingFunction } from '../inputs/EasingFunction/types'
import { DataTypeSchema } from './types'

export const easingFunction: DataTypeSchema<EasingFunction> = {
  type: '<easing function>',
  input: EasingFunctionEditor,
  stringify: stringifyEasingFunction,
  defaultValue: keywordValues.ease,
  validate: ((value: any) => {
    // I would LOVE to be able to generalize this using schemas
    if (typeof value !== 'object') return false
    switch (value.type) {
      case 'cubic-bezier': {
        const { p1, p2, p3, p4 } = value
        return [p1, p2, p3, p4].every((val) => typeof val === 'number')
      }
      case 'steps': {
        const { stops, jumpTerm } = value
        return (
          typeof stops === 'number' &&
          ['jump-start', 'jump-end', 'jump-none', 'jump-both'].includes(
            jumpTerm
          )
        )
      }
    }
  }) as any,
}
