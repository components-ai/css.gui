import { createContext, ReactChild, useContext } from 'react'

const DEFAULT_EDITOR_CONFIG = {
  hideResponsiveControls: false,
  showAddProperties: true,
}

export type EditorConfig = {
  hideResponsiveControls?: boolean
  showAddProperties?: boolean
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
