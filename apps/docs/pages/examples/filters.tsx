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
            width: '64px',
            height: '64px',
            background: 'linear-gradient(to right, red, blue)',
            ...styles,
          }}
        >
          Fun with filters
        </RenderElement>
      </div>
    </div>
  )
}
