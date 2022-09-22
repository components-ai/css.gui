import { camelCase, kebabCase } from 'lodash-es'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { HtmlNode, Slot } from '../../components/html/types'

export const getSlots = (value: HtmlNode) => {
  if (isText(value) || isSlot(value)) {
    return []
  }

  let slots: Slot[] = []
  unified()
    .use(() => (tree: any) => {
      visit(tree, 'slot', (node: any) => {
        slots.push(node)
      })
      visit(tree, 'element', (node: any) => {
        const attributes = node.attributes || {}
        Object.values(attributes).forEach((val: any) => {
          if (isSlot(val)) {
            slots.push(val)
          }
        })
      })
    })
    .runSync(value)

  return slots
}

export const getPropSyntax = (value: HtmlNode) => {
  const slots = getSlots(value)
  const props = slots.map((slot) => camelCase(slot.name)).join(', ')
  return props.length ? `{ ${props} }` : ''
}

export const hasChildrenSlot = (value: HtmlNode) => {
  const slots = getSlots(value)
  return !!slots.find((slot) => slot.name === 'children')
}

export const stringifySlotInProp = (value: any, outerProps: any) => {
  if (isSlot(value)) {
    const slotName = value.name
    if (outerProps && outerProps[slotName]) {
      return outerProps[slotName]
    }

    return value.value ?? null
  }

  return value
}

export const isText = (value: HtmlNode) => value?.type === 'text'
export const isSlot = (value: HtmlNode) => value?.type === 'slot'

// TODO: This should find attr slots only
export const getAttrSyntax = (value: HtmlNode) => {
  return ''
  const slots = getSlots(value)

  if (!slots.length) {
    return ''
  }

  const props = slots.map((slot) => kebabCase(slot.name)).join(', ')
  const attrString = props.length ? `{ ${props} }` : ''

  return `
    const { attrs } = state
    const ${attrString} = attrs
  `
}
