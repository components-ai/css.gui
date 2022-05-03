import { Editor, styled } from '@compai/css-gui'
import { useState } from 'react'

const createElementStyles = () => ({
  gridRowStart: Math.ceil(Math.random() * 6),
  gridRowEnd: Math.ceil(Math.random() * 6),
  gridColumnStart: Math.ceil(Math.random() * 6),
  gridColumnEnd: Math.ceil(Math.random() * 6),
  backgroundColor: 'red.' + Math.floor(Math.random() * 10),
  offset: Math.random(),
})

export default function Shadows() {
  const [elements, setElements] = useState([createElementStyles()])

  const [perspective, setPerspective] = useState(256)
  const [offset, setOffset] = useState(128)

  return (
    <div>
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
          type="range"
          value={perspective}
          onChange={(e) => setPerspective(parseInt(e.target.value))}
          min={0}
          max={512}
          step={1}
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

      <pre sx={{ width: 3 }}>
        {elements.map((el) => JSON.stringify(el) + '\n')}
      </pre>

      <div
        sx={{
          m: 4,
          display: 'grid',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          pointerEvents: 'none',
          transform: `perspective(${perspective}px) rotateX(24deg) rotateY(36deg)`,
        }}
      >
        {elements.map((el) => (
          <div
            sx={{
              ...el,
              p: 3,
              transform: `translateZ(${offset * el.offset}px)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}
