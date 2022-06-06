import * as Select from '../ui/Select'
import { InputHeader } from '../ui/InputHeader'

interface Props<T extends string> {
  label: string
  onChange: (newValue: T) => void
  onRemove?: () => void
  value: T
  options: readonly T[]
}
// A select input with a label
export function SelectInput<T extends string>(props: Props<T>) {
  const { value, onChange, options } = props

  return (
    <InputHeader {...props}>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger
          sx={{
            border: '1px solid',
            borderColor: 'border',
            borderRadius: '0.25rem',
            height: '1.25rem',
            px: 2,
          }}
        >
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          {options.map((v) => {
            return (
              <Select.Item value={v}>
                <Select.ItemIndicator />
                <Select.ItemText>{v}</Select.ItemText>
              </Select.Item>
            )
          })}
        </Select.Content>
      </Select.Root>
    </InputHeader>
  )
}
