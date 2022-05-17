import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}
export const PageWrap = (props: Props) => {
  return (
    <div
      sx={{
        width: '100%',
        position: 'relative',
        order: [1,2,2],
      }}
      {...props}
    />
  )
}
