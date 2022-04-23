import { RenderElement, Editor } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  boxShadow: [
    {
      blur: '0',
      spread: '0',
      offsetX: '0',
      offsetY: '0',
      color: '#f00',
    },
  ],
}

export default function Shadows() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div>
      <Editor styles={styles} onChange={setStyles} />
      <RenderElement
        tagName="div"
        styles={{
          width: '32px',
          height: '32px',
          backgroundColor: '#fff',
          ...styles,
        }}
      />
    </div>
  )
}
