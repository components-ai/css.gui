import * as Popover from '@radix-ui/react-popover'
import Checkerboard from './Checkerboard'
import ColorField, { Props as PickerProps } from './Field'
import { hasAlpha, withFallback } from './util'

interface Props extends PickerProps {
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
  swatch,
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
        <Popover.Anchor>{swatch || <Swatch value={value} />}</Popover.Anchor>
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
          zIndex: 9999,
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
