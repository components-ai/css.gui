import { codegen, Editor, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'
import { defaultTheme } from '../../data/default-theme'
import { Container } from '../../components/Container'

const initialStyles = {
  stroke: '#fff',
  fill: 'none',
  strokeAlignment: {
    value: 'center',
    unit: 'keyword',
  },
  strokeWidth: {
    value: 8,
    unit: 'px',
  },
  strokeLinejoin: {
    value: 'round',
    unit: 'keyword',
  },
  strokeLinecap: {
    value: 'square',
    unit: 'keyword',
  },
  strokeDashadjust: {
    value: 'dashed',
    unit: 'keyword',
  },
  strokeDashcorner: {
    value: 0,
    unit: 'px',
  },
  strokeDashoffset: {
    value: 0,
    unit: 'px',
  },
  strokeDasharray: [
    { value: 0, unit: 'number' },
    { value: 8, unit: 'number' },
    { value: 0, unit: 'number' },
    { value: 24, unit: 'number' },
  ],
}
export default function SvgExample() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <div sx={{
      pt: 5,
      display: 'flex',
      justifyContent: 'center',
      }}>
      <div>
        <svg width="400" height="400">
          <circle sx={{ ...toCSSObject(styles) }} cx={200} cy={200} r={150} />
        </svg>
        <section sx={{ '& > div': {
          display: 'grid', gap: '1em',
          }}}>
        <Editor
          styles={styles}
          onChange={setStyles}
          theme={defaultTheme}
        ></Editor>
        </section>
        </div>
    </div>
  )
}
