import { EditorProps } from './types'
import { FontFam } from '../../types/css'
import { FontFamilyInput } from '../../components/FontFamily/FontFamilyInput'

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
