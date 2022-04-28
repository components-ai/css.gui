import { RenderElement, Editor } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  transform: [{ type: 'rotate', amount: { value: 45, unit: 'deg' } }],
  perspective: { unit: 'keyword', value: 'none' },
  perspectiveOrigin: {
    x: { unit: 'keyword', value: 'center' },
    y: { unit: 'keyword', value: 'center' },
  },
}

export default function Transforms() {
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
            width: '24rem',
            height: '24rem',
            backgroundColor: '#f00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 4,
            color: 'black',
            ...styles,
          }}
        >
          Fun with transforms
        </RenderElement>
      </div>
    </div>
  )
}
