import * as Select from '../ui/Select'
import { GLOBAL_KEYWORDS } from '../../data/global-keywords'
import { EditorProps } from '../../types/editor'

interface Props<T extends string> extends EditorProps<T> {
  options: T[]
  hideIcon?: boolean
}

export const KeywordSelect = <T extends string>({
  onChange,
  value,
  options,
}: Props<T>) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        {options.map((option) => {
          return (
            <Select.Item value={option}>
              <Select.ItemIndicator />
              <Select.ItemText>{option}</Select.ItemText>
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}
