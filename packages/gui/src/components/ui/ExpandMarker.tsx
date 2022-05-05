import { ChevronRight } from 'react-feather'

/**
 * A chevron that shows whether an item has been expanded or not
 */
export function ExpandMarker({ open }: { open: boolean }) {
  return (
    <div
      sx={{
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 150ms',
        mr: 1,
      }}
    >
      <ChevronRight size={18} />
    </div>
  )
}
