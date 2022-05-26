import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { Label } from '../primitives'
import { DeletePropButton } from './Dimension/Input'

interface Props<T extends string> {
  label: string
  onChange: (newValue: T) => void
  onRemove?: () => void
  value: T
  options: readonly T[]
}
// A select input with a label
export function SelectInput<T extends string>({
  label,
  value,
  onChange,
  onRemove,
  options,
}: Props<T>) {
  const id = `${useId()}-${kebabCase(label)}`

  return (
    <div>
      <Label htmlFor={id}>
        <span>{label}</span>
        <div sx={{ display: 'flex', flexDirection: 'row', mt: '2px' }}>
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            sx={{ width: '100%', minHeight: '1.6em', mr: 1 }}
          >
            {options.map((v) => {
              return (
                <option key={v} value={v}>
                  {v}
                </option>
              )
            })}
          </select>
          {onRemove && <DeletePropButton onRemove={onRemove} />}
        </div>
      </Label>
    </div>
  )
}
