import { CheckboxInput } from '../inputs/CheckboxInput'
import { DataTypeSchema } from './types'

/**
 * Represents an input where the item is present or not
 */
export function toggle(label: string): DataTypeSchema<boolean> {
  return {
    type: label,
    defaultValue: false,
    inlineInput: CheckboxInput,
    stringify: (value) => (value ? label : ''),
    validate: ((value: any) => !value || typeof value === 'boolean') as any,
  }
}
