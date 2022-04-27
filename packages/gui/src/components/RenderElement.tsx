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
  
  
  return (
    // @ts-ignore
    <>
      <Fonts fontFamily={styles.fontFamily}/>
      {/* @ts-ignore */}
      <Component {...props} sx={styleObject} />
    </>
  )
}

export const plusify = (name: string) => name.replace(/\s/g, '+')

type FontFamily = {
  name: string
  weights: (string | number)[]
  styles: string[]
}
export const toGoogleFontUrl = async (families: FontFamily[]) => {
  if (!families?.length) return null

  let familiesFmt: any[] = []

  families.forEach((family) => {
    let name = plusify(family.name)
    family.weights.forEach((weight) => {
      family.styles.forEach((style) => {
        let query = `family=${name}:`
        let italics = ''

        if (style === 'italic') italics = 'ital,'
        familiesFmt.push(
          `${query}${italics}wght@${italics ? '1,' : ''}${weight}`
        )
      })
    })
  })

  return `https://fonts.googleapis.com/css2?${familiesFmt.join('&')}`
}

export const getFontFamilyHref = async (font: string) => {
  // const fontArr = fonts.split(',') // remove preceeding ' 's
  // const fontFamilies = fontArr.map((v: any) => v?.stack || v).join(',')

  const res = await fetch(`https://components.ai/api/v1/typefaces/${font}`)
  const rawFontData = await res.json()
  
  //TODO: this will break for system fonts
  const styles = Object.keys(rawFontData?.variants)
  const weights = Object.keys(rawFontData?.variants[styles[0]])
  const fontData: FontFamily = {
    name: font,
    weights,
    styles
  }
  
  return await toGoogleFontUrl([fontData])
}

import * as React from 'react'
export const Fonts = ({fontFamily}: any) => {
  
  const [styleSheet, setStyleSheet] = React.useState<string | null>('')
  React.useEffect(() => {
    // debounce
    const getStyleSheet = async () => {
      const ss = await getFontFamilyHref(fontFamily)
      setStyleSheet(ss)
    }

    getStyleSheet()
  }, [fontFamily])

  
  console.log(styleSheet, "family")
  return (
    <>
      {styleSheet ? (
        <link rel="stylesheet" href={styleSheet} />
      ) : null}
    </>
  )
  // const variableFontsStylesheetHref = getVariableFontFamilyHref(
  //   fonts,
  //   textStyles
  // )

  return (
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=ABeeZee:ital,wght@1,400&amp;family=ABeeZee:wght@400&amp;family=PT+Mono:wght@400" />
  )
}
