import { createContext, ReactNode, useContext, useState } from 'react'
import { htmlToEditorSchema } from '../../lib'
import { HtmlNode, ElementPath } from './types'

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

type HtmlEditorProviderProps = {
  value: HtmlNode
  children: ReactNode
}
export function HtmlEditorProvider({
  children,
  value,
}: HtmlEditorProviderProps) {
  const [selected, setSelected] = useState<ElementPath | null>([])

  const fullContext = {
    value,
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
