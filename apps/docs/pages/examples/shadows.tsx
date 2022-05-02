import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  boxShadow: [
    {
      spread: { value: 2, unit: 'px' },
      blur: { value: 2, unit: 'px' },
      offsetX: { value: 2, unit: 'px' },
      offsetY: { value: 2, unit: 'px' },
      color: '#f00',
    },
  ],
  textShadow: [
    {
      blur: { value: 1, unit: 'px' },
      offsetX: { value: 1, unit: 'px' },
      offsetY: { value: 2, unit: 'px' },
      color: '#f00',
    },
    {
      blur: { value: 2, unit: 'px' },
      offsetX: { value: 2, unit: 'px' },
      offsetY: { value: 2, unit: 'px' },
      color: '#0f0',
    },
    {
      blur: { value: 3, unit: 'px' },
      offsetX: { value: 3, unit: 'px' },
      offsetY: { value: 2, unit: 'px' },
      color: '#00f',
    },
  ],
}

export default function Shadows() {
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
        <styled.div
          styles={{
            width: '12rem',
            height: '12rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...styles,
          }}
        >
          Fun with shadows
        </styled.div>
      </div>
    </div>
  )
}
