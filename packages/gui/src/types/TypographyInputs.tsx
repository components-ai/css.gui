import { EditorProps } from '../types/editor'
import { FontFamilyType } from '../types/css'
import { FontFamilyInput } from '../components/inputs/FontFamily/FontFamilyInput'

export const FontFamily = ({value, onChange}: EditorProps<FontFamilyType>) => {
  return (
    // @ts-ignore
    <FontFamilyInput
      label={'Font Family'}
      value={value}
      onChange={onChange}
    />
  )
}
