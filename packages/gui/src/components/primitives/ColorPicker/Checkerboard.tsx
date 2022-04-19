import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

/**
 * A checkerboard pattern that can be used as a backdrop to show opacity.
 *
 * Usage:
 *
 *     <Parent sx={{ position: 'relative' }}>
 *       <Checkerboard {{ position: 'absolute', inset: 0 }} />
 *       <Overlay {{ position: 'absolute', inset: 0 }} />
 *     </Parent>
 */
export default function Checkerboard(props: Props) {
  return (
    <div
      sx={{
        /* tint image */
        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.9) 0 100%),
          /* checkered effect */
          linear-gradient(to right, black 50%, white 50%),
          linear-gradient(to bottom, black 50%, white 50%)`,
        backgroundBlendMode: `normal, difference, normal`,
        backgroundSize: `1rem 1rem`,
      }}
      {...props}
    />
  )
}
