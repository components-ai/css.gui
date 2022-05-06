import { Editor, Inputs, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  gridTemplateColumns: [
    {
      type: 'repeat',
      count: 3,
      trackList: [{ type: 'breadth', value: { value: 1, unit: 'fr' } }],
    },
  ],
  gridTemplateRows: [
    {
      type: 'repeat',
      count: 3,
      trackList: [{ type: 'breadth', value: { value: 1, unit: 'fr' } }],
    },
  ],
}

export default function GridExample() {
  const [styles, setStyles] = useState<any>(initialStyles)

  return (
    <div sx={{ p: 2, display: 'grid', gridTemplateColumns: 'max-content 1fr' }}>
      <Editor styles={styles} onChange={setStyles}>
        <>
          <Inputs.GridTemplateColumns />
          <Inputs.GridTemplateRows />
        </>
      </Editor>
      <div sx={{ display: 'grid', ...toCSSObject(styles) }}>
        {[...Array(100)].map((n, i) => {
          return (
            <div sx={{ border: '1px solid', borderColor: 'text' }}>{i}</div>
          )
        })}
      </div>
    </div>
  )
}
