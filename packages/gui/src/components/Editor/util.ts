import { partition, sortBy } from 'lodash-es'
import { properties } from '../../data/properties'
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

export const getFieldsetPropsFromName = (str: string): FieldsetContextProps => {
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

export const partitionProperties = (properties: string[]) => {
  return partition(properties, isFieldsetGroup)
}

export const sortProperties = (properties: string[]) => {
  const [fieldsets, props] = partitionProperties(properties)
  return [...sortBy(props), ...sortBy(fieldsets).reverse()]
}

export function getDefaultValue(property: string) {
  const propertyDefinition = properties[property] ?? {}
  // If a default value is defined, return it
  // @ts-ignore
  return propertyDefinition.defaultValue
}
