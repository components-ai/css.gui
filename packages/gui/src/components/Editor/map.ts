import { ComponentType } from 'react'
import { lengthInputs, percentageInputs, numberInputs } from '../editors'
import { colorInputs } from '../editors/ColorInputs'
import { keywordInputs } from '../editors/KeywordInputs'

export const controlMap: Record<string, ComponentType<any>> = {
  ...keywordInputs,
  ...colorInputs,
  ...lengthInputs,
  ...percentageInputs,
  ...numberInputs,
}
