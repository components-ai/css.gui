import { styled } from '@compai/css-gui'
import { ReactChild } from 'react'
import { Element } from './types'

type CanvasProps = {
  element: Element
  styles: any
}
export const Canvas = ({ styles, element }: CanvasProps) => {
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
      <Element styles={styles}>{element.children ?? null}</Element>
    </section>
  )
}
