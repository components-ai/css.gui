import { codegen, Editor, Inputs, styled, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'
import { defaultTheme } from '../../data/default-theme'
import { Container } from '../../components/Container'

const initialStyles = {
  mask: [
    {
      clip: 'border-box',
      image: {
        type: 'url',
        value: 'https://source.unsplash.com/random',
      },
      origin: 'border-box',
      position: {
        x: { value: 0, type: '%' },
        y: { value: 0, type: '%' },
      },
      repeat: ['no-repeat', 'no-repeat'],
      size: [
        { value: 100, unit: '%' },
        { value: 100, unit: '%' },
      ],
      composite: 'add',
      mode: 'luminance',
    },
  ],
}

export default function MaskExample() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ pt: 5 }}>
      <Container>
        <div sx={{ mb: 5, '& > img': { maxWidth: '100%', display: 'block' } }}>
          <img
            src="https://source.unsplash.com/random"
            sx={toCSSObject(styles)}
          />
        </div>
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <Inputs.Mask />
        </Editor>
      </Container>
    </div>
  )
}
