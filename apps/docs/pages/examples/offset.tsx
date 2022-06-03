import { Editor, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  offset: {
    path: {
      type: 'shape',
      value: {
        type: 'path',
        path: 'M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80',
        box: 'margin-box',
      },
    },
    anchor: {
      x: { value: 'center', unit: 'keyword' },
      y: { value: 'center', unit: 'keyword' },
    },
    distance: { value: 50, unit: '%' },
    rotate: { value: 0, unit: 'deg' },
    position: {
      x: { value: 50, unit: '%' },
      y: { value: 50, unit: '%' },
    },
  },
}

export default function OffsetExample() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '18rem 1fr' }}>
      <Editor styles={styles} onChange={setStyles} />
      <div>
        <div
          sx={{
            width: '20px',
            height: '20px',
            fontSize: '2rem',
            ...toCSSObject(styles),
          }}
        >
          🚗
        </div>
      </div>
    </div>
  )
}
