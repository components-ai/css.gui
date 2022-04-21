import produce from 'immer'
import { Styles } from '../../types/css'
import { Theme } from '../../types/theme'
import { FontSizeInput, LineHeightInput } from '../editors'
import { EditorProvider, useEditor } from '../providers/EditorContext'
import { EditorData, KeyArg, Recipe } from '../providers/types'

type ControlProps = {
  field: KeyArg
}
const Control = ({ field }: ControlProps) => {
  const { getField, setField } = useEditor()

  return (
    <>
      <FontSizeInput
        value={getField(field)}
        onChange={(newValue) => {
          setField(field, newValue)
        }}
      />
      {/* <LineHeightInput
        value={getField('lineHeight')}
        onChange={(newValue) => {
          setField('lineHeight', newValue)
        }}
      /> */}
    </>
  )
}

type ControlsProps = {
  styles: Styles
  theme?: Theme
  onChange: (newStyles: any) => void
}
export const Controls = ({ theme, styles, onChange }: ControlsProps) => {
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
      <Control field="fontSize" />
    </EditorProvider>
  )
}
