import { EasingFunctionEditor } from '../inputs/EasingFunction'
import { keywordValues } from '../inputs/EasingFunction/keywords'
import { stringifyEasingFunction } from '../inputs/EasingFunction/stringify'
import { EasingFunction } from '../inputs/EasingFunction/types'
import { DataTypeSchema } from './types'

export const easingFunction: DataTypeSchema<EasingFunction> = {
  input: EasingFunctionEditor,
  stringify: stringifyEasingFunction,
  defaultValue: keywordValues.ease,
}
