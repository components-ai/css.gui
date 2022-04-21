import { HTMLAttributes } from 'react'
import { toCSSObject } from '../lib'
import { Styles } from '../types/css'

type RenderElementProps = HTMLAttributes<HTMLBaseElement> & {
  tagName: string
  styles: Styles
}
export const RenderElement = ({
  tagName,
  styles,
  ...props
}: RenderElementProps) => {
  const Component = tagName
  const styleObject = toCSSObject(styles)
  console.log(styleObject, styles, "SO")
  // @ts-ignore
  return <Component {...props} sx={styleObject} />
}
