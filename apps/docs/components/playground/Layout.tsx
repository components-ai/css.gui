import { HTMLAttributes } from 'react'
import { Header } from '../Header'

interface Props extends HTMLAttributes<HTMLDivElement> {}
export const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <div
        sx={{
          fontFamily: 'body',
          marginRight: '1px',
        }}
        {...props}
      />
    </>
  )
}
