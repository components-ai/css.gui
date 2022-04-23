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
  textShadow: [
    {
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
      <div
        sx={{
          m: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RenderElement
          tagName="div"
          styles={{
            width: '64px',
            height: '64px',
            ...styles,
          }}
        >
          Fun with shadows
        </RenderElement>
      </div>
    </div>
  )
}
