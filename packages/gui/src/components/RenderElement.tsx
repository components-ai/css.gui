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
  const styleObject = toCSSObject(styles)

  return (
    // @ts-ignore
    <>
      {styles.fontFamily ? <FontTags fontFamily={styles.fontFamily} /> : null}
      {/* @ts-ignore */}
      <Component {...props} sx={styleObject} />
    </>
  )
}
