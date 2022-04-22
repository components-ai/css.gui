import { useId } from 'react'
import { ColorPopover, Label } from '../primitives'
import { useTheme } from '../providers/ThemeContext'
import { ColorEditorProps } from './types'
import { properties } from '../../data/properties'
import { lowerCase, mapValues, pickBy, upperFirst } from 'lodash-es'

const colorProperties = pickBy(
  properties,
  (property) => property.type === 'color'
)

export const colorInputs = mapValues(colorProperties, (property, name) => {
  return ({ value, onChange }: ColorEditorProps) => {
    const theme = useTheme()
    const id = useId()
    const fullId = `${id}-${name}`
    return (
      <>
        <Label htmlFor={fullId}>{getLabel(name)}</Label>
        <ColorPopover
          id={fullId}
          value={value || property.defaultValue || '#000'}
          onChange={onChange}
          theme={theme}
        />
      </>
    )
  }
})

export const BackgroundColorInput = colorInputs.backgroundColor
export const ColorInput = colorInputs.color
export const BorderColorInput = colorInputs.borderColor
export const CaretColorInput = colorInputs.caretColor

// Convert a css keyword to display string
function getLabel(keyword: string) {
  return upperFirst(lowerCase(keyword))
}
