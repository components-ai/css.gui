import { LayerProps } from '../layers'
import { ColorPicker as ColorField } from '../primitives'
import { LengthInput as LengthField } from '../LengthInput'
import Layers from '../layers'
import LayerHeader from '../LayerHeader'

import { BoxShadow } from './types'
import { toCssValue } from './convert'
import { EditorProps } from '../editors/types'

export default function BoxShadowsField({
  value,
  onChange,
}: EditorProps<BoxShadow[]>) {
  const newItem = () => {
    return {
      spread: '0',
      blur: '0',
      offsetX: '0',
      offsetY: '0',
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

export const BoxShadowEditor = ({ value, onChange }: LayerProps<BoxShadow>) => {
  return (
    <div sx={{ margin: 3 }}>
      <section sx={{ display: 'flex', alignItems: 'center' }}>
        <div sx={{ width: '50%' }}>
          <ColorField
            // label="Color"
            value={value.color}
            onChange={(color) => onChange({ ...value, color })}
          />
        </div>
        {/* <CheckboxField label="Inset" field={[...path, 'inset']} /> */}
      </section>
      <LengthField
        label="Offset X"
        value={value.offsetX}
        onChange={(offsetX) => onChange({ ...value, offsetX })}
      />
      <LengthField
        label="Offset Y"
        value={value.offsetY}
        onChange={(offsetY) => onChange({ ...value, offsetY })}
      />
      <LengthField
        label="Spread"
        value={value.spread}
        onChange={(spread) => onChange({ ...value, spread })}
      />
      <LengthField
        label="Blur"
        value={value.blur}
        onChange={(blur) => onChange({ ...value, blur })}
      />
    </div>
  )
}

export function Header({ value }: { value: BoxShadow }) {
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
          <div sx={{ width: '1rem', height: '1rem', boxShadow: style }} />
        </div>
      }
    />
  )
}
