import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'
import { Container } from '../../components/Container'

const initialStyles = {
  filter: [{ type: 'sepia', amount: { value: 50, unit: '%' } }],
}

export default function Filters() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ pt: 5 }}>
    <Container>
      <Editor styles={styles} onChange={setStyles} />
      <div
        sx={{
          mt: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <styled.div
          styles={{
            width: '100%',
            aspectRatio: '4 / 3',
            backgroundImage: [
              {
                type: 'url',
                arguments: ['https://source.unsplash.com/random'],
              },
            ],
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
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
      </Container>
    </div>
  )
}
