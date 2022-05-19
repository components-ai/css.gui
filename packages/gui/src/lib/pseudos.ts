import { pseudoClasses } from '../data/pseudo-classes'
import { pseudoElements } from '../data/pseudo-elements'

export const isPseudoClass = (str: string): boolean => {
  return !!pseudoClasses.filter((value) => value === str).length
}

export const isPseudoElement = (str: string): boolean => {
  return !!pseudoElements.filter((value) => value === str).length
}

export const isPseudo = (str: string): boolean => {
  return isPseudoClass(str) || isPseudoElement(str)
}

export const addPseudoSyntax = (str: string): string => {
  if (isPseudoClass(str)) {
    return ':' + str
  } else if (isPseudoElement(str)) {
    return '::' + str
  }

  return str
}
