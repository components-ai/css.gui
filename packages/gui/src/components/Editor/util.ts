import {
  addInternalCSSClassSyntax,
  isInternalCSSClass,
} from '../../lib/classes'
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
