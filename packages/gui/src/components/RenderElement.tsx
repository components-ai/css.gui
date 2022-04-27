import { HTMLAttributes } from 'react'
import { toCSSObject } from '../lib'
import { Styles } from '../types/css'
import { Fonts } from '../components/FontFamily/FontTags'

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
  
  
  return (
    // @ts-ignore
    <>
      <Fonts fontFamily={styles.fontFamily}/>
      {/* @ts-ignore */}
      <Component {...props} sx={styleObject} />
    </>
  )
}
