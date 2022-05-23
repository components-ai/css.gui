import {
  addInternalCSSClassSyntax,
  isCSSClass,
  isInternalCSSClass,
} from '../classes'
import { hasPseudoSyntax, removePseudoSyntax } from '../pseudos'

export const stylesToEditorSchema = (styles: any) => {
  if (!styles) {
    console.error(
      'A styles object is required. For more information please read https://components.ai/open-source/css-gui/components/editor'
    )
    return {}
  }
  const stylesSchema = Object.entries(styles).reduce((acc, curr) => {
    const [rawProperty, rawValue] = curr

    let property = rawProperty
    let value = rawValue
    if (hasPseudoSyntax(rawProperty)) {
      property = removePseudoSyntax(rawProperty)
      value = stylesToEditorSchema(rawValue)
    } else if (isCSSClass(rawProperty) || isInternalCSSClass(rawProperty)) {
      property = addInternalCSSClassSyntax(rawProperty)
      value = stylesToEditorSchema(rawValue)
    }

    return {
      [property]: value,
      ...acc,
    }
  }, {})

  return stylesSchema
}
