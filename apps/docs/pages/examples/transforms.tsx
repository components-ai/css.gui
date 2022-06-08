import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  transform: [{ type: 'rotate', value: { value: 45, unit: 'deg' } }],
  perspective: { unit: 'keyword', value: 'none' },
  perspectiveOrigin: {
    x: { unit: 'keyword', value: 'center' },
    y: { unit: 'keyword', value: 'center' },
  },
  transformOrigin: {
    x: { unit: 'keyword', value: 'center' },
    y: { unit: 'keyword', value: 'center' },
    z: { unit: 'px', value: 0 },
  },
}

export default function Transforms() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ pt: 5, display: 'flex', justifyContent: 'center' }}>
      <div>
        <styled.div
          styles={{
            width: '48rem',
            maxWidth: '100%',
            height: '240px',
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
        </styled.div>
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
