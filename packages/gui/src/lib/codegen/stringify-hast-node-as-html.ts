import { isArray, isNumber, isObject, kebabCase } from 'lodash-es'
import escapeHtml from 'escape-html'
import { isElement, isVoidElement } from '../elements'
import { getSlots, isSlot } from './util'
import { objectToDecls } from './stringify-css-object'

// TODO: This can, and should, be done at the AST level in the future
export const formatTagName = (node: any) => {
  if (isElement(node.tagName)) {
    return node.tagName
  }

  const formatted = kebabCase(node.tagName)

  if (!formatted.includes('-')) {
    return `my-${formatted}`
  }

  return formatted
}

export const stringifyHastNode = (node: any) => {
  if (typeof node === 'string' || isSlot(node)) {
    return node.value || node
  }

  if (node.props.style) {
    node.props.style = objectToDecls(node.props.style).trim()
  }

  if (isVoidElement(node.tagName)) {
    return `<${formatTagName(node)} ${stringifyProps(node.props)} />`
  }

  let children = node.children?.map(stringifyHastNode).join('\n') || ''

  // TODO: This can, and should, be done at the AST level in the future
  if (!children?.length && node.type) {
    const childSlot = getSlots(node.value).find(
      (slot) => slot.name === 'children'
    )
    children = childSlot ? stringifyHastNode(childSlot) : ''
    children = `<slot>${children}</slot>`
  }

  return `
    <${formatTagName(node)} ${stringifyProps(node.props)}>
      ${children}
    </${formatTagName(node)}>`
}
export const stringifyProps = (props: any): string => {
  if (!props) {
    return ''
  }

  return Object.entries(props)
    .map(([key, value]): any => {
      if (isArray(value) || isObject(value)) {
        return `${key}={${JSON.stringify(value)}}`
      }

      if (isNumber(value)) {
        return `${key}={${value}}`
      }

      const fullValue = escapeHtml(value as string)
      return `${key}="${fullValue}"`
    })
    .join(' ')
}
