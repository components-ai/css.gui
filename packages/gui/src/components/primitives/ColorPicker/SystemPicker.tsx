import { Color } from '../../../types/css'
import ColorValueDisplay from './ValueDisplay'

interface Props {
  value: Color
  onChange(value: Color): void
}

export default function SystemPicker({ value, onChange }: Props) {
  return (
    <div>
      <ColorValueDisplay value={value} onChange={onChange} />
      {['currentColor', 'initial', 'inherit'].map((keyword) => {
        return (
          <label key={keyword} sx={{ display: 'block' }}>
            <input
              type="radio"
              name="system"
              value={value.value}
              id={keyword}
              onChange={() => onChange({ value: keyword })}
            />
            {keyword}
          </label>
        )
      })}
    </div>
  )
}
