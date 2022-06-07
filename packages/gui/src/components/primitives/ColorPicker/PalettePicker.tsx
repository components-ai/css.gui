import { useEffect } from 'react'
import { Theme } from '../../../types/theme'
import ColorValueDisplay from './ValueDisplay'

type Color = string
interface Props {
  value: Color
  onChange(value: Color): void
  theme: Theme
}

/**
 * A color picker that allows selecting colors from a provided user theme
 */
export default function PalettePicker({ value, onChange, theme }: Props) {
  useEffect(() => {
    console.log(theme, 'theme')
    // const out = theme.colors?.filter((val) => {
    //   console.log(val, 'val')
    //   return !!val
    // })
    //   console.log(out, 'out')
  }, [])
  return (
    <div>
      <ColorValueDisplay value={value} onChange={onChange} />
      <div sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {theme?.colors?.map((colorGroup: any, i: number) => {
          return (
            <div key={i} sx={{ display: 'flex', gap: '.125rem' }}>
              {colorGroup.colors.map((color: any, i: number) => {
                const selected = value === color.value

                return (
                  <button
                    key={color.id}
                    title={`${colorGroup.name}.${i}`}
                    sx={{
                      cursor: 'pointer',
                      border: selected ? '2px solid' : '1px solid',
                      borderColor: selected ? '#ff0000' : 'border',
                      borderRadius: '.25rem',
                      padding: 0,
                      margin: 0,
                      width: '1.5rem',
                      height: '1.5rem',
                      aspectRatio: '1 / 1',
                      backgroundColor: color.value,
                    }}
                    onClick={() => onChange(color.value)}
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
