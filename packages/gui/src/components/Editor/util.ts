import { partition, sortBy } from 'lodash-es'
import {
  addInternalCSSClassSyntax,
  isInternalCSSClass,
} from '../../lib/classes'
import { isElement } from '../../lib/elements'
import {
  addPseudoSyntax,
  isPseudo,
  isPseudoElement,
  removePseudoSyntax,
} from '../../lib/pseudos'
import { FieldsetContextProps } from './Fieldset'

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

export const getFieldsetPropsFromProperty = (
  str: string
): FieldsetContextProps => {
  if (isElement(str)) {
    return {
      type: 'element',
      name: str,
    }
  } else if (isPseudo(str)) {
    return {
      type: isPseudoElement(str) ? 'pseudo-element' : 'pseudo-class',
      name: str,
    }
  }

  return {
    type: 'class',
    name: str,
  }
}

export const sortProperties = (properties: string[]) => {
  const [fieldsets, props] = partition(properties, isFieldsetGroup)
  return [...sortBy(props), ...sortBy(fieldsets).reverse()]
}
