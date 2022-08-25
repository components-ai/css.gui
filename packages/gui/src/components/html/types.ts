export interface ElementData {
  type: 'element' | 'text'
  tagName?: string
  attributes?: Record<string, string | Slot>
  // `style` is an attribute, but we treat it specially for CSS.gui
  style?: Record<string, any>
  value?: string
  children?: HtmlNode[]
  props?: Props
}
export type Props = {
  [key: string]: string | number
}

export interface Slot {
  type: 'slot'
  name: string
  value?: string
  tagName?: string
  attributes?: Record<string, string | Slot>
  style?: Record<string, any>
  children?: HtmlNode[]
  props?: Props
}
export interface ComponentData {
  type: 'component'
  id: string
  tagName: string
  props?: Props
  value: HtmlNode
  attributes?: Record<string, string | Slot>
  style?: Record<string, any>
  swappableComponentIds?: string[]
  children?: HtmlNode[]
}

export type HtmlBaseNode = ElementData | ComponentData
export type HtmlNode = HtmlBaseNode | Slot
export type ElementPath = number[]
