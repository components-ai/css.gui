import { HTMLAttributes } from 'react'
import { Header } from './Header'

interface Props extends HTMLAttributes<HTMLDivElement> {}
export const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <div
        sx={{
          fontFamily: 'body',
          display: 'grid',
          gridTemplateColumns: ['1fr', '256px auto', '256px auto'],
        }}
        {...props}
      />
    </>
  )
}
