import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { Label } from 'theme-ui'

interface Props<T extends string> {
  label: string
  onChange: (newValue: T) => void
  value: T
  options: readonly T[]
}
// A select input with a label
export function SelectInput<T extends string>({
  label,
  value,
  onChange,
  options,
}: Props<T>) {
  const id = `${useId()}-${kebabCase(label)}`

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        sx={{ width: '100%', minHeight: '1.6em' }}
      >
        {options.map((v) => {
          return (
            <option key={v} value={v}>
              {v}
            </option>
          )
        })}
      </select>
    </>
  )
}
