import { HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}
export const Container = (props: ContainerProps) => {
  return (
    <div
      sx={{
          maxWidth: '1024px',
          mx: 'auto',
          px: 4,
      }}
      {...props}
    />
  )
}
