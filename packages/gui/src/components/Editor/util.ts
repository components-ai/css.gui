import {
  addInternalCSSClassSyntax,
  isInternalCSSClass,
} from '../../lib/classes'
import { isElement } from '../../lib/elements'
import { addPseudoSyntax, isPseudo } from '../../lib/pseudos'

export const addFieldsetNameSyntax = (
  fieldsetName: string,
  fieldsetType: string
): string => {
  if (isPseudo(fieldsetName)) {
    return addPseudoSyntax(fieldsetName)
  } else if (fieldsetType === 'class' && !isInternalCSSClass(fieldsetName)) {
    return addInternalCSSClassSyntax(fieldsetName)
  }

  return fieldsetName
}

export const isFieldsetGroup = (str: string) => {
  return isPseudo(str) || isElement(str) || isInternalCSSClass(str)
}
