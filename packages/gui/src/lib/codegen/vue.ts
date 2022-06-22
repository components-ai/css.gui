import { HtmlNode } from '../../components/html/types'
import { extractStyles } from './extract-styles'
import { format } from './format'
import { html as toHtml } from './html'

export const vue = async (node: HtmlNode) => {
  const src = await toHtml(node)
  const { html, styles } = await extractStyles(src)

  const output = `
<template>${html}</template>
<style>${styles}</style>
`

  return format('html', output)
}
