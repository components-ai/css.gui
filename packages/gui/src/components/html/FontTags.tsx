import { debounce, uniq } from 'lodash-es'
import { useEffect, useState } from 'react'
import { buildFontFamiliesHref } from '../inputs/FontFamily/FontTags'

export function getStyleFonts(style: any): string[] {
  if (!style) return []
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

export function getHTMLTreeFonts(root: any): string[] {
  if (!root) return []
  let treeFonts: any[] = []

  if (root.style) {
    treeFonts = [...getStyleFonts(root.style)]
  }

  for (const node of root.children) {
    if (typeof node === 'object') {
      treeFonts = [...treeFonts, ...getHTMLTreeFonts(node)]
    }
  }

  return uniq(treeFonts)
}

interface BuildHrefProps {
  tree: any
  style: any
  setHref: Function
}
async function buildHref({ tree, style, setHref }: BuildHrefProps) {
  const fonts = style ? getStyleFonts(style) : getHTMLTreeFonts(tree)
  const href = await buildFontFamiliesHref(fonts)
  setHref(href)
}

const debouncedBuildHref = debounce(buildHref, 1500)

interface Props {
  htmlTree: any
  style?: any
}
export function HTMLFontTags({ htmlTree = {}, style }: Props) {
  const [href, setHref] = useState<string>('')

  useEffect(() => {
    debouncedBuildHref({
      tree: htmlTree,
      style,
      setHref,
    })
  }, [htmlTree, style])

  return <>{href ? <link rel="stylesheet" href={href} /> : null}</>
}
