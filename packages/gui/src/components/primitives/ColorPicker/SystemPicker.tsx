import ColorValueDisplay from './ValueDisplay'

type Color = string

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
              value={value}
              id={keyword}
              onChange={() => onChange(keyword)}
            />
            {keyword}
          </label>
        )
      })}
    </div>
  )
}
