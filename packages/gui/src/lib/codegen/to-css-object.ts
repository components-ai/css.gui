import { Styles, Length } from '../../types/css'
import { stringifySelector } from '../stringify'
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
    // todo recurse instead
    return (value as any).values.map((v: any) => stringify(v, theme))
  }
  if (stringify) {
    return stringify(value, theme)
  }

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
