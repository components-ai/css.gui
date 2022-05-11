import { Editor, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  offsetPath: {
    shape: {
      type: 'path',
      path: 'M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80',
    },
    box: 'margin-box',
  },
  offsetAnchor: {
    x: { value: 'center', unit: 'keyword' },
    y: { value: 'center', unit: 'keyword' },
  },
  offsetDistance: { value: 50, unit: '%' },
  offsetRotate: { value: 0, unit: 'deg' },
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
