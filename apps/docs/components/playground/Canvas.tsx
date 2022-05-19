import { styled } from '@compai/css-gui'
import { ReactChild } from 'react'
import { Element } from './types'

type CanvasProps = {
  element: Element
  styles: any
  children: ReactChild
}
export const Canvas = ({ styles, element, children }: CanvasProps) => {
  const Element = styled[element.name]

  return (
    <section
      sx={{
        minHeight: '100vh',
        height: '100%',
        width: '100%',
        flexGrow: 1,
      }}
    >
      <Element styles={styles} children={children} />
    </section>
  )
}
