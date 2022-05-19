import { useState } from 'react'
import { Canvas } from '../components/playground/Canvas'
import { Sidebar } from '../components/playground/Sidebar'

export default function Playground() {
  const [styles, setStyles] = useState({
    fontSize: {
      value: 16,
      unit: 'px',
    },
  })
  const [element, setElement] = useState({
    name: 'p',
  })

  return (
    <main
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <Sidebar
        styles={styles}
        onChange={setStyles}
        element={element}
        onElementChange={setElement}
      />
      <Canvas styles={styles} element={element} children="Hello, world!" />
    </main>
  )
}
