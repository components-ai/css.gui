import { isObject } from 'lodash-es'
import { rawProperties } from '../../data/properties'
import {
  addInternalCSSClassSyntax,
  isCSSClass,
  isInternalCSSClass,
} from '../classes'
import { hasPseudoSyntax, removePseudoSyntax } from '../pseudos'

const isLegacyColor = (property: string, value: any) =>
  rawProperties[property]?.input === 'color' &&
  isObject(value) &&
  (value as any).value
const isLegacyUrl = (value: any) => value?.type === 'url'

const transformProperty = (property: string, value: any) => {
  if (isLegacyColor(property, value)) {
    return (value as any).value
  }

  return value
}

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

    if (Array.isArray(value)) {
      value = value.map((v) => transformComplexObject(v))
    }
    value = transformProperty(rawProperty, value)

    return {
      [property]: value,
      ...acc,
    }
  }, {})

  return stylesSchema
}

const transformComplexObject = (value: any): any => {
  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }

  if (isLegacyUrl(value)) {
    return {
      name: 'url',
      arguments: value.arguments?.[0] || value.arguments,
    }
  }

  if (Array.isArray(value)) {
    return value.map(transformComplexObject)
  }

  const transformed = Object.entries(value).reduce((acc, [k, val]) => {
    let newValue = transformProperty(k, val)
    if (Array.isArray(val)) {
      newValue = val.map(transformComplexObject)
    } else if (typeof val === 'object') {
      newValue = transformComplexObject(val)
    }

    return {
      ...acc,
      [k]: newValue,
    }
  }, {})

  return transformed
}
