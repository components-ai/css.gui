import { Styles, Length } from '../../types/css'
import { stringifySelector } from '../stringify'
import { isNestedSelector } from '../util'
import { properties } from '../../data/properties'
import { Theme } from '../../types/theme'
import { stylesToEditorSchema } from '../transformers/styles-to-editor-schema'

export const stringifyProperty = (
  property: string = '', // In the future the property might determine how we stringify
  value?: unknown,
  theme?: Theme
): string | undefined => {
  const stringify = properties[property]?.stringify
  if (stringify) {
    try {
      return stringify(value, theme)
    } catch (e) {
      throw new Error(`Error stringifying ${property}\n${e}`)
    }
  }
}

type StyleEntry = [string, Length | string | null | undefined]
export const toCSSObject = (providedStyles: Styles, theme?: Theme): any => {
  const styles = stylesToEditorSchema(providedStyles)
  const cssObject = Object.entries(styles).reduce(
    // @ts-ignore
    (acc: Styles, curr: StyleEntry) => {
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
    },
    {}
  )
  return cssObject
}
