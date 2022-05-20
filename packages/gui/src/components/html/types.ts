export interface ElementData {
  tagName: string
  attributes?: Record<string, string>
  // `style` is an attribute, but we treat it specially for CSS.gui
  style?: Record<string, any>
  children?: HtmlNode[]
}

export type HtmlNode = ElementData | string
