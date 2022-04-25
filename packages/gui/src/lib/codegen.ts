import { isObject } from 'lodash-es'
import {
  Styles,
  AbsoluteLengthUnits,
  Length,
  ThemeUnits,
  ResponsiveLength,
  KeywordUnits,
} from '../types/css'

const DEFAULT_LENGTH_UNIT = AbsoluteLengthUnits.Px
export const stringifyUnit = (
  property?: string, // In the future the property might determine how we stringify
  value?: ResponsiveLength | Length | string | null
): Array<string | null> | string | number | null => {
  if (Array.isArray(value)) {
    // @ts-ignore
    return value.map((v: Length | string | null) => stringifyUnit(property, v))
  }
  if (!value || !isObject(value) || value.value === undefined) {
    return String(value) ?? null
  }

  if (value.value === undefined) {
    return null
  }

  if (
    value.unit === ThemeUnits.Theme || 
    value.unit === 'raw' ||
    value.unit === KeywordUnits.Keyword
  ) {
    return value.value
  }

  if (value.unit === 'number') {
    return String(value.value)
  }

  return `${value.value}${value.unit || DEFAULT_LENGTH_UNIT}`
}

const stringifyStyleObject = (property: string, styles: Styles) => {
  return Object.entries(styles).reduce((acc: any, [subProp, value]: any) => {
    const newPropName = `${property}${subProp}`
    return {
      ...acc,
      [newPropName]: stringifyUnit(newPropName, value)
    }
  }, {})
}

type StyleEntry = [string, Length | string | null | undefined | any]
export const toCSSObject = (styles: Styles) => {
  return Object.entries(styles).reduce((acc: Styles, curr: StyleEntry) => {
    const [property, value] = curr

    //@ts-ignore
    if (value && isObject(value) && value.value === undefined) {
      return {
        ...acc,
        ...stringifyStyleObject(property, value)
      }
    } else {
      return {
        ...acc,
        [property]: stringifyUnit(property, value),
      }
    }
    
  }, {})
}
