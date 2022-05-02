import { Editor, styled } from '@compai/css-gui'
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
        <styled.div
          styles={{
            width: '24rem',
            height: '24rem',
            backgroundImage: [
              {
                type: 'url',
                arguments: ['https://source.unsplash.com/random'],
              },
            ],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 4,
            color: 'black',
            ...styles,
          }}
        >
          Fun with filters
        </styled.div>
      </div>
    </div>
  )
}
