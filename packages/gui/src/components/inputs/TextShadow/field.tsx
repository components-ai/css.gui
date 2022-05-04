import { ColorInput } from '../ColorInput'
import { LengthInput } from '../LengthInput'
import { EditorProps } from '../../../types/editor'
import { TextShadow } from './types'

import { stringifyTextShadow } from './stringify'

import Layers from '../../Layers'
import { EditorPropsWithLabel, getInputProps } from '../../../lib/util'

export default function TextShadowInput(
  props: EditorPropsWithLabel<TextShadow[]>
) {
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
      {...props}
      newItem={newItem}
      content={TextShadowEditor}
      stringify={stringifyTextShadow}
      thumbnail={Thumbnail}
    />
  )
}

export const TextShadowEditor = (props: EditorProps<TextShadow>) => {
  return (
    <div sx={{ margin: 3 }}>
      <ColorInput {...getInputProps(props, 'color')} />
      <LengthInput {...getInputProps(props, 'offsetX')} label="Offset X" />
      <LengthInput {...getInputProps(props, 'offsetY')} label="Offset Y" />
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
      <div sx={{ textShadow: value, fontWeight: 'bold' }}>Aa</div>
    </div>
  )
}
