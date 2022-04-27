import { ColorInput } from '../ColorInput'
import { CheckboxInput } from '../CheckboxInput'
import { LengthInput } from '../LengthInput'
import Layers, { LayerProps } from '../../Layers'
import LayerHeader from '../../LayerHeader'

import { BoxShadow } from './types'
import { stringifyBoxShadow } from './stringify'
import { EditorProps } from '../../../types/editor'
import { getInputProps } from '../../../lib/util'

export default function BoxShadowsField({
  value,
  onChange,
}: EditorProps<BoxShadow[]>) {
  const newItem = () => {
    return {
      spread: { value: 0, unit: 'px' },
      blur: { value: 0, unit: 'px' },
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: 0, unit: 'px' },
      color: '#000',
    } as const
  }
  return (
    <Layers<BoxShadow>
      value={value}
      onChange={onChange}
      newItem={newItem}
      addLabel="+ Add box shadow"
      header={Header}
      content={BoxShadowEditor}
    />
  )
}

export const BoxShadowEditor = (props: LayerProps<BoxShadow>) => {
  return (
    <div sx={{ margin: 3 }}>
      <section sx={{ display: 'flex', alignItems: 'center' }}>
        <div sx={{ width: '50%' }}>
          <ColorInput {...getInputProps(props, 'color')} />
        </div>
        <CheckboxInput {...getInputProps(props, 'inset')} />
      </section>
      <LengthInput {...getInputProps(props, 'offsetX')} label="Offset X" />
      <LengthInput {...getInputProps(props, 'offsetY')} label="Offset Y" />
      <LengthInput {...getInputProps(props, 'spread')} />
      <LengthInput {...getInputProps(props, 'blur')} />
    </div>
  )
}

export function Header({ value }: { value: BoxShadow | BoxShadow[] }) {
  const style = stringifyBoxShadow(value)
  return (
    <LayerHeader
      text={style}
      preview={
        <div
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div sx={{ width: '1rem', height: '1rem', boxShadow: style }} />
        </div>
      }
    />
  )
}