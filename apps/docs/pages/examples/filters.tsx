import { Editor, Inputs, styled, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'
import { Container } from '../../components/Container'

export default function Filters() {
  const [styles, setStyles] = useState<any>({
    filter: [
      {
        name: 'blur',
        arguments: { value: 8, unit: 'px' },
      },
    ],
  })

  return (
    <div sx={{ pt: 5 }}>
      <Container>
        <Editor styles={styles} onChange={setStyles}>
          <Inputs.Filter />
        </Editor>
        <div
          sx={{
            mt: 5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            sx={{
              width: '100%',
              aspectRatio: '4 / 3',
              backgroundImage: 'url("https://dlu344star2bj.cloudfront.net/i/3090-0015.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 4,
              color: 'black',
              ...toCSSObject(styles),
            }}
          >
            Fun with filters
          </div>
        </div>
      </Container>
    </div>
  )
}
