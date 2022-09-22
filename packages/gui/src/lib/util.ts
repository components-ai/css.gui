import { isPseudoClass, isPseudoElement, isSelectorFunction } from './pseudos'
import { isElement } from './elements'
import { lowerCase, startCase, upperFirst } from 'lodash-es'
import { EditorProps, EditorPropsWithLabel } from '../types/editor'
import { MultidimensionalLength } from '../types/css'
import { isInternalCSSClass } from './classes'

/**
 * Populate props to be used for an input control for a subproperty of a value.
 *
 * Usage:
 *
 * ```
 * // creates a select input with the label "Type" and passes changes to the parent
 * <SelectInput {...getInputProps({ value, onChange }, 'type')} />
 * ```
 */
export function getInputProps<T extends object, K extends keyof T>(
  props: EditorProps<T>,
  key: K
): EditorPropsWithLabel<T[typeof key]> {
  return {
    value: props.value && props.value[key],
    label: sentenceCase('' + key.toString()),
    onChange: (newValue) => props.onChange({ ...props.value, [key]: newValue }),
  }
}

export function isNestedSelector(selector: string): boolean {
  return (
    isElement(selector) ||
    isPseudoClass(selector) ||
    isPseudoElement(selector) ||
    isSelectorFunction(selector) ||
    isInternalCSSClass(selector) ||
    false
  )
}

export function isNestedSelectorWithSyntax(selector: string): boolean {
  const rawSelector = selector.replace(/^:+/, '')
  return isNestedSelector(rawSelector)
}

/**
 * Convert a string to words such that only the first word is capitalized.
 */
export const sentenceCase = (property: string) => {
  return upperFirst(lowerCase(property))
}

/**
 * Converts a string to be plus spaced. Abhaya Libre -> Abhaya+Libre
 */
export const plusify = (name: string) => name.replace(/\s/g, '+')

export function squeeze(s: string) {
  return s.replace(/\s+/g, ' ').trim()
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Create a google font style sheet from an array of font data.
 */
export type FontFamilyData = {
  name: string
  weights: (string | number)[]
  styles: string[]
}
export const toGoogleFontUrl = (families: FontFamilyData[]) => {
  if (!families?.length) return null

  let familiesFmt: any[] = []

  families.forEach((family) => {
    let name = plusify(family.name)
    family.weights.forEach((weight) => {
      family.styles.forEach((style) => {
        let query = `family=${name}:`
        let italics = ''

        if (style === 'italic') italics = 'ital,'
        familiesFmt.push(
          `${query}${italics}wght@${italics ? '1,' : ''}${weight}`
        )
      })
    })
  })

  return `https://fonts.googleapis.com/css2?${familiesFmt.join('&')}`
}

/**
 * Create a variable font style sheet from an array of variable
 * font data.
 */
export const toGoogleVariableFontUrl = (variableFonts: any[]) => {
  if (!variableFonts?.length) return null

  let familyQueries: any[] = []

  variableFonts.forEach((vFont) => {
    let prependQuery = `family=${plusify(vFont.name)}:`
    delete vFont['name']

    let orderedKeys = [
      ...Object.keys(vFont)
        .filter((k) => k === k.toLowerCase())
        .sort(),
      ...Object.keys(vFont)
        .filter((k) => k === k.toUpperCase())
        .sort(),
    ]

    const queryParams = orderedKeys.join(',')

    const queryRange = orderedKeys
      .map((key) => {
        if (key === 'ital') return null
        return `${vFont[key].min}..${vFont[key].max}`
      })
      .filter(Boolean)
      .join(',')

    const usesItal = orderedKeys.includes('ital')

    familyQueries.push(
      `${prependQuery}${queryParams}@${usesItal ? '0,' : ''}${queryRange}`
    )
    if (usesItal) {
      familyQueries.push(`${prependQuery}${queryParams}@${'1,'}${queryRange}`)
    }
  })

  const cssQueries = familyQueries.join('&')
  return `https://fonts.googleapis.com/css2?${cssQueries}`
}

export function pascalCase(str: string) {
  return startCase(str).replace(/\s/g, '')
}

export function isMultidimensionalLength(
  value: unknown
): value is MultidimensionalLength {
  if (typeof value !== 'object') {
    return false
  }

  return (value as MultidimensionalLength).type === 'multidimensionalLength'
}
