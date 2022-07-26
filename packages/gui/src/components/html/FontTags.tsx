import { debounce, uniq } from 'lodash-es'
import { useEffect, useState } from 'react'
import { stringifyFontFamily } from '../../lib/stringify'
import { Theme } from '../../types/theme'
import {
  buildFontFamiliesHref,
  buildVariableFontFamiliesHref,
} from '../inputs/FontFamily/FontTags'
import { useTheme } from '../providers/ThemeContext'

export function getStyleFonts(style: any, theme?: Theme): string[] {
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

  return uniq(fonts).map((font) => stringifyFontFamily(font, theme))
}

export function getHTMLTreeFonts(root: any, theme?: Theme): string[] {
  if (!root) return []
  let treeFonts: any[] = []

  if (root.style) {
    treeFonts = [...getStyleFonts(root.style)]
  }

  if (root.type === 'component' && root.value) {
    return [...treeFonts, ...getHTMLTreeFonts(root.value, theme)]
  }

  if (!root.children) {
    return treeFonts
  }

  for (const node of root.children) {
    if (node.type !== 'text') {
      treeFonts = [...treeFonts, ...getHTMLTreeFonts(node, theme)]
    }
  }

  return uniq(treeFonts).map((font) => stringifyFontFamily(font, theme))
}

interface BuildHrefProps {
  tree: any
  style: any
  setStaticHref: Function
  setVariableHref: Function
  theme?: Theme
}
async function buildHrefs({
  tree,
  style,
  setStaticHref,
  setVariableHref,
  theme,
}: BuildHrefProps) {
  const fonts = style
    ? getStyleFonts(style, theme)
    : getHTMLTreeFonts(tree, theme)
  const staticHref = await buildFontFamiliesHref(fonts)
  const variableHref = await buildVariableFontFamiliesHref(fonts)

  setStaticHref(staticHref)
  setVariableHref(variableHref)
}

const debouncedBuildHref = debounce(buildHrefs, 1500)

interface Props {
  htmlTree: any
  style?: any
}
export function HTMLFontTags({ htmlTree = {}, style }: Props) {
  const theme = useTheme()
  const [staticHref, setStaticHref] = useState<string>('')
  const [variableHref, setVariableHref] = useState<string>('')

  useEffect(() => {
    debouncedBuildHref({
      tree: htmlTree,
      style,
      setStaticHref,
      setVariableHref,
      theme,
    })
  }, [htmlTree, style])

  return (
    <>
      {staticHref ? <link rel="stylesheet" href={staticHref} /> : null}
      {variableHref ? <link rel="stylesheet" href={variableHref} /> : null}
    </>
  )
}
