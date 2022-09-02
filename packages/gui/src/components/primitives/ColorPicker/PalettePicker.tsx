import * as Popover from '@radix-ui/react-popover'
import { themeGet } from '../../../lib'
import { useTheme } from '../../providers/ThemeContext'
import { joinPath } from '../../providers/util'
import Checkerboard from './Checkerboard'
import { hasAlpha, withFallback } from './util'

export interface ThemeColor {
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
  const theme = useTheme()
  const rawValue = themeGet({
    property: 'color',
    path: value.path,
    theme,
  })

  const labelMeta = value.path === rawValue ? null : `(${rawValue})`

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
          maxWidth: '200px',
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
        <span sx={{ fontSize: 0, color: 'muted' }}>{labelMeta}</span>
      </Popover.Trigger>
      <Popover.Content
        sx={{
          width: '20rem',
          backgroundColor: 'background',
          padding: '8px 16px',
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.5rem',
          zIndex: 99999,
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
  const color = themeGet({ theme, property: 'color', path: value.path })
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
  const valueColor = themeGet({ theme, property: 'color', path: value.path })
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
                const colorPath = `${name}.${i}`
                const selected = valueColor === color
                const rawColor = themeGet({
                  theme,
                  property: 'color',
                  path: colorPath,
                })

                return (
                  <button
                    key={color.id}
                    title={`${colorPath} (${rawColor})`}
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
