import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export default function IconButton(props: Props) {
  return (
    <button
      sx={{
        p: 0,
        m: 0,
        appearance: 'none',
        WebkitAppearance: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'muted',
        ':disabled': {
          opacity: '50%',
          cursor: 'initial',
        },
      }}
      {...props}
    />
  )
}
