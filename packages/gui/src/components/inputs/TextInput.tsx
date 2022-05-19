import { kebabCase } from 'lodash-es'
import { useId } from 'react'
import { Label } from '../primitives'
import { DeletePropButton } from './Dimension/Input'

interface Props<T extends string> {
  label: string
  onChange: (newValue: T) => void
  onRemove?: () => void
  value: T
}
export function TextInput<T extends string>({
  label,
  value,
  onChange,
  onRemove,
}: Props<T>) {
  const id = `${useId()}-${kebabCase(label)}`

  return (
    <div>
      <Label htmlFor={id}>
        <span>{label}</span>
        <div sx={{ display: 'flex', flexDirection: 'row' }}>
          <input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value as T)}
            sx={{ width: '100%', minHeight: '1.6em', mr: 1 }}
          />
          {onRemove && <DeletePropButton onRemove={onRemove} />}
        </div>
      </Label>
    </div>
  )
}
