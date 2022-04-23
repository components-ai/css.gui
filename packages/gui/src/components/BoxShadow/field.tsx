import Layers from '../layers'
import LayerHeader from '../LayerHeader'

import { BoxShadow } from './types'
import { toCssValue } from './convert'
import { BoxShadowEditor } from './group-editor'
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

function Header({ value }: { value: BoxShadow }) {
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
