import { createContext, ReactNode, useContext } from 'react'
import { useHtmlEditor } from '../Provider'
import { ComponentData, ElementPath } from '../types'

const DEFAULT_COMPONENT_VALUE = {}

type ComponentProviderType = {
  value?: ComponentData
  path?: ElementPath
  selectComponent?(e: MouseEvent): void
}

export function useComponent() {
  const context = useContext(ComponentContext)
  return context
}

const ComponentContext = createContext<ComponentProviderType>(
  DEFAULT_COMPONENT_VALUE
)

type ComponentProviderProps = {
  value: ComponentData
  path: ElementPath
  children: ReactNode
}

export function ComponentProvider({
  value,
  path,
  children,
}: ComponentProviderProps) {
  const { setSelected } = useHtmlEditor()
  const selectComponent = (e: MouseEvent) => {
    setSelected(path)
    e.stopPropagation()
  }
  return (
    <ComponentContext.Provider value={{ value, path, selectComponent }}>
      {children}
    </ComponentContext.Provider>
  )
}
