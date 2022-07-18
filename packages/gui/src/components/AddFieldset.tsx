import { useCombobox } from 'downshift'
import { useEffect, useId, useRef, useState } from 'react'
import { elements } from '../data/elements'
import { pseudoClasses } from '../data/pseudo-classes'
import { pseudoElements } from '../data/pseudo-elements'
import { Styles } from '../types/css'
import { Combobox, Label } from './primitives'
import { useEditor } from './providers/EditorContext'
import { KeyArg } from './providers/types'
import { joinPath } from './providers/util'

interface Props {
  field?: KeyArg
  styles: Styles
  label?: string
}
export const AddFieldsetControl = ({
  field,
  styles,
  label = 'Add pseudo element or class',
}: Props) => {
  const { setField } = useEditor()
  const allItems = [...pseudoClasses, ...pseudoElements, ...elements]

  const handleFilterItems = (input: string) => {
    const styleItems = Object.keys(styles)
    const filteredItems = allItems
      .filter((item) => {
        if (item.toLowerCase().startsWith(input.toLowerCase() || '')) {
          return !styleItems.includes(item)
        }
      })
      .sort()

    return filteredItems
  }

  const handleAddFieldset = (propertyName: string) => {
    const fullField = field ? joinPath(field, propertyName) : propertyName
    setField(fullField, {})
  }

  return (
    <div
      sx={{
        borderRadius: '6px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'border',
        p: 3,
      }}
    >
      <Label>{label}</Label>
      <Combobox
        items={allItems}
        onFilterItems={handleFilterItems}
        onItemSelected={handleAddFieldset}
        clearOnSelect
      />
    </div>
  )
}
