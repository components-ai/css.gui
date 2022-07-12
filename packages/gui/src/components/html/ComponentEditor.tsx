import fuzzysort from 'fuzzysort'
import { Label, Combobox } from '../primitives'
import { ComponentData, PropsDefinition } from './types'
import { useHtmlEditor } from './Provider'
import { ChangeEvent } from 'react'

interface ComponentEditorProps {
  value: ComponentData
  onChange(value: ComponentData): void
}

export const ComponentEditor = ({ value, onChange }: ComponentEditorProps) => {
  const { components = [] } = useHtmlEditor()

  const componentIds = components.map((c) => c.id)
  const componentNames = components.map((c) => c.tagName)
  const propTypes: PropsDefinition = value.propTypes || []

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

  const handleAddProp = () => {
    propTypes.push({
      name: 'newProp',
      type: 'string',
      defaultValue: 'Hello, world!',
    })

    onChange({ ...value, propTypes })
  }

  const handlePropNameChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      propTypes[index].name = e.target.value
      onChange({ ...value, propTypes })
    }

  const handlePropDefaultValueChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      propTypes[index].defaultValue = e.target.value
      onChange({ ...value, propTypes })
    }

  return (
    <div>
      <div
        sx={{
          px: 3,
          pb: 3,
          mb: 3,
          borderBottom: 'thin solid',
          borderColor: 'border',
        }}
      >
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
      <div sx={{ px: 3, pb: 3 }}>
        <h3 sx={{ m: 0 }}>Props</h3>
        {propTypes.map((prop, index) => {
          return (
            <div key={index}>
              <h4 sx={{ m: 0 }}>{prop.name}</h4>
              <Label>Prop name</Label>
              <input
                type="text"
                value={prop.name}
                onChange={handlePropNameChange(index)}
              />
              <Label>Default Value</Label>
              <input
                type="text"
                value={prop.defaultValue}
                onChange={handlePropDefaultValueChange(index)}
              />
            </div>
          )
        })}
        <button onClick={handleAddProp}>Add prop</button>
      </div>
    </div>
  )
}
