import * as Popover from '@radix-ui/react-popover'
import Checkerboard from './Checkerboard'
import ColorField, { Props as PickerProps } from './Field'
import { hasAlpha, withFallback } from './util'

interface Props extends PickerProps {
  /** Whether the text value of the color should be displayed  */
  showText?: boolean
  /** The element to render on the swatch preview */
  swatch?: JSX.Element
  id?: string
}

/**
 * A compact input that shows the current display and text value of the current color,
 * and opens ColorPicker input when clicked.
 */
export default function ColorPopover({
  value,
  onChange,
  showText,
  swatch,
  ...props
}: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger
        sx={{
          display: 'flex',
          gap: 2,
          padding: 0,
          alignItems: 'center',
          color: 'text',
          backgroundColor: 'transparent',
          border: 'none',
          width: '100%',
          fontSize: '0.875rem',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {/* swatch */}
        <Popover.Anchor>{swatch || <Swatch value={value} />}</Popover.Anchor>
        {showText ? value : null}
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
        <ColorField value={value} onChange={onChange} {...props} />
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
        width: '2rem',
        aspectRatio: '1 / 1',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'border',
      }}
    >
      {/* The checkerboard causes weird aliasing to occur on Firefox,
       * so we only show it when there is a transparency */}
      {isTransparent && (
        <Checkerboard sx={{ position: 'absolute', inset: 0 }} />
      )}
      <div
        sx={{
          position: 'absolute',
          inset: 0,
          ...withFallback(value, (color) => ({ backgroundColor: color })),
        }}
      />
    </div>
  )
}
