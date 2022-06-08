import { HTMLAttributes } from 'react'
import { toCSSObject } from '../lib'
import { Styles } from '../types/css'
import { FontTags } from './inputs/FontFamily/FontTags'
import { useTheme } from './providers/ThemeContext'

type RenderElementProps = HTMLAttributes<HTMLBaseElement> & {
  tagName: string
  styles: Styles
}

export const RenderElement = ({
  tagName,
  styles,
  ...props
}: RenderElementProps) => {
  const theme = useTheme()
  const Component = tagName
  const styleObject = toCSSObject(styles, theme)

  return (
    // @ts-ignore
    <>
      {styles.fontFamily ? <FontTags fontFamily={styles.fontFamily} /> : null}
      {/* @ts-ignore */}
      <Component {...props} sx={styleObject} />
    </>
  )
}
