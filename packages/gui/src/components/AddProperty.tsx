import { properties as propertyList } from '../data/properties'
import { getDefaultValue } from './Editor/util'
import { Styles } from '../types/css'
import { Combobox, Label } from './primitives'
import { useDynamicControls } from './providers/DynamicPropertiesContext'
import { useEditor } from './providers/EditorContext'
import { KeyArg } from './providers/types'
import { joinPath } from './providers/util'
import fuzzysort from 'fuzzysort'
import { kebabCase } from 'lodash-es'

interface Props {
  field?: KeyArg
  styles: Styles
  label?: string
}
export const AddPropertyControl = ({
  field,
  styles,
  label = 'Add property',
}: Props) => {
  const { setField } = useEditor()
  const { addDynamicProperty } = useDynamicControls()

  //@ts-ignore
  const allProperties: string[] = Object.entries(propertyList)
    .map(([name, data]) => {
      return data.input ? name : null
    })
    .filter(Boolean)

  const handleFilterItems = (input: string) => {
    if (input === '') {
      return allProperties
    }

    const styleItems = Object.keys(styles)
    return fuzzysort
      .go(input.replace(/-/g, ''), allProperties)
      .map((res) => res.target)
      .filter((item) => !styleItems.includes(item))
  }

  const handleAddProperty = (propertyName: string) => {
    const fullField = field ? joinPath(field, propertyName) : propertyName

    setField(fullField, getDefaultValue(propertyName))
    if (addDynamicProperty && !field) {
      addDynamicProperty(propertyName)
    }
  }

  return (
    <div>
      <Label>
        <span sx={{display: 'block', mb: 1,}}>{label}</span>
        <Combobox
          onFilterItems={handleFilterItems}
          onItemSelected={handleAddProperty}
          items={allProperties}
          decorateItemText={(str) => kebabCase(str)}
          clearOnSelect
        />
      </Label>
    </div>
  )
}
