import { createContext, ReactNode, useContext } from 'react'
import { ComponentData } from './types'

const DEFAULT_COMPONENT_VALUE = {}

type ComponentProviderType = {
  value?: ComponentData
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
  children: ReactNode
}

export function ComponentProvider({ value, children }: ComponentProviderProps) {
  return (
    <ComponentContext.Provider value={{ value }}>
      {children}
    </ComponentContext.Provider>
  )
}
