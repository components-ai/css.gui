import { useState } from 'react'
import { Color } from '../../../types/css'
import { Theme } from '../../../types/theme'
import { Label } from '../Label'
import { ThemeColor } from './PalettePicker'

interface MiniPaletteProps {
  value: Color
  onChange(value: ThemeColor): void
  theme?: Theme
}

export function PreviewPalettePicker({
  value,
  onChange,
  theme,
}: MiniPaletteProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const collapsedRows = 8
  return (
    <>
      <Label sx={{ py: 2 }}>Theme Colors</Label>
      <div
        sx={{
          '& *': {
            transition: 'all .2s ease-in-out',
          },
        }}
      >
        {theme?.colors?.map((colorGroup: any, i: number) => {
          if (isCollapsed && i >= collapsedRows) {
            return null
          }

          return (
            <div
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12,1fr)',
                gap: '.25rem',
                mb: 1,
              }}
            >
              {colorGroup.colors.map((color: any, i: number) => {
                const selected = value === color.value

                return (
                  <button
                    key={color.id}
                    title={`${colorGroup.name}.${i}`}
                    sx={{
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      cursor: 'pointer',
                      boxShadow: selected ? 'inset 0 0 0 2px white, 0 0 0 2px '+color.value : 'inset 0 0 0 2px rgba(0,0,0,.15)',
                      borderRadius: '9999px',
                      padding: 0,
                      margin: 0,
                      width: '100%',
                      aspectRatio: '1 / 1',
                      backgroundColor: color.value,
                      border: 0,
                    }}
                    onClick={() =>
                      onChange({
                        type: 'theme',
                        path: `${colorGroup.name}.${i}`,
                      })
                    }
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <a
        sx={{
          width: '100%',
          display: 'block',
          textAlign: 'right',
          pt: 2,
          fontSize: 0,
          cursor: 'pointer',
        }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {`${isCollapsed ? 'View All' : 'Hide'}`}
      </a>
    </>
  )
}
