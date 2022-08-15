import { ChangeEvent } from 'react'
import fuzzysort from 'fuzzysort'
import { Label, Combobox } from '../../primitives'
import { ComponentData, Slot } from '../types'
import { useHtmlEditor } from '../Provider'
import { getSlots, isSlot } from '../../../lib/codegen/util'
import { mergeComponentAttributes } from './util'

interface ComponentEditorProps {
  value: ComponentData
  onChange(value: ComponentData): void
}

export const ComponentEditor = ({ value, onChange }: ComponentEditorProps) => {
  const { components = [] } = useHtmlEditor()

  const componentIds = components.map((c) => c.id)
  const componentNames = components.map((c) => c.tagName)
  const componentProps = value.props || {}
  const slots = getSlots(value.value)
  const attributes = mergeComponentAttributes(value)
  const attributeEntries = Object.entries(attributes)

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
      onChange({ ...component, props: value.props })
    }
  }

  const handlePropChange =
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        props: {
          ...componentProps,
          [name]: e.target.value,
        },
      })
    }

  const handleAttributeChange =
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,
        attributes: {
          ...attributes,
          [name]: e.target.value,
        },
      })
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
          value={value.tagName}
          onFilterItems={handleFilterComponents}
          onItemSelected={handleComponentSelected}
          decorateItemText={(id) => {
            return components.find((c) => c.id === id)?.tagName ?? id
          }}
          items={componentIds}
        />
      </div>
      <div sx={{ px: 3, pb: 3 }}>
        <h3 sx={{ m: 0 }}>Props</h3>
        {slots.map((slot, index) => {
          return (
            <div key={index}>
              <Label>{slot.name}</Label>
              <input
                type="text"
                value={componentProps[slot.name] ?? slot.value}
                onChange={handlePropChange(slot.name)}
              />
            </div>
          )
        })}
        {attributeEntries.length ? (
          <>
            {attributeEntries.map((entry) => {
              const [key, rawValue] = entry

              const val = isSlot(rawValue as Slot)
                ? (rawValue as Slot).value
                : rawValue

              return (
                <div key={key}>
                  <Label>
                    <span sx={{ display: 'block', width: '100%' }}>{key}</span>
                    <div
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '.5rem',
                      }}
                    >
                      <input
                        value={val as string}
                        onChange={handleAttributeChange(key)}
                      />
                    </div>
                  </Label>
                </div>
              )
            })}
          </>
        ) : null}
      </div>
    </div>
  )
}
