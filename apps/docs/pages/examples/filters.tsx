import { RenderElement, Editor } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  filter: [{ type: 'sepia', amount: { value: 50, unit: '%' } }],
}

export default function Filters() {
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
            backgroundImage:
              'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 4,
            color: 'black',
            ...styles,
          }}
        >
          Fun with filters
        </RenderElement>
      </div>
    </div>
  )
}
