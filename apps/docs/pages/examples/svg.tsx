import { Editor, parseStyles, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'
import { defaultTheme } from '../../data/default-theme'

const initialStyles = parseStyles({
  stroke: '#fff',
  fill: 'none',
  strokeAlignment: 'center',
  strokeWidth: '8px',
  strokeLinejoin: 'round',
  strokeLinecap: 'square',
  strokeDashadjust: 'dashed',
  strokeDasharray: '1, 20, 1, 15',
})
export default function SvgExample() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <div
      sx={{
        pt: 5,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div>
        <svg width="400" height="400">
          <circle sx={{ ...toCSSObject(styles) }} cx={200} cy={200} r={150} />
        </svg>
        <section
          sx={{
            '& > div': {
              display: 'grid',
              gap: '1em',
            },
          }}
        >
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
