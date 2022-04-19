import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Layout = (props: Props) => {
  return <div id="layout" sx={{ fontFamily: 'body' }} {...props} />
}
