export interface ElementData {
  tagName: string
  attributes?: Record<string, string>
  // `style` is an attribute, but we treat it specially for CSS.gui
  style?: Record<string, any>
  children?: HtmlNode[]
}

export type HtmlNode = ElementData | string

export const enum HTMLTag {
  P = 'p',
  Img = 'img',
  Button = 'button',
  A = 'a',
  Input = 'input',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  Span = 'span',
  Div = 'div',
}
