import { supportedProperties, Editor, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  shapeOutside: {
    type: 'shape',
    shape: {
      type: 'inset',
      top: { value: 2, unit: 'px' },
      right: { value: 2, unit: 'px' },
      bottom: { value: 2, unit: 'px' },
      left: { value: 2, unit: 'px' },
      borderRadius: { value: 16, unit: 'px' },
    },
    box: 'margin-box',
  },
  shapeMargin: { value: 0, unit: 'px' },
  shapeImageThreshold: {
    value: 0,
    unit: '%',
  },
  width: { value: 200, unit: 'px' },
  height: { value: 200, unit: 'px' },
  float: 'left',
}

export default function ShapeOutsideExample() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '18rem 1fr' }}>
      <Editor styles={styles} onChange={setStyles} />
      <div sx={{ textAlign: 'justify' }}>
        <div
          sx={{
            ...toCSSObject(styles),
          }}
        ></div>
        {text}
      </div>
    </div>
  )
}

const text = supportedProperties.map((prop) => prop.property).join(' ')
