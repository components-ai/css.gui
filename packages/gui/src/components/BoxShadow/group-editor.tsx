import { LayerProps } from '../layers'
import { BoxShadow } from './types'
import { ColorPicker as ColorField } from '../primitives'

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
      <LengthField label="Offset X" field={[...path, 'offsetX']} />
      <LengthField label="Offset Y" field={[...path, 'offsetY']} />
      <LengthField label="Spread" field={[...path, 'spread']} />
      <LengthField label="Blur" field={[...path, 'blur']} />
    </div>
  )
}
