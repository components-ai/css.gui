import { Editor, Inputs, toCSSObject } from '@compai/css-gui'
import Head from 'next/head'
import { useState } from 'react'
import { Container } from '../../components/Container'

const initialStyles = {
  animation: [
    {
      name: 'zoomIn',
      timingFunction: {
        type: 'cubic-bezier',
        p1: 0,
        p2: 0,
        p3: 1,
        p4: 1,
      },
      duration: { value: 250, unit: 'ms' },
      delay: { value: 0, unit: 'ms' },
      iterationCount: { value: 'infinite', type: 'keyword' },
      fillMode: 'none',
      direction: 'normal',
      playState: 'running',
    },
  ],
}

export default function AnimationExample() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ pt: 5 }}>
      <Container>
        <h1>Animations</h1>
        <p>
          Try out any of the animations from{' '}
          <a sx={{ color: 'currentColor' }} href="https://animate.style/">
            animate.css
          </a>
          !
        </p>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        </Head>
        <div sx={{ display: 'grid', gridTemplateColumns: '16rem 1fr' }}>
          <Editor styles={styles} onChange={setStyles}>
            <Inputs.Animation />
          </Editor>
          <div
            sx={{
              width: '16rem',
              height: '16rem',
              backgroundColor: '#128',
              ...toCSSObject(styles),
            }}
          >
            Animate!
          </div>
        </div>
      </Container>
    </div>
  )
}
