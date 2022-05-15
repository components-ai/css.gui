import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'
import { Container } from '../../components/Container'

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
      <div
        sx={{
          my: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <styled.div
          styles={{
            width: '32rem',
            height: '20rem',
            maxWidth: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '128px',
            ...styles,
          }}
        >
          Fun with shadows
        </styled.div>
      </div>
      <div sx={{ display: 'flex', justifyContent: 'center',}}>
        <Editor styles={styles} onChange={setStyles} />
      </div>
    </div>
  )
}
