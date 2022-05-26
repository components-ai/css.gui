import { useState, useEffect, Fragment, createElement, ReactNode } from 'react'
import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import { cleanNewLines } from './plugins/clean-new-lines'
import { propertiesToAttributes } from './plugins/properties-to-attributes'
import { textNodesToStrings } from './plugins/text-nodes-to-strings'

export const htmlToEditorSchema = (text: string) => {
  const tree = unified().use(rehypeParse, { fragment: true }).parse(text)

  const processedTree = unified()
    // Don't use rehype sanitize for now since it's a bit
    // overly strict for our purposes.
    //.use(rehypeSanitize)
    .use(cleanNewLines)
    // @ts-ignore
    .use(propertiesToAttributes)
    .runSync(tree)

  const htmlBody = processedTree.children[0]
  return htmlBody
}
