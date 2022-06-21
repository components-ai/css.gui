import { Editor, styled, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  transform: [{ name: 'rotate', arguments: { value: 45, unit: 'deg' } }],
  perspective: 'none',
  perspectiveOrigin: {
    x: 'center',
    y: 'center',
  },
  transformOrigin: {
    x: 'center',
    y: 'center',
    z: { unit: 'px', value: 0 },
  },
}

export default function Transforms() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ pt: 5, display: 'flex', justifyContent: 'center' }}>
      <div>
        <div
          sx={{
            width: '48rem',
            maxWidth: '100%',
            height: '240px',
            backgroundColor: '#f00',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 4,
            color: 'black',
            ...toCSSObject(styles),
          }}
        >
          Fun with transforms
        </div>
        <div
          sx={{
            my: 5,
            '& > div': {
              display: 'grid',
              gap: '1rem',
            },
          }}
        >
          <Editor styles={styles} onChange={setStyles} />
        </div>
      </div>
    </div>
  )
}
