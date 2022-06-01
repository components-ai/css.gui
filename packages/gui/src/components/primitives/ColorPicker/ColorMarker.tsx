import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

/**
 * Default stylings for a color marker.
 */
export default function ColorMarker(props: Props) {
  return (
    <div
      sx={{
        zIndex: 10,
        cursor: 'grab',
        width: '2rem',
        height: '2rem',
        aspectRatio: '1 / 1',
        borderRadius: '9999px',
        border: '2px solid',
        borderColor: 'white',
        overflow: 'hidden',
        boxShadow:
          '0 0 2px 1px rgba(0,0,0,.15), 0 0 2px 1px rgba(255,255,255,.15)',
      }}
      {...props}
    />
  )
}
