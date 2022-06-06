import { Editor, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  clipPath: {
    type: 'shape',
    shape: {
      type: 'inset',
      top: { value: 2, unit: 'px' },
      right: { value: 2, unit: 'px' },
      bottom: { value: 2, unit: 'px' },
      left: { value: 2, unit: 'px' },
      borderRadius: { value: 16, unit: 'px' },
      offset: {
        top: {
          value: 0,
          unit: 'px',
        },
      },
    },
    box: 'margin-box',
  },
}

export default function ClipPathExample() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '18rem 1fr',
        gap: '2em',
        p: [4, 5, 5],
      }}
    >
      <Editor styles={styles} onChange={setStyles} />
      <div>
        <div
          sx={{
            width: '800px',
            height: '800px',
            backgroundColor: 'darkslategrey',
            display: 'grid',
            placeContent: 'center',
            ...toCSSObject(styles),
          }}
        >
          fun with ✂️
        </div>
      </div>
    </div>
  )
}
