import * as React from 'react'
import { debounce } from 'lodash-es'
import { toGoogleFontUrl, toGoogleVariableFontUrl } from '../../../lib/util'

export const getVariableFontFamilyHref = async (
  fontFamily: string
) => {
  const formattedName = fontFamily?.replace(/['"]+/g, '')
  try {
    const res = await fetch(`https://components.ai/api/v1/typefaces/variable?name=${formattedName}`)
    const varFontData = await res.json()
    const fullData = {
      name: fontFamily,
      ...(varFontData ?? {})
    }

    return toGoogleVariableFontUrl([fullData])
  } catch {
    return null
  }
}

const getFontFamilyHref = async (font: string) => {
  try {
    const res = await fetch(`https://components.ai/api/v1/typefaces/${font}`)
    const rawFontData = await res.json()

    const styles = Object.keys(rawFontData?.variants)
    const weights = Object.keys(rawFontData?.variants[styles[0]])
    const fontData = {
      name: rawFontData?.name,
      weights,
      styles,
    }

    return toGoogleFontUrl([fontData])
  } catch (e) {
    console.log(`failed to fetch ${font} font`)
    return null
  }
}

const getVariableStyleSheet = async (fontFamily: string, setVariableStyleSheet: Function) => {
  const sheet = await getVariableFontFamilyHref(fontFamily)  
  setVariableStyleSheet(sheet)
}
const debouncedVariableStyleSheet = debounce(getVariableStyleSheet, 1000)

const getStyleSheet = async (fontFamily: string, setStyleSheet: Function) => {
  const sheet = await getFontFamilyHref(fontFamily)
  setStyleSheet(sheet)
}
const debouncedGetStyleSheet = debounce(getStyleSheet, 1000)

export const FontTags = ({ fontFamily }: any) => {
  const [styleSheet, setStyleSheet] = React.useState<string | null>('')
  const [variableStyleSheet, setVariableStyleSheet] = React.useState<string | null>('')
  
  React.useEffect(() => {
    debouncedVariableStyleSheet(fontFamily, setVariableStyleSheet)
    debouncedGetStyleSheet(fontFamily, setStyleSheet)
  }, [fontFamily])
 
  if (!fontFamily) {
    return null
  }

  return <>{styleSheet || variableStyleSheet 
    ? <link rel="stylesheet" href={variableStyleSheet || styleSheet || ''} />
    : null
  }</>

}
