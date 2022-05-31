import { ThemeProvider as ThemeUIProvider } from 'theme-ui'
import { get, unset } from 'lodash-es'
import { createContext, ReactNode, useContext } from 'react'
import { KeyArg, Recipe, EditorData } from './types'
import { applyRecipe } from './util'
import { ThemeProvider, useTheme } from './ThemeContext'
import { EditorConfigProvider, EditorConfig } from './EditorConfigContext'
import { theme as uiTheme } from '../ui/theme'
import { Theme } from '../../types/theme'
import { DynamicControlsProvider } from './DynamicPropertiesContext'
import { stylesToEditorSchema } from '../../lib/transformers/styles-to-editor-schema'
import { importTheme } from '../../lib'

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
  const { theme } = useTheme()
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
    theme,
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

const testTheme = {
  colors: {
    yellow: [
      '#141101',
      '#272202',
      '#393402',
      '#4c4503',
      '#5f5604',
      '#7d7103',
      '#bba402',
      '#f0d10f',
      '#f8e361',
      '#fbed93',
      '#fdf4bd',
      '#fffbe6',
    ],
    lime: [
      '#0d0f00',
      '#1a1f00',
      '#283000',
      '#394307',
      '#4b570f',
      '#637214',
      '#92ad09',
      '#b9dd0c',
      '#c7e43d',
      '#d6eb6f',
      '#e7f5a6',
      '#f8ffd9',
    ],
    green: [
      '#000e05',
      '#00240c',
      '#003a14',
      '#00511b',
      '#006923',
      '#02822d',
      '#1fb050',
      '#3fdb74',
      '#72f59e',
      '#9afaba',
      '#c1fcd5',
      '#e8fff0',
    ],
    teal: [
      '#000e0a',
      '#002016',
      '#003323',
      '#00452f',
      '#00573b',
      '#008056',
      '#06b57a',
      '#32c291',
      '#5dcfa8',
      '#89dec1',
      '#b4eeda',
      '#e0fff4',
    ],
    cyan: [
      '#001212',
      '#002b2b',
      '#004343',
      '#005454',
      '#006464',
      '#007474',
      '#009898',
      '#00c5c5',
      '#34d7d7',
      '#71e4e4',
      '#aef0f0',
      '#ebfdfd',
    ],
  },
}
export function EditorProvider<V>({
  children,
  theme,
  hideResponsiveControls,
  showAddProperties,
  value: providedValue,
  ...values
}: EditorContextProviderValue<V> & {
  hideResponsiveControls?: boolean
  showAddProperties?: boolean
  children: ReactNode
}) {
  const { theme: outerTheme } = useTheme()
  const editorConfig: EditorConfig = {
    hideResponsiveControls: hideResponsiveControls ?? false,
    showAddProperties: showAddProperties ?? false,
  }

  const value = stylesToEditorSchema(providedValue)
  const otherTheme = importTheme(testTheme)
  return (
    <ThemeProvider themes={[(theme || outerTheme), otherTheme ]}>
      <ThemeUIProvider theme={uiTheme}>
        <EditorConfigProvider config={editorConfig}>
          <DynamicControlsProvider>
            <EditorContext.Provider value={{ value, ...values }}>
              {children}
            </EditorContext.Provider>
          </DynamicControlsProvider>
        </EditorConfigProvider>
      </ThemeUIProvider>
    </ThemeProvider>
  )
}
