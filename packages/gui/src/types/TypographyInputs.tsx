import { EditorProps } from '../types/editor'
import { FontFam } from '../types/css'
import { FontFamilyInput } from '../components/inputs/FontFamily/FontFamilyInput'

export const FontFamily = ({value, onChange}: EditorProps<FontFam>) => {
  return (
    // @ts-ignore
    <FontFamilyInput
      label={'Font Family'}
      value={value}
      onChange={onChange}
    />
  )
}
