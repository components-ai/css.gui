import { debounce } from 'lodash-es'
import { useEffect, useState } from 'react'
import { toCSSObject } from '../../lib'
import { buildFontFamiliesHref } from '../inputs/FontFamily/FontTags'
import { ElementData } from './types'

interface Props {
  value: ElementData
}

export function getStyleFonts(style: any): string[] {
  let fonts: string[] = []

  if (style.fontFamily) {
    fonts.push(style.fontFamily)
  }
  
  for (const [_, v] of Object.entries(style)) {
    if (typeof(v) === 'object') {
      fonts = [ ...fonts, ...getStyleFonts(v)]
    }
  }
  
  return fonts
}

async function buildHref(style: any, setHref: Function) {
  console.log(style, 'style')
  const fonts = getStyleFonts(style)
  console.log(fonts, "fonts")
  const href = await buildFontFamiliesHref(fonts)
  console.log(href, "href")
  setHref(href)
}
const debouncedBuildHref = debounce(buildHref, 1500)

export function HtmlRenderer({ value }: Props) {
  const { tagName, attributes = {}, style = {}, children = [] } = value
  const Tag: any = value.tagName || 'div'

  // const [fontFamilies, setFontFamilies] = useState<string[]>([])
  const [href, setHref] = useState<string>('')
  useEffect(() => {
    debouncedBuildHref(value.style || {}, setHref)
  }, [value.style])
  return (
    <>
      {/* <FontTags families={fontFamilies}/> */}
      {href && <link rel="stylesheet" href={href} />}
      <Tag {...attributes} sx={{ ...toCSSObject(style) }}>
        {children.map((child, i) => {
          if (typeof child === 'string') {
            return child
          }
          return <HtmlRenderer key={i} value={child} />
        })}
      </Tag>
    </>
  )
}

function FontTags({ families }: any) {
  return (
    <div>my stylesheet here</div>
  )
}
// TODO
  // debounced function to collate font famillies
  // 
