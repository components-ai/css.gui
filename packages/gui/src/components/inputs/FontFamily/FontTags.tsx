import * as React from 'react'
import { debounce } from 'lodash-es'
import { plusify } from '../../../lib/util'

type FontFamilyData = {
  name: string
  weights: (string | number)[]
  styles: string[]
}

const toGoogleFontUrl = (families: FontFamilyData[]) => {
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

export const toGoogleVariableFontUrl = (variableFonts: any[]) => {
  
  if (!variableFonts?.length) return null
  
  let familyQueries: any[] = []

  variableFonts.forEach((vFont) => {
    let prependQuery = `family=${plusify(vFont.name)}:`
    delete vFont['name']
    
    let orderedKeys = [
      ...Object.keys(vFont)
        .filter((k) => k === k.toLowerCase())
        .sort(),
      ...Object.keys(vFont)
        .filter((k) => k === k.toUpperCase())
        .sort(),
    ]
    
    const queryParams = orderedKeys.join(',')
    
    const queryRange = orderedKeys
      .map((key) => {
        if (key === 'ital') return null
        return `${vFont[key].min}..${vFont[key].max}`
      })
      .filter(Boolean)
      .join(',')

    const usesItal = orderedKeys.includes('ital')

    familyQueries.push(
      `${prependQuery}${queryParams}@${usesItal ? '0,' : ''}${queryRange}`
    )
    if (usesItal) {
      familyQueries.push(`${prependQuery}${queryParams}@${'1,'}${queryRange}`)
    }
  })

  const cssQueries = familyQueries.join('&')
  return `https://fonts.googleapis.com/css2?${cssQueries}`
}


export const getVariableFontFamilyHref = (
  fontFamily: string
) => {
  const formattedName = fontFamily?.replace(/['"]+/g, '')
  console.log(formattedName, "fmtName")
  // api call here
  const data: any = {
    Recursive: {
      name: 'Recursive',
      "slnt": {
        "default": 0,
        "min": -15,
        "max": 0,
        "step": 1
      },
      "wght": {
        "default": 400,
        "min": 300,
        "max": 1000,
        "step": 1
      },
      "CASL": {
        "default": 0,
        "min": 0,
        "max": 1,
        "step": 0.1
      },
      "CRSV": {
        "default": 0.5,
        "min": 0,
        "max": 1,
        "step": 0.1
      },
      "MONO": {
        "default": 0,
        "min": 0,
        "max": 1,
        "step": 0.01
      }
    }
  } 
  const fontData = data[formattedName]
  return fontData ? toGoogleVariableFontUrl([fontData]) : null
}

const getFontFamilyHref = async (font: string) => {
  try {
    const res = await fetch(`https://components.ai/api/v1/typefaces/${font}`)
    const rawFontData = await res.json()
    
    const styles = Object.keys(rawFontData?.variants)
    const weights = Object.keys(rawFontData?.variants[styles[0]])
    const fontData: FontFamilyData = {
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

const getVariableStyleSheet = (fontFamily: string, setVariableStyleSheet: Function) => {
  const sheet = getVariableFontFamilyHref(fontFamily)
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
 
  return (
    <link rel="stylesheet" href={variableStyleSheet || styleSheet || ''} />
  )
}
