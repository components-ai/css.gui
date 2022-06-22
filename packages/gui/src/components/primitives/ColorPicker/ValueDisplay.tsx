import { getColorMode, withFallback } from './util'
import Checkerboard from './Checkerboard'
import { AlertTriangle } from 'react-feather'
import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'
import { Color } from '../../../types/css'

interface Props {
  value: Color
  onChange(value: Color): void
}
/** Displays a swatch of the color and its current value */
export default function ColorValueDisplay({ value, onChange }: Props) {
  const colorMode = getColorMode(value)
  return (
    <div
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        my: 1,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        sx={{
          position: 'relative',
          width: '2rem',
          height: '2rem',
        }}
      >
        <Checkerboard sx={{ position: 'absolute', inset: 0 }} />
        <div
          sx={{
            position: 'absolute',
            inset: 0,
            ...withFallback(value, (color) => ({
              backgroundColor: color,
            })),
          }}
        />
      </div>
      {['p3', 'lab', 'lch'].includes(colorMode) && (
        <P3Popover mode={colorMode} />
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          py: 1,
          width: '100%',
          position: 'relative',
          fontSize: '0.875rem',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          color: 'text',
          backgroundColor: 'transparent',
          border: '1px solid',
          borderColor: 'border',
        }}
      />
    </div>
  )
}

function P3Popover({ mode }: { mode: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
        <Popover.Trigger
          sx={{
            background: 'none',
            border: 'none',
            color: 'text',
          }}
        >
          <AlertTriangle size={16} />
        </Popover.Trigger>
        <Popover.Content
          sx={{
            backgroundColor: 'background',
            border: '1px solid',
            borderColor: 'border',
            borderRadius: '0.5rem',
            padding: 2,
            fontSize: 1,
            maxWidth: '24rem',
            '> a': {
              color: 'text',
            },
          }}
        >
          <strong>Note</strong>: <code>{mode}</code> is currently only supported
          in WebKit. Appearances may vary in other browsers.{' '}
          <a href="https://webkit.org/blog/10042/wide-gamut-color-in-css-with-display-p3/">
            Learn more
          </a>
        </Popover.Content>
      </div>
    </Popover.Root>
  )
}
