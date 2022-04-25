import { EditorProps } from '../components/editors/types'
import { getPropertyLabel } from '../data/properties'

type EditorPropsWithLabel<T> = EditorProps<T> & { label: string }
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
    label: getPropertyLabel('' + key),
    onChange: (newValue) => props.onChange({ ...props.value, [key]: newValue }),
  }
}
