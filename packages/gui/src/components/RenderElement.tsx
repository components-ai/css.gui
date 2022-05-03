import { HTMLAttributes } from 'react'
import { toCSSObject } from '../lib'
import { Styles } from '../types/css'
import { FontTags } from './inputs/FontFamily/FontTags'

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
  //Temp
  const { fontFamily } = styles
  const styleObject = toCSSObject(styles)
  
  
  // TODO: change all this back
  return (
    // @ts-ignore
    <>
      {/* @ts-ignore */}
      <FontTags fontFamily={fontFamily.fontFamily}/>
      {/* @ts-ignore */}
      <Component {...props} sx={{ 
        ...styleObject,
        // @ts-ignore
        ...fontFamily,
        // fontFamily: styles.fontFamily.fontFamily,
        // @ts-ignore
        fontVariationSettings: styles.fontFamily?.fontVariationSettings
      }} />
    </>
  )
}
