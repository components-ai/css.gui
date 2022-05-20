// Since CSS classes are denoted with "." this
// breaks our lodash toPath-based getters/setters.
// So, in our internal data structure we swap out
// the "." with a "&" and then swap it back when
// generating the code.
const SPECIAL_INTERNAL_CSS_CLASS_SYNTAX = '&'

export const isInternalCSSClass = (str: string): boolean => {
  return str.startsWith(SPECIAL_INTERNAL_CSS_CLASS_SYNTAX)
}

export const addInternalCSSClassSyntax = (str: string): string => {
  if (!isInternalCSSClass(str)) {
    return SPECIAL_INTERNAL_CSS_CLASS_SYNTAX + str.replace(/^./, '')
  }

  return str
}

export const removeInternalCSSClassSyntax = (str: string): string => {
  return str.replace(/^&/, '')
}

export const isCSSClass = (str: string): boolean => {
  return str.startsWith('.')
}

export const addCSSClassSyntax = (str: string): string => {
  if (!isInternalCSSClass(str)) {
    return '.' + str
  }

  return str
}
