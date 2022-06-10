import { rawProperties } from '../../data/properties'
import {
  addInternalCSSClassSyntax,
  isCSSClass,
  isInternalCSSClass,
} from '../classes'
import { hasPseudoSyntax, removePseudoSyntax } from '../pseudos'
import { isNestedSelectorWithSyntax } from '../util'

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
    
    if (Array.isArray(rawValue)) {
      value = rawValue.map((v) => {
        // transform me
        v = transformNonPimitive(v)
        return v
      })
    }
    //@ts-ignore  
    if (rawProperties[property]?.input === 'color' && typeof value === 'string') {
      value = { value }
    }
    return {
      [property]: value,
      ...acc,
    }
  }, {})

  return stylesSchema
}

const transformNonPimitive = (value: any) => {
  const transformed = Object.entries(value).reduce((acc, [k, val]) => {
    let newValue = val
    if (Array.isArray(val)) {
      newValue = val.map((v) => transformNonPimitive(v))
    } else if (typeof val === 'object') {
      newValue = transformNonPimitive(val)
    }

    if (rawProperties[k]?.input === 'color' && typeof val === 'string') {
      newValue = { value: val }
    }
    
    return {
      ...acc,
      [k]: newValue
    }
  }, {})

  return transformed
}