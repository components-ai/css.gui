export interface ElementData {
  tagName: string
  attributes?: Record<string, string>
  // `style` is an attribute, but we treat it specially for CSS.gui
  style?: Record<string, any>
  children?: HtmlNode[]
}

export type HtmlNode = ElementData | string

export const enum HTMLTag {
  // Text
  P = 'p',
  Blockquote = 'blockquote',
  Img = 'img',
  A = 'a',
  B = 'b',
  I = 'i',
  Figcaption = 'figcaption',
  Figure = 'figure',
  Hr = 'hr',
  // Content Sectioning
  Header = 'header',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  Span = 'span',
  Div = 'div',
  Article = 'article',
  Address = 'address',
  Aside = 'aside',
  Footer = 'footer',
  Main = 'main',
  Nav = 'nav',
  Section = 'section',
  // Lists
  Ul = 'ul',
  Li = 'li',
  Ol = 'ol',
  Dl = 'dl',
  Dt = 'dt',
  Dd = 'dd',
  // Form
  Input = 'input',
  Button = 'button',
  Fieldset = 'fieldset',
  Label = 'label',
  Legend = 'legend',
  Form = 'form',
  Datalist = 'datalist',
  Meter = 'meter',
  Optgroup = 'optgroup',
  Option = 'option',
  Output = 'output',
  Progress = 'progress',
  Select = 'select',
  TextArea = 'textarea',
  // Tables
  Caption = 'caption',
  Col = 'col',
  Colgroup = 'colgroup',
  Table = 'table',
  Tbody = 'tbody',
  Td = 'td',
  Tfoot = 'tfoot',
  Th = 'th',
  Thead = 'thead',
  Tr = 'tr',
  // 
  Details = 'details',
  Dialog = 'dialog',
  Summary = 'summary',
  //
  Code = 'code',
  Pre = 'pre',
  Menu = 'menu',
  Abbr = 'abbr',
  Data = 'data',
  Em = 'em',
  Mark = 'mark',
  Time = 'time',
  Sub = 'sub',
  Sup = 'sup',
  Small = 'small',
  Var = 'var',
  Del = 'del',
  Ins = 'ins',
  U = 'u',
  Samp = 'samp',
  S = 's',
  Q = 'q',
}
