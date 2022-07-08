import fuzzysort from 'fuzzysort'
import { Label, Combobox } from '../primitives'
import { ComponentData } from './types'
import { useHtmlEditor } from './Provider'

interface ComponentEditorProps {
  value: ComponentData
  onChange(value: ComponentData): void
}

export const ComponentEditor = ({ value, onChange }: ComponentEditorProps) => {
  const { components = [] } = useHtmlEditor()

  const componentIds = components.map((c) => c.id)
  const componentNames = components.map((c) => c.tagName)

  const handleFilterComponents = (input: string) => {
    if (!input) {
      return componentIds
    }

    return fuzzysort
      .go(input, componentNames)
      .map((res) => res.target)
      .map((name) => components.find((c) => c.tagName === name)?.id ?? name)
  }

  const handleComponentSelected = (selectedItem: string) => {
    const component = components.find((c) => c.id === selectedItem)
    if (component) {
      onChange(component)
    }
  }

  return (
    <div>
      <div sx={{ px: 3 }}>
        <Label>Component</Label>
        <Combobox
          onFilterItems={handleFilterComponents}
          onItemSelected={handleComponentSelected}
          decorateItemText={(id) => {
            return components.find((c) => c.id === id)?.tagName ?? id
          }}
          items={componentIds}
          clearOnSelect
        />
      </div>
    </div>
  )
}
