import { codegen, Editor, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'
import { defaultTheme } from '../../data/default-theme'
import { Container } from '../../components/Container'

const initialStyles = {
  stroke: '#fff',
  fill: 'none',
  strokeDasharray: [
    { value: 10, unit: 'number' },
    { value: 5, unit: 'number' },
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
        <Editor
          styles={styles}
          onChange={setStyles}
          theme={defaultTheme}
        ></Editor>
        </div>
    </div>
  )
}
