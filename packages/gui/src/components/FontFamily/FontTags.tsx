import * as React from 'react'
import { debounce } from 'lodash-es'

const plusify = (name: string) => name.replace(/\s/g, '+')

type FontFamily = {
  name: string
  weights: (string | number)[]
  styles: string[]
}

const toGoogleFontUrl = (families: FontFamily[]) => {
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

const getFontFamilyHref = async (font: string) => {
  try {
    const res = await fetch(`https://components.ai/api/v1/typefaces/${font}`)
    const rawFontData = await res.json()
    
    const styles = Object.keys(rawFontData?.variants)
    const weights = Object.keys(rawFontData?.variants[styles[0]])
    const fontData: FontFamily = {
      name: rawFontData?.name,
      weights,
      styles
    }
    
    return toGoogleFontUrl([fontData])
  } catch (e) {
    console.log(`failed to fetch ${font} font`)
    return null
  }
}

const getStyleSheet = async (fontFamily: string, setStyleSheet: Function) => {
  const sheet = await getFontFamilyHref(fontFamily)
  if (sheet) setStyleSheet(sheet)
}
const debouncedGetStyleSheet = debounce(getStyleSheet, 1000)

export const Fonts = ({fontFamily}: any) => {
  const [styleSheet, setStyleSheet] = React.useState<string | null>('')
  
  React.useEffect(() => {
    debouncedGetStyleSheet(fontFamily, setStyleSheet)
  }, [fontFamily])
 
  return (
    <>
      {styleSheet ? (
        <link rel="stylesheet" href={styleSheet} />
      ) : null}
    </>
  )
}