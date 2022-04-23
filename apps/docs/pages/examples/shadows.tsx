import { RenderElement, Editor } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  boxShadow: [
    {
      spread: { value: 0, unit: 'px' },
      blur: { value: 0, unit: 'px' },
      offsetX: { value: 0, unit: 'px' },
      offsetY: { value: 0, unit: 'px' },
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
