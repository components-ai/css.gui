import { createContext, ReactNode, useContext } from 'react'
import { useHtmlEditor } from '../Provider'
import { ComponentData, ElementPath, HtmlNode } from '../types'

const DEFAULT_COMPONENT_VALUE = {}

type ComponentProviderType = {
  value?: ComponentData
  path?: ElementPath
  selectComponent?(e: MouseEvent): void
  updateComponent?(path: ElementPath, newItem: HtmlNode): void
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

  const updateComponent = (path: ElementPath, newValue: HtmlNode) => {
    // TODO: It's a slot!!!!!!
    // update the `props`
    console.log({ path, value, newValue })
  }

  return (
    <ComponentContext.Provider
      value={{ value, path, selectComponent, updateComponent }}
    >
      {children}
    </ComponentContext.Provider>
  )
}
