import { DataTypeSchema } from '../schemas/types'
import FieldArray from '../FieldArray'

export type Responsive<T> = { type: 'responsive'; values: T[] }
type ResponsiveInputProps<T> = {
  value: Responsive<T>
  onChange: (newValue: Responsive<T>) => void
  itemSchema: DataTypeSchema<T>
}
export function ResponsiveInput<T>({
  value,
  onChange,
  itemSchema,
}: ResponsiveInputProps<T>) {
  return (
    <FieldArray
      label=""
      itemSchema={itemSchema}
      value={value.values}
      onChange={(newValues) => {
        onChange({ ...value, values: newValues })
      }}
    />
  )
}
