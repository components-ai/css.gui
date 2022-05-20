import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color .2s ease-in-out',
        ':hover': {
          color: 'text',
        },
        ':disabled': {
          opacity: '50%',
          cursor: 'initial',
        },
      }}
      {...props}
    />
  )
}
