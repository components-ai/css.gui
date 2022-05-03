import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  transitionTimingFunction: {
    type: 'cubic-bezier',
    p1: 0,
    p2: 0,
    p3: 1,
    p4: 1,
  },
  transitionDuration: { value: 250, unit: 'ms' },
  transitionDelay: { value: 0, unit: 'ms' },
  transitionProperty: 'all',
  width: { value: 200, unit: 'px' },
  height: { value: 200, unit: 'px' },
  borderRadius: { value: 0, unit: 'px' },
  backgroundColor: '#f00',
}

export default function Transitions() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div>
      <div sx={{ ':first-child > div' : { display: 'grid', gap: '.5em' }}}>
        <Editor styles={styles} onChange={setStyles} />
      </div>
      <section sx={{ mt: 5 }}>
        <styled.div styles={styles} />
      </section>
    </div>
  )
}
