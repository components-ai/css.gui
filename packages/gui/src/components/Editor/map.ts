import { ComponentType } from 'react'
import { lengthInputs } from '../editors'
import { colorInputs } from '../editors/ColorInputs'
import { keywordInputs } from '../editors/KeywordInputs'

export const controlMap: Record<string, ComponentType<any>> = {
  ...keywordInputs,
  ...colorInputs,
  ...lengthInputs,
}
