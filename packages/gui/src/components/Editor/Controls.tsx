import produce from 'immer'
import { Styles } from '../../types/css'
import { Theme } from '../../types/theme'
import { EditorProvider, useEditor } from '../providers/EditorContext'
import { EditorData, KeyArg, Recipe } from '../providers/types'
import { controlMap } from './map'

type ControlProps = {
  field: KeyArg
}
const Control = ({ field }: ControlProps) => {
  const { getField, setField } = useEditor()
  const Component = controlMap[field.toString()]

  if (!Component) {
    console.error(`Unknown field: ${field}, ignoring`)
    return null
  }

  return (
    <>
      <Component
        value={getField(field)}
        onChange={(newValue: any) => {
          setField(field, newValue)
        }}
      />
    </>
  )
}

type ControlsProps = {
  styles: Styles
  theme?: Theme
  onChange: (newStyles: any) => void
}
export const Controls = ({ theme, styles, onChange }: ControlsProps) => {
  const properties = Object.keys(styles)

  const handleStylesChange = (recipe: Recipe<EditorData<any>>) => {
    const newData = produce(styles, (draft: any) => {
      const valueData: EditorData<any> = {
        value: draft,
      }

      // @ts-ignore
      recipe(valueData)
      draft = valueData as any
    })

    onChange(newData)
  }
  return (
    <EditorProvider theme={theme} value={styles} onChange={handleStylesChange}>
      <>
        {properties.map((property) => {
          return <Control key={property} field={property} />
        })}
      </>
    </EditorProvider>
  )
}
