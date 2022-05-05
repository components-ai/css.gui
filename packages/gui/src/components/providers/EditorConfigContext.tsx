import { createContext, ReactChild, useContext } from 'react'

const DEFAULT_EDITOR_CONFIG = {
  hideResponsiveControls: false,
}

export type EditorConfig = {
  hideResponsiveControls?: boolean
}

export function useEditorConfig() {
  const context = useContext(EditorConfigContext)
  return context
}

const EditorConfigContext = createContext<EditorConfig>(DEFAULT_EDITOR_CONFIG)

type EditorConfigProviderProps = {
  config?: EditorConfig
  children: ReactChild
}
export function EditorConfigProvider({
  config = DEFAULT_EDITOR_CONFIG,
  children,
}: EditorConfigProviderProps) {
  return (
    <EditorConfigContext.Provider value={config}>
      {children}
    </EditorConfigContext.Provider>
  )
}
