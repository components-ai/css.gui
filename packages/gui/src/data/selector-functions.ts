import { selectorFunctionPseudoClasses } from './pseudo-classes'
import { selectorFunctionPseudoElements } from './pseudo-elements'

export const selectorFunctions = [
  ...selectorFunctionPseudoClasses,
  ...selectorFunctionPseudoElements,
] as const
