import produce from 'immer'
import { ReactChild } from 'react'
import pascal from 'pascalcase'
import { Styles } from '../../types/css'
import { Theme } from '../../types/theme'
import { EditorProvider, useEditor } from '../providers/EditorContext'
import { EditorData, KeyArg, Recipe } from '../providers/types'
import { controlMap } from './map'
import { useFieldset } from './Fieldset'
import { joinPath } from '../providers/util'

type ControlProps = {
  field: KeyArg
}
const Control = ({ field }: ControlProps) => {
  const { getField, setField } = useEditor()
  const fieldset = useFieldset()
  const Component = controlMap[field.toString()]

  if (!Component) {
    console.error(`Unknown field: ${field}, ignoring`)
    return null
  }

  const fullField = fieldset ? joinPath(fieldset.name, field) : field

  return (
    <>
      <Component
        value={getField(fullField)}
        onChange={(newValue: any) => {
          setField(fullField, newValue)
        }}
      />
    </>
  )
}

export const Inputs: Record<string, any> = {}
Object.keys(controlMap).forEach((field: string) => {
  Inputs[pascal(field)] = () => <Control field={field} />
})

type ControlsProps = {
  styles: Styles
  theme?: Theme
  onChange: (newStyles: any) => void
  children?: ReactChild
}
export const Editor = ({
  theme,
  styles,
  onChange,
  children,
}: ControlsProps) => {
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

  const controls = children ? (
    children
  ) : (
    <>
      {properties.map((property) => {
        return <Control key={property} field={property} />
      })}
    </>
  )

  return (
    <EditorProvider theme={theme} value={styles} onChange={handleStylesChange}>
      {controls}
    </EditorProvider>
  )
}
