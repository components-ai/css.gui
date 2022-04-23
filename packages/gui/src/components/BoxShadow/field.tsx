import { ColorInput } from '../ColorInput'
import { CheckboxInput } from '../CheckboxInput'
import { LengthInput } from '../LengthInput'
import Layers, { LayerProps } from '../Layers'
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

export const BoxShadowEditor = ({ value, onChange }: LayerProps<BoxShadow>) => {
  return (
    <div sx={{ margin: 3 }}>
      <section sx={{ display: 'flex', alignItems: 'center' }}>
        <div sx={{ width: '50%' }}>
          <ColorInput
            label="Color"
            value={value.color}
            onChange={(color) => onChange({ ...value, color })}
          />
        </div>
        <CheckboxInput
          label="Inset"
          value={!!value.inset}
          onChange={(inset) => onChange({ ...value, inset })}
        />
      </section>
      <LengthInput
        label="Offset X"
        value={value.offsetX}
        onChange={(offsetX) => onChange({ ...value, offsetX })}
        keyword={false}
      />
      <LengthInput
        label="Offset Y"
        value={value.offsetY}
        onChange={(offsetY) => onChange({ ...value, offsetY })}
        keyword={false}
      />
      <LengthInput
        label="Spread"
        value={value.spread}
        onChange={(spread) => onChange({ ...value, spread })}
        keyword={false}
      />
      <LengthInput
        label="Blur"
        value={value.blur}
        onChange={(blur) => onChange({ ...value, blur })}
        keyword={false}
      />
    </div>
  )
}

export function Header({ value }: { value: BoxShadow | BoxShadow[] }) {
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
