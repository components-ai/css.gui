import { EditorProps } from '../../types/editor'
import { FontFamilyType, TempFontFamilyType } from '../../types/css'
import { FontFamilyInput } from './FontFamily/Input'

export const FontFamily = ({value, onChange}: EditorProps<TempFontFamilyType>) => {
  return (
    // @ts-ignore
    <FontFamilyInput
      label={'Font Family'}
      value={value}
      onChange={onChange}
    />
  )
}
