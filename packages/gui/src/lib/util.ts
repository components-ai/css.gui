import { EditorProps } from '../types/editor'
import { isPseudoClass, isPseudoElement } from './pseudos'
import { isElement } from './elements'
import { lowerCase, upperFirst } from 'lodash-es'

export type EditorPropsWithLabel<T> = EditorProps<T> & { label: string }
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
    value: props.value[key],
    label: sentenceCase('' + key),
    onChange: (newValue) => props.onChange({ ...props.value, [key]: newValue }),
  }
}

export function isNestedSelector(selector: string): boolean {
  return (
    isElement(selector) ||
    isPseudoClass(selector) ||
    isPseudoElement(selector) ||
    false
  )
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
