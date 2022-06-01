import { useState } from 'react'
import { Color } from '../../../types/css'
import { Theme } from '../../../types/theme'
import { Label } from '../Label'

interface MiniPaletteProps {
  value: Color
  onChange(value: Color): void
  theme?: Theme
}

export function PreviewPalettePicker({
  value,
  onChange,
  theme,
}: MiniPaletteProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const collapsedRows = 2
  return (
    <>
      <Label sx={{ py: 2 }}>Theme Colors</Label>
      <div sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {theme?.colors?.map((colorGroup: any, i: number) => {
          if (isCollapsed && i >= collapsedRows) {
            return null
          }

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
        {`${isCollapsed ? 'View Full Theme' : 'Hide'}`}
      </a>
    </>
  )
}
