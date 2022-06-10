import { property } from 'lodash-es'
import { Children, cloneElement, createContext, isValidElement, ReactElement, ReactNode, useContext, useEffect, useState } from 'react'
import { rawProperties } from '../../data/properties'
import { htmlToEditorSchema } from '../../lib'
import { stylesToEditorSchema } from '../../lib/transformers/styles-to-editor-schema'
import { HtmlNode, ElementPath, ElementData } from './types'

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
}

export type HtmlEditor = {
  value: HtmlNode
  selected: ElementPath | null
  setSelected: (newSelection: ElementPath | null) => void
}

export function useHtmlEditor() {
  const context = useContext(HtmlEditorContext)
  return context
}

const HtmlEditorContext = createContext<HtmlEditor>(DEFAULT_HTML_EDITOR_VALUE)

const transformFunction = (property: string, value: any) => {
  if (rawProperties[property]?.input === 'color' && typeof value === 'string') {
    return { value }
  }

  return value
}
export const transformValueToSchema = (value: any): ElementData => {
  const transformed = Object.entries(value).reduce((acc, [key, val]) => {
    let updatedValue = val
    if (key === 'children' && Array.isArray(val)) {
      updatedValue = val.map((child) => transformValueToSchema(child))
    } else if (key === 'style') {
      updatedValue = stylesToEditorSchema(val, transformFunction)
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
  children: ReactNode
}
export function HtmlEditorProvider({
  children,
  value,
}: HtmlEditorProviderProps) {
  const [selected, setSelected] = useState<ElementPath | null>([])
  const transformedValue = transformValueToSchema(value)

  const fullContext = {
    value: transformedValue,
    selected,
    setSelected: (newSelection: ElementPath | null) =>
      setSelected(newSelection),
  }

  return (
    <HtmlEditorContext.Provider value={fullContext}>
      {children}
    </HtmlEditorContext.Provider>
  )
}
