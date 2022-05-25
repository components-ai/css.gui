import { ColorInput } from '../ColorInput'
import { CheckboxInput } from '../CheckboxInput'
import { LengthInput } from '../LengthInput'
import Layers, { LayerProps } from '../../Layers'
import { BoxShadow } from './types'
import { stringifyBoxShadow } from './stringify'
import { getInputProps } from '../../../lib/util'
import { EditorPropsWithLabel } from '../../../types/editor'

export default function BoxShadowInput(
  props: EditorPropsWithLabel<BoxShadow[]>
) {
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
      {...props}
      newItem={newItem}
      content={BoxShadowEditor}
      stringify={stringifyBoxShadow}
      thumbnail={Thumbnail}
    />
  )
}

export const BoxShadowEditor = (props: LayerProps<BoxShadow>) => {
  return (
    <div
      sx={{ margin: 3, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
    >
      <ColorInput {...getInputProps(props, 'color')} />
      <CheckboxInput {...getInputProps(props, 'inset')} />
      <LengthInput {...getInputProps(props, 'offsetX')} label="Offset X" />
      <LengthInput {...getInputProps(props, 'offsetY')} label="Offset Y" />
      <LengthInput {...getInputProps(props, 'spread')} />
      <LengthInput {...getInputProps(props, 'blur')} />
    </div>
  )
}

function Thumbnail({ value }: { value: string }) {
  return (
    <div
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div sx={{ width: '1rem', height: '1rem', boxShadow: value }} />
    </div>
  )
}
