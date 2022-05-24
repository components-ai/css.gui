import { debounce, uniq } from 'lodash-es'
import { useEffect, useState } from 'react'
import { buildFontFamiliesHref } from '../inputs/FontFamily/FontTags'

function getStyleFonts(style: any): string[] {
  let fonts: string[] = []

  if (style.fontFamily) {
    fonts.push(style.fontFamily)
  }

  for (const [_, v] of Object.entries(style)) {
    if (typeof v === 'object') {
      fonts = [...fonts, ...getStyleFonts(v)]
    }
  }

  return uniq(fonts)
}

async function buildHref(style: any, setHref: Function) {
  const fonts = getStyleFonts(style)
  const href = await buildFontFamiliesHref(fonts)
  setHref(href)
}
const debouncedBuildHref = debounce(buildHref, 1500)

export function HTMLFontTags({ style }: any) {
  const [href, setHref] = useState<string>('')

  useEffect(() => {
    debouncedBuildHref(style || {}, setHref)
  }, [style])

  return <>{href ? <link rel="stylesheet" href={href} /> : null}</>
}
