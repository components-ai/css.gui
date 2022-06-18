import {
  Styles,
  Length,
  CSSUnitValue,
  CSSFunctionCalc,
  UnitlessUnits,
  ThemeValue,
} from '../../types/css'
import {
  stringifySelector,
  stringifyUnit,
  stringifyCalcFunction,
} from '../stringify'
import { has } from 'lodash-es'
import { isNestedSelector } from '../util'
import { properties } from '../../data/properties'
import { isResponsive } from '../../components/Responsive/Input'
import { Theme } from '../../types/theme'

export const stringifyProperty = (
  property: string = '', // In the future the property might determine how we stringify
  value?: unknown,
  theme?: Theme
): string | undefined => {
  const stringify = properties[property]?.stringify
  if (isResponsive(value as any)) {
    return (value as any).values.map((v: any) => stringify(v))
  }
  if (stringify) {
    return stringify(value)
  }

  // if (isCSSFunctionCalc(value)) {
  //   // @ts-ignore
  //   return stringifyCalcFunction(value)
  // }

  // // font-family?
  // if (!isCSSUnitValue(value)) {
  //   return String(value) ?? null
  // }
  // return stringifyUnit(value, theme)
}

type StyleEntry = [string, Length | string | null | undefined]
export const toCSSObject = (styles: Styles, theme?: Theme): any => {
  // @ts-ignore
  return Object.entries(styles).reduce((acc: Styles, curr: StyleEntry) => {
    const [property, value] = curr
    if (isNestedSelector(property.replace(/^:+/, ''))) {
      return {
        ...acc,
        [stringifySelector(property)]: toCSSObject(value as Styles, theme),
      }
    }
    return {
      ...acc,
      [property]: stringifyProperty(property, value, theme),
    }
  }, {})
}

// export function isCSSUnitValue(value: unknown): value is CSSUnitValue {
//   if (typeof value !== 'object') {
//     return false
//   }

//   if (!has(value, 'value') || !has(value, 'unit')) {
//     return false
//   }

//   return true
// }

// export function isCSSFunctionCalc(value: unknown): value is CSSFunctionCalc {
//   return (value as CSSFunctionCalc)?.type === UnitlessUnits.Calc
// }

// function isThemeValue(value: any): value is ThemeValue {
//   if (typeof value !== 'object') return false
//   return value.type === 'theme' && typeof value.path === 'string'
// }
