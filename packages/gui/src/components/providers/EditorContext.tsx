import { ThemeProvider as ThemeUIProvider } from 'theme-ui'
import { get, property, unset } from 'lodash-es'
import { createContext, ReactChild, ReactNode, useContext, useState } from 'react'
import { KeyArg, Recipe, EditorData } from './types'
import { applyRecipe } from './util'
import { ThemeProvider } from './ThemeContext'
import { EditorConfigProvider, EditorConfig } from './EditorConfigContext'
import { theme as uiTheme } from '../ui/theme'
import { Theme } from '../../types/theme'

export interface EditorContextValue<V> extends EditorData<V> {
  theme?: Theme
  setValue(value: Recipe<V>): void
  getField<T = any>(key: KeyArg): T
  setField<T>(key: KeyArg, value: Recipe<T>): void
  setFields<T>(fields: Record<string, Recipe<T>>, removeFields?: KeyArg[]): void
  removeField(key: KeyArg): void
}

export function useEditor() {
  const context = useContext(EditorContext)
  const { onChange: editComponentData, value } = context

  function getField<T = any>(field: KeyArg | undefined) {
    return field ? (get(value, field) as T) : value
  }

  function getFields<T = any>(fields: KeyArg[] | undefined) {
    const fieldsValue = fields?.reduce((acc: any, curr: KeyArg) => {
      const fieldValue = get(value, curr) as T
      return fieldValue
        ? {
            ...acc,
            [`${curr}`]: fieldValue,
          }
        : acc
    }, {})

    return fieldsValue ?? value
  }

  function setField<T>(field: KeyArg, recipe: Recipe<T>) {
    editComponentData((draft) => {
      applyRecipe(draft.value, field, recipe)
    })
  }

  function setFields<T>(
    fields: Record<string, Recipe<T>>,
    removeFields?: KeyArg[]
  ) {
    editComponentData((draft) => {
      if (removeFields) {
        removeFields.forEach((field) => {
          unset(draft.value, field)
        })
      }
      Object.entries(fields).map(([key, recipe]: any) => {
        applyRecipe(draft.value, key, recipe)
      })
    })
  }
  const onChange = setField

  const removeField = (field: KeyArg) => {
    editComponentData((draft) => {
      unset(draft.value, field)
    })
  }

  return {
    ...context,
    getField,
    getFields,
    setField,
    setFields,
    onChange,
    removeField,
  }
}

interface EditorContextProviderValue<V> extends EditorData<V> {
  onChange(recipe: Recipe<EditorData<V>>): void
  onRemove?(): void
  theme?: Theme
}

const EditorContext = createContext<EditorContextProviderValue<any>>({
  value: {},
  onChange: () => {},
  onRemove: () => {},
})

export function EditorProvider<V>({
  children,
  theme,
  hideResponsiveControls,
  showAddProperties,
  ...values
}: EditorContextProviderValue<V> & {
  hideResponsiveControls?: boolean
  showAddProperties?: boolean
  children: ReactNode
}) {
  const editorConfig: EditorConfig = {
    hideResponsiveControls: hideResponsiveControls ?? false,
    showAddProperties: showAddProperties ?? false,
  }
  const [dynamicProps, setDynamicProps] = useState<string[]>([])
  return (
    <ThemeProvider theme={theme}>
      <ThemeUIProvider theme={uiTheme}>
        <EditorConfigProvider config={editorConfig}>
          <DynamicControlsProvider
            dynamicProperties={dynamicProps}
            setDynamicProperties={setDynamicProps}
          >
            <EditorContext.Provider value={values}>
              {children}
            </EditorContext.Provider>
          </DynamicControlsProvider>
        </EditorConfigProvider>
      </ThemeUIProvider>
    </ThemeProvider>
  )
}


export function useDynamicControls() {
  const context = useContext(DynamicControlsContext)
  return context
}

interface DynamicControlsContextProps {
  dynamicProperties: string[]
  setDynamicProperties(properties: string[]): void 
}
const DynamicControlsContext = createContext<DynamicControlsContextProps>({
  dynamicProperties: [],
  setDynamicProperties: (properties: string[]) => {}
})

interface DynamicControlsProviderProps {
  dynamicProperties: string[],
  setDynamicProperties: (properties: string[]) => {}
  children: ReactChild
}
export function DynamicControlsProvider({
  dynamicProperties,
  setDynamicProperties,
  children
}: DynamicControlsProviderProps) {
  
  return (
    <DynamicControlsContext.Provider value={{
      dynamicProperties,
      setDynamicProperties
    }}>
      {children}
    </DynamicControlsContext.Provider>
  )
}