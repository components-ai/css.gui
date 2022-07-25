import { createContext, ReactNode, useContext } from 'react'
import { useHtmlEditor } from '../Provider'
import { ComponentData, ElementPath, HtmlNode, Slot } from '../types'
import { setChildAtPath } from '../util'
import { updateSlotForComponentInstance } from './util'

const DEFAULT_COMPONENT_VALUE = {}

type ComponentProviderType = {
  value?: ComponentData
  path?: ElementPath
  selectComponent?(e: MouseEvent): void
  updateComponent?(path: ElementPath, newItem: HtmlNode): void
  updateComponentSlot?(newSlotValue: HtmlNode): void
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
  const {
    setSelected,
    value: fullValue,
    update,
    components,
    updateComponent: emitUpdatedComponent,
  } = useHtmlEditor()
  const selectComponent = (e: MouseEvent) => {
    setSelected(path)
    e.stopPropagation()
  }

  const updateComponent = (fullEditPath: ElementPath, newValue: HtmlNode) => {
    const component = components!.find((c) => c.id === value.id)!
    const editPath = fullEditPath.slice(path.length)

    const newComponentValue = setChildAtPath(value.value, editPath, newValue)
    const newComponent = {
      ...component,
      value: newComponentValue,
    }

    const newFullValue = setChildAtPath(fullValue, path, {
      ...value,
      value: newComponentValue,
    })

    update(newFullValue)
    emitUpdatedComponent?.(newComponent)
  }

  const updateComponentSlot = (newValue: HtmlNode) => {
    const fullComponent = updateSlotForComponentInstance(
      value,
      newValue as Slot
    )

    // @ts-ignore
    const newFullValue = setChildAtPath(fullValue, path, fullComponent)
    update(newFullValue)
  }

  return (
    <ComponentContext.Provider
      value={{
        value,
        path,
        selectComponent,
        updateComponent,
        updateComponentSlot,
      }}
    >
      {children}
    </ComponentContext.Provider>
  )
}
