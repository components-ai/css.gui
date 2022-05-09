import { Editor, Inputs, toCSSObject } from '@compai/css-gui'
import { useState } from 'react'

const initialStyles = {
  gridTemplateColumns: [
    {
      type: 'repeat',
      count: 5,
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

const initialChildStyles = {
  gridRowStart: {
    position: 2,
    ident: '',
  },
  gridRowEnd: {
    position: 4,
    ident: '',
  },
  gridColumnStart: {
    position: 2,
    ident: '',
  },
  gridColumnEnd: {
    span: true,
    position: 3,
    ident: '',
  },
}

export default function GridExample() {
  const [containerStyles, setContainerStyles] = useState<any>(initialStyles)
  const [childStyles, setChildStyles] = useState<any>(initialChildStyles)

  return (
    <div
      sx={{
        p: 2,
        display: 'grid',
        gridTemplateColumns: 'minmax(18rem, max-content) 1fr',
        gap: 3,
      }}
    >
      <section>
        <h2>Container</h2>
        <Editor styles={containerStyles} onChange={setContainerStyles}>
          <>
            <Inputs.GridTemplateColumns />
            <Inputs.GridTemplateRows />
          </>
        </Editor>
        <h2>Child</h2>
        <Editor styles={childStyles} onChange={setChildStyles}>
          <>
            <Inputs.GridColumnStart />
            <Inputs.GridColumnEnd />
            <Inputs.GridRowStart />
            <Inputs.GridRowEnd />
          </>
        </Editor>
      </section>
      <div sx={{ display: 'grid', ...toCSSObject(containerStyles) }}>
        {[...Array(100)].map((n, i) => {
          return (
            <div sx={{ border: '1px solid', borderColor: 'text' }}>{i}</div>
          )
        })}
        <div
          sx={{
            display: 'flex',
            alignItems: 'center',
            placeContent: 'center',
            backgroundColor: 'tomato',
            ...toCSSObject(childStyles),
          }}
        >
          Child
        </div>
      </div>
    </div>
  )
}
