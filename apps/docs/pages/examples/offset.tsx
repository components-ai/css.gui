import { Editor, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  offsetPath: {
    shape: {
      type: 'circle',
      radius: { value: 'closest-side', unit: 'keyword' },
      position: {
        x: { value: 'center', unit: 'keyword' },
        y: { value: 'center', unit: 'keyword' },
      },
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
      <div sx={{ ...toCSSObject(styles) }}>🚗</div>
    </div>
  )
}
