import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  transitionDuration: { value: 250, unit: 'ms' },
  transitionDelay: { value: 0, unit: 'ms' },
  transitionTimingFunction: {
    type: 'cubic-bezier',
    p1: 0,
    p2: 0,
    p3: 1,
    p4: 1,
  },
  transitionProperty: 'height',
  width: { value: 200, unit: 'px' },
  height: { value: 200, unit: 'px' },
  backgroundColor: '#f00',
}

export default function Transitions() {
  const [styles, setStyles] = useState<any>(initialStyles)
  return (
    <div>
      <Editor styles={styles} onChange={setStyles} />
      <styled.div styles={styles} />
    </div>
  )
}
