import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
import { cleanNewLines } from './plugins/clean-new-lines'
import { propertiesToAttributes } from './plugins/properties-to-attributes'
import parse from 'style-to-object'
import { parseStyles } from '../../components/Editor/Controls'
import { camelCase } from 'lodash-es'
import { visit } from 'unist-util-visit'

import {stylesToEditorSchema} from './styles-to-editor-schema'

const handleStyles = () => (tree: any) => {
  visit(tree, 'element', (node) => {

    if (node.attributes.style) {
      // inline-style to JS obj
      let js = parse(node.attributes.style);

      // css-case to camelCase
      js = Object.keys(js).reduce((acc, val) => ({...acc, [camelCase(val)]: js[val]}), {})

      // js obj to editor style obj
      const parsedStyles = parseStyles(js);
      // filter out unparsable entries
      Object.keys(parsedStyles).forEach(key => {
        if (parsedStyles[key] === undefined) {
          delete parsedStyles[key]
        }
      })

      // hi! :)
      // color parsing seems a little busted right now, so doing this manually
      if (js['color']) {
        parsedStyles['color'] = js['color'].replace(' !important', '')
      }
      if (js['backgroundColor']) {
        parsedStyles['backgroundColor'] = js['backgroundColor'].replace(' !important', '')
      }

      // not sure what stylesToEditorSchema does, but it works?
      node.style = stylesToEditorSchema(parsedStyles);

      // style attributes cause an editor crash
      delete node.attributes.style;
    }

    // avoid classname conflicts, just in case
    if (node.attributes.className) {
      delete node.attributes.className;
    }

  })
}

export const htmlToEditorSchema = (text: string) => {
  const tree = unified().use(rehypeParse, { fragment: true }).parse(text)

  const processedTree = unified()
    .use(cleanNewLines)
    // @ts-ignore
    .use(propertiesToAttributes)
    .use(handleStyles)
    .runSync(tree)

  const htmlBody = processedTree.children[0]
  return htmlBody
}
