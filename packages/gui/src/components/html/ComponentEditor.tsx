import { Label, Combobox } from '../primitives'
import { ComponentData } from './types'
import { useHtmlEditor } from './Provider'

interface ComponentEditorProps {
  value: ComponentData
  onChange(value: ComponentData): void
}

export const ComponentEditor = ({ value, onChange }: ComponentEditorProps) => {
  const { components = [] } = useHtmlEditor()

  const componentNames = components.map((c) => c.id)

  const handleFilterComponents = (input: string) => {
    return componentNames
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
          items={componentNames}
          clearOnSelect
        />
      </div>
    </div>
  )
}
