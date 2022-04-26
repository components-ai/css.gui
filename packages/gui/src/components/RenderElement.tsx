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

  console.log(styleObject, styles, "so")
  // @ts-ignore
  return (
    <>
      <Fonts fontFamily={styles.fontFamily}/>
      <Component {...props} sx={{ ...styleObject }} />
    </>
  )
}

export const Fonts = ({fontFamily}: any) => {
  // const fontStyleSheetHref = getFontFamilyHref(fonts)
  // const variableFontsStylesheetHref = getVariableFontFamilyHref(
  //   fonts,
  //   textStyles
  // )

  return (
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ABeeZee:ital,wght@1,400&amp;family=ABeeZee:wght@400&amp;family=PT+Mono:wght@400" />
  )
}
