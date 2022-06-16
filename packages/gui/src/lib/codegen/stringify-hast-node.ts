import { isArray, isNumber, isObject } from 'lodash-es'
import escapeHtml from 'escape-html'
import { isVoidElement } from '../elements'

export const stringifyHastNode = (node: any) => {
  if (typeof node === 'string') {
    return node
  }

  if (!node.children || isVoidElement(node.tagName)) {
    return `<${node.tagName} ${stringifyProps(node.props)} />`
  }

  const children = node.children.map(stringifyHastNode).join('\n')

  return `
    <${node.tagName} ${stringifyProps(node.props)}>
      ${children}
    </${node.tagName}>`
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
