import { createContext, ReactNode, useContext, useState } from 'react'
import { htmlToEditorSchema } from '../../lib'
import { stylesToEditorSchema } from '../../lib/transformers/styles-to-editor-schema'
import { ThemeProvider } from '../providers/ThemeContext'
import { HtmlNode, ElementPath, ElementData, ComponentData } from './types'

const DEFAULT_HTML_EDITOR_VALUE = {
  selected: [],
  setSelected: () => {},
  value: htmlToEditorSchema(`
    <div class="section">
      <h1>Hello, world!</h1>
      <h2>Weeee!</h2>
      <button>I'm a CTA</button>
      <a href="https://components.ai">I'm a link!</a>
    </div>
  `),
  isEditing: false,
  setEditing: () => {},
  hasComponents: false,
  update: () => {},
}

export type HtmlEditor = {
  value: HtmlNode
  update(value: HtmlNode): void
  theme?: any
  selected: ElementPath | null
  setSelected: (newSelection: ElementPath | null) => void
  isEditing: boolean
  setEditing(value: boolean): void
  components?: ComponentData[]
  hasComponents: boolean
}

export function useHtmlEditor() {
  const context = useContext(HtmlEditorContext)
  return context
}

const HtmlEditorContext = createContext<HtmlEditor>(DEFAULT_HTML_EDITOR_VALUE)

const coerceNodeIntoUnist = (node: any) => {
  if (node.tagName) {
    return { type: 'element', attributes: {}, ...node }
  }

  return node
}

export const transformValueToSchema = (value: any): ElementData => {
  const fullValue = coerceNodeIntoUnist(value)

  const transformed = Object.entries(fullValue).reduce((acc, [key, val]) => {
    let updatedValue = val
    if (key === 'children' && Array.isArray(val)) {
      updatedValue = val.map((child) => transformValueToSchema(child))
    } else if (key === 'style') {
      updatedValue = stylesToEditorSchema(val)
    } else if (value.type === 'component' && key === 'value') {
      updatedValue = transformValueToSchema(val)
    }

    if (value.tagName && !value.type) {
      return {
        type: 'element',
        [key]: updatedValue,
        ...acc,
      }
    }

    return {
      [key]: updatedValue,
      ...acc,
    }
  }, {})

  return transformed as ElementData
}

type HtmlEditorProviderProps = {
  value: HtmlNode
  onChange(value: HtmlNode): void
  children: ReactNode
  theme?: any
  components?: ComponentData[]
}

export function HtmlEditorProvider({
  children,
  value,
  theme,
  components = [],
  onChange,
}: HtmlEditorProviderProps) {
  const [selected, setSelected] = useState<ElementPath | null>([])
  const [isEditing, setEditing] = useState(false)
  const transformedValue = transformValueToSchema(value)

  const fullContext = {
    value: transformedValue,
    selected,
    setSelected: (newSelection: ElementPath | null) =>
      setSelected(newSelection),
    components,
    isEditing,
    setEditing: (newValue: any) => setEditing(newValue),
    hasComponents: !!components.length,
    update: onChange,
  }

  console.log(fullContext.value)

  return (
    <ThemeProvider theme={theme}>
      <HtmlEditorContext.Provider value={fullContext}>
        {children}
      </HtmlEditorContext.Provider>
    </ThemeProvider>
  )
}
