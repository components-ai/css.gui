import * as Popover from '@radix-ui/react-popover'
import { get } from 'lodash-es'
import { Color } from '../../../types/css'
import { Theme } from '../../../types/theme'
import { useTheme } from '../../providers/ThemeContext'
import Checkerboard from './Checkerboard'
import { hasAlpha, withFallback } from './util'
import ColorValueDisplay from './ValueDisplay'

interface ThemeColor {
  type: 'theme'
  path: string
}

interface Props {
  value: ThemeColor
  onChange(value: ThemeColor): void
}

export default function PalettePopover({
  value,
  onChange,
  // swatch,
  ...props
}: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger
        sx={{
          pl: 1,
          pr: 2,
          py: 1,
          cursor: 'pointer',
          color: 'text',
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.25rem',
          width: 'max-content',
          fontSize: '0.875rem',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* swatch */}
        <Popover.Anchor>{<Swatch value={value} />}</Popover.Anchor>
        {value.path}
      </Popover.Trigger>
      <Popover.Content
        sx={{
          width: '20rem',
          backgroundColor: 'background',
          padding: '8px 16px',
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.5rem',
        }}
      >
        <PalettePicker value={value} onChange={onChange} {...props} />
      </Popover.Content>
    </Popover.Root>
  )
}

function Swatch({ value }: { value: ThemeColor }) {
  const theme = useTheme()
  // FIXME extracting color value from path is annoying...
  const color = get(theme.colors, value.path)
  // console.log(value, theme, color)
  const isTransparent = hasAlpha(color)
  return (
    <div
      sx={{
        position: 'relative',
        width: '1.25rem',
        height: '1.25rem',
        aspectRatio: '1 / 1',
        borderRadius: '0.25rem',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'border',
      }}
    >
      {/* The checkerboard causes weird aliasing to occur on Firefox,
       * so we only show it when there is a transparency */}
      {isTransparent && <Checkerboard sx={{ inset: 0 }} />}
      <div
        sx={{
          inset: 0,
          height: '100%',
          width: '100%',
          ...withFallback(color, (color) => ({ backgroundColor: color })),
        }}
      />
    </div>
  )
}

/**
 * A color picker that allows selecting colors from a provided user theme
 */
export function PalettePicker({ value, onChange }: Props) {
  const theme = useTheme()
  const valueColor = get(theme.colors, value.path)
  return (
    <div>
      {/* <ColorValueDisplay value={color} onChange={onChange} /> */}
      <div sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {Object.entries(theme?.colors ?? {}).map(([name, colorGroup]) => {
          if (!(colorGroup instanceof Array)) {
            return null
          }
          return (
            <div key={name} sx={{ display: 'flex', gap: '.125rem' }}>
              {(colorGroup as any).map((color: any, i: number) => {
                const selected = valueColor === color

                return (
                  <button
                    key={color.id}
                    title={`${name}.${i}`}
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
                      backgroundColor: color,
                    }}
                    onClick={() =>
                      onChange({
                        type: 'theme',
                        path: `${name}.${i}`,
                      })
                    }
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
