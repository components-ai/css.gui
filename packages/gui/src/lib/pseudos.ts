import { pseudoClasses } from '../data/pseudo-classes'
import { pseudoElements } from '../data/pseudo-elements'
import { selectorFunctions } from '../data/selector-functions'

export const isPseudoClass = (str: string): boolean => {
  return !!pseudoClasses.filter((value) => value === str).length
}

export const isPseudoElement = (str: string): boolean => {
  return !!pseudoElements.filter((value) => value === str).length
}

export const isSelectorFunction = (str: string): boolean => {
  return !!selectorFunctions.filter((value) => str.startsWith(value)).length
}

export const isPseudo = (str: string): boolean => {
  return isPseudoClass(str) || isPseudoElement(str) || isSelectorFunction(str)
}

export const hasPseudoSyntax = (str: string): boolean => {
  return /^:/.test(str)
}

export const removePseudoSyntax = (str: string): string => {
  return str.replace(/^:+/, '')
}

export const getSelectorFunctionArgument = (str: string): string => {
  return str.match(/\(([^)]+)\)/)?.[1] ?? ''
}

export const getSelectorFunctionName = (str: string): string => {
  return str.split('(')[0]
}

export const stringifySelectorFunction = (
  functionName: string,
  argument: string
): string => {
  return `${addPseudoSyntax(functionName)}(${argument})`
}

export const addPseudoSyntax = (str: string): string => {
  if (hasPseudoSyntax(str)) {
    return str
  }

  if (isPseudoClass(str) || isSelectorFunction(str)) {
    return ':' + str
  } else if (isPseudoElement(str)) {
    return '::' + str
  }

  return str
}
