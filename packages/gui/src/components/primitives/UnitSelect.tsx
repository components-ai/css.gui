import * as Select from '../ui/Select'
import { EditorProps } from '../../types/editor'

interface Props extends EditorProps<string> {
  units: readonly string[]
}
export const UnitSelect = ({ units, value, onChange }: Props) => {
  return (
    <Select.Root value={value ?? units[0]} onValueChange={onChange}>
      <Select.Trigger>
        <Select.Value>
          {!['number', 'keyword'].includes(value) && value}
        </Select.Value>
        {/* <Select.Icon /> */}
      </Select.Trigger>
      <Select.Content>
        {units.map((unit: string) => {
          return (
            <Select.Item key={unit} value={unit}>
              <Select.ItemIndicator />
              <Select.ItemText>{unit}</Select.ItemText>
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
