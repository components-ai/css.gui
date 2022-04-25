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
  const styleObject = {...toCSSObject(styles), paddingX: '32px'}
  console.log(styleObject, "style object")
  // @ts-ignore
  return <Component {...props} sx={styleObject} />
}
