import { createContext, ReactNode, useContext } from 'react'
import { ComponentData, ElementPath } from '../types'

const DEFAULT_COMPONENT_VALUE = {}

type ComponentProviderType = {
  value?: ComponentData
  path?: ElementPath
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
  return (
    <ComponentContext.Provider value={{ value, path }}>
      {children}
    </ComponentContext.Provider>
  )
}
