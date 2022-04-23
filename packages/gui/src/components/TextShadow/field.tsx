import { ColorInput } from '../ColorInput'
import { LengthInput } from '../LengthInput'
import { EditorProps } from '../editors/types'
import { TextShadow } from './types'

import { toCssValue } from './convert'

import LayerHeader from '../LayerHeader'
import Layers from '../layers'

export default function TextShadowField({
  value,
  onChange,
}: EditorProps<TextShadow[]>) {
  const newItem = () => {
    // generate a new text shadow with the units of the previous box shadow
    return {
      blur: { value: 0, unit: 'px' },
      spread: { value: 0, unit: 'px' },
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: 0, unit: 'px' },
      color: '#000',
    } as const
  }
  return (
    <Layers<TextShadow>
      value={value}
      onChange={onChange}
      newItem={newItem}
      addLabel="+ Add text shadow"
      header={Header}
      content={TextShadowEditor}
    />
  )
}

export const TextShadowEditor = ({
  value,
  onChange,
}: EditorProps<TextShadow>) => {
  return (
    <div sx={{ margin: 3 }}>
      <ColorInput
        label="Color"
        value={value.color}
        onChange={(color) => onChange({ ...value, color })}
      />
      <LengthInput
        label="Offset X"
        value={value.offsetX}
        onChange={(offsetX) => onChange({ ...value, offsetX })}
      />
      <LengthInput
        label="Offset Y"
        value={value.offsetY}
        onChange={(offsetY) => onChange({ ...value, offsetY })}
      />
      <LengthInput
        label="Blur"
        value={value.blur}
        onChange={(blur) => onChange({ ...value, blur })}
      />
    </div>
  )
}

export function Header({ value }: { value: TextShadow | TextShadow[] }) {
  const style = toCssValue(value)
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
          <div sx={{ textShadow: style, fontWeight: 'bold' }}>Aa</div>
        </div>
      }
    />
  )
}
