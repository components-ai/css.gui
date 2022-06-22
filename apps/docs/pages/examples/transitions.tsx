import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'
import { Container } from '../../components/Container'

const initialStyles = {
  transition: [
    {
      timingFunction: {
        type: 'cubic-bezier',
        p1: 0,
        p2: 0,
        p3: 1,
        p4: 1,
      },
      property: 'width',
      duration: { value: 250, unit: 'ms' },
      delay: { value: 0, unit: 'ms' },
    },
    {
      timingFunction: {
        type: 'cubic-bezier',
        p1: 0.1,
        p2: 0.2,
        p3: 0.9,
        p4: 0.75,
      },
      property: 'background-color',
      duration: { value: 350, unit: 'ms' },
      delay: { value: 0, unit: 'ms' },
    },
  ],
  width: { value: 100, unit: '%' },
  height: { value: 240, unit: 'px' },
  borderRadius: { value: 0, unit: 'px' },
  backgroundColor: { type: 'theme', path: 'primary' },
}

export default function Transitions() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div sx={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <section sx={{ my: 5 }}>
          <styled.div styles={styles} />
        </section>
        <div sx={{ '& > div': { display: 'grid', gap: '1em' } }}>
          <Editor styles={styles} onChange={setStyles} />
        </div>
      </div>
    </div>
  )
}
