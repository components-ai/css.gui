import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}
export const PageWrap = (props: Props) => {
  return (
    <div
      sx={{
        py: [3, 4, 5],
        width: '100%',
        position: 'relative',
        '> *': {
          px: [3, 4, 5],
          maxWidth: 800,
          mx: 'auto',
        },
        '> *.full-bleed': {
          maxWidth: '100%',
          px: 0,
        },
      }}
      {...props}
    />
  )
}
