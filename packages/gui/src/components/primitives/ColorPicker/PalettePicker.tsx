import * as Popover from '@radix-ui/react-popover'
import { Color } from '../../../types/css'
import { Theme } from '../../../types/theme'
import Checkerboard from './Checkerboard'
import { hasAlpha, withFallback } from './util'
import ColorValueDisplay from './ValueDisplay'

interface Props {
  value: Color
  onChange(value: Color): void
  theme: Theme
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
        {value}
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

function Swatch({ value }: { value: string }) {
  const isTransparent = hasAlpha(value)
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
          ...withFallback(value, (color) => ({ backgroundColor: color })),
        }}
      />
    </div>
  )
}

/**
 * A color picker that allows selecting colors from a provided user theme
 */
export function PalettePicker({ value, onChange, theme }: Props) {
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
                    onClick={() =>
                      onChange({
                        value: color,
                        themePath: `colors.${colorGroup.name}.${i}`,
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
