import { Editor, Inputs, toCSSObject } from '@compai/css-gui'
import Head from 'next/head'
import { useState } from 'react'
import { Container } from '../../components/Container'

const initialStyles = {
  animation: [
    {
      name: 'backOutRight',
      timingFunction: {
        type: 'cubic-bezier',
        p1: 0.42,
        p2: 0,
        p3: 0.58,
        p4: 1,
      },
      duration: { value: 2000, unit: 'ms' },
      delay: { value: 0, unit: 'ms' },
      iterationCount: 'infinite',
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
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
          />
        </Head>
        <div>
          <div
            sx={{
              mb: 4,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              height: '16rem',
              backgroundColor: '#128',
              ...toCSSObject(styles),
            }}
          >
            Animate!
          </div>
          <p sx={{ fontSize: '24px' }}>
            Try out any of the animations from{' '}
            <a sx={{ color: 'currentColor' }} href="https://animate.style/">
              animate.css
            </a>
            !
          </p>
          <Editor styles={styles} onChange={setStyles}>
            <Inputs.Animation />
          </Editor>
        </div>
      </Container>
    </div>
  )
}
