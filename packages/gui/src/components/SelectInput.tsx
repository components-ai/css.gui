import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { Label } from 'theme-ui'

interface Props {
  label: string
  onChange: (newValue: string) => void
  value: string
  options: string[]
}
// A select input with a label
export const SelectInput = ({
  label,
  value,
  onChange,
  options,
}: Props): any => {
  const id = `${useId()}-${kebabCase(label)}`

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
