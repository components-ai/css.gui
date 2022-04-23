import { useId } from 'react'
import { ColorPopover, Label } from '../primitives'
import { useTheme } from '../providers/ThemeContext'
import { ColorEditorProps } from './types'
import { properties, getPropertyLabel } from '../../data/properties'
import { mapValues, pickBy } from 'lodash-es'

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
        <Label htmlFor={fullId}>{getPropertyLabel(name)}</Label>
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
