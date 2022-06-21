import { Color } from '../../../types/css'
import { Theme } from '../../../types/theme'
import ColorValueDisplay from './ValueDisplay'

interface Props {
  value: Color
  onChange(value: Color): void
  theme: Theme
}

/**
 * A color picker that allows selecting colors from a provided user theme
 */
export default function PalettePicker({ value, onChange, theme }: Props) {
  return (
    <div>
      <ColorValueDisplay value={value} onChange={onChange} />
      <div sx={{ py: 2 }}>
        {theme?.colors?.map((colorGroup: any, i: number) => {
          return (
            <div key={i} sx={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: '.125rem', mb: '.125rem' }}>
              {colorGroup.colors.map((color: any, i: number) => {
                const selected = value.value === color.value

                return (
                  <button
                    key={color.id}
                    title={`${colorGroup.name}.${i}: ${color.value}`}
                    sx={{
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      cursor: 'pointer',
                      borderWidth: selected ? '2px' : '1px',
                      borderColor: selected ? '#ff0000' : 'border',
                      borderStyle: 'solid',
                      borderRadius: '9999px',
                      padding: 0,
                      margin: 0,
                      width: '100%',
                      aspectRatio: '1 / 1',
                      backgroundColor: color.value,
                    }}
                    onClick={() => onChange({
                      value: color.value,
                      themePath: `colors.${colorGroup.name}.${i}`
                    })}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
