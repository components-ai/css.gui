import FieldArray from '../FieldArray'
import { DataTypeSchema } from './types'

export type Responsive<T> = { type: 'responsive'; values: T[] }

export function responsive<T>(
  itemSchema: DataTypeSchema<T>
): DataTypeSchema<Responsive<T>> {
  return {
    type: 'responsive',
    inlineInput({ value }) {
      return (
        <pre sx={{ fontSize: 0 }}>
          {value.values.map((item) => itemSchema.stringify(item)).join(', ')}
        </pre>
      )
    },
    input({ value, onChange }) {
      return (
        <ResponsiveInput
          value={value}
          onChange={onChange}
          itemSchema={itemSchema}
        />
      )
    },
    defaultValue: {
      type: 'responsive',
      values: [
        itemSchema.defaultValue,
        itemSchema.defaultValue,
        itemSchema.defaultValue,
      ],
    },
    validate: ((value: any) => {
      if (typeof value !== 'object') return false
      if (value.type !== 'responsive') return false
      if (!(value.values instanceof Array)) return false
      return value.values.map(itemSchema.validate)
    }) as any,
    regenerate({ theme, previousValue }) {
      return {
        ...previousValue,
        values: previousValue.values.map(
          (value) =>
            itemSchema.regenerate?.({ theme, previousValue: value }) ??
            itemSchema.defaultValue
        ),
      }
    },
    convert: itemSchema.convert,
    stringify(value, ...args) {
      return (value as any).values.map((val: T) =>
        itemSchema.stringify(val, ...args)
      )
    },
  }
}

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
