import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'

const createElementStyles = () => ({
  gridRowStart: Math.ceil(Math.random() * 6),
  gridRowEnd: Math.ceil(Math.random() * 6),
  gridColumnStart: Math.ceil(Math.random() * 6),
  gridColumnEnd: Math.ceil(Math.random() * 6),
  offset: Math.random(),
})

const initialStyles = {
  transform: [
    { type: 'perspective', amount: { value: 512, unit: 'px' } },
    { type: 'rotateX', amount: { value: 15, unit: 'deg' } },
    { type: 'rotateY', amount: { value: 15, unit: 'deg' } },
  ],
}

export default function Shadows() {
  const [styles, setStyles] = useState<any>(initialStyles)

  const [elements, setElements] = useState([createElementStyles()])
  const [offset, setOffset] = useState(128)
  const [string, setString] = useState('components.ai')

  return (
    <div>
      <Editor styles={styles} onChange={setStyles} />

      <button
        onClick={(e) => setElements([...elements, createElementStyles()])}
      >
        +
      </button>
      <button onClick={(e) => setElements([...elements.slice(0, -1)])}>
        -
      </button>

      <div>
        <input
          type="text"
          value={string}
          onChange={(e) => setString(e.target.value)}
        />
        <br />
        <input
          type="range"
          value={offset}
          onChange={(e) => setOffset(parseInt(e.target.value))}
          min={0}
          max={512}
          step={1}
        />
      </div>

      <pre sx={{ position: 'absolute' }}>
        {elements.map((el) => JSON.stringify(el) + '\n')}
      </pre>

      <styled.div
        styles={{
          m: 4,
          display: 'grid',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
          ...styles,
        }}
      >
        {elements.map((el, i) => {
          const deltaY = Math.abs(el.gridRowStart - el.gridRowEnd)
          const deltaX = Math.abs(el.gridColumnStart - el.gridColumnEnd)

          const area = (deltaX * deltaY) / 12

          return (
            <div
              sx={{
                ...el,
                p: 3,
                fontWeight: 900,
                fontSize: Math.ceil((deltaX + 1) * 18) + 'px',
                transform: `translateZ(${offset * (el.offset - 0.5)}px)`,
                border: '1px solid',
                borderColor: 'red.7',
              }}
            >
              {string[i]}
            </div>
          )
        })}
      </styled.div>
    </div>
  )
}
