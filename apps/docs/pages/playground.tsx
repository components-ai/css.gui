import { useState } from 'react'
import { Canvas } from '../components/playground/Canvas'
import { Sidebar } from '../components/playground/Sidebar'

export default function Playground() {
  const [styles, setStyles] = useState({
    fontSize: {
      value: 16,
      unit: 'px',
    },
    textAlign: 'center',
    lineHeight: {
      value: 1.6,
      unit: 'number',
    },
  })
  const [element, setElement] = useState({
    name: 'p',
    children: 'Hello, world!',
  })

  return (
    <>
      <Sidebar
        styles={styles}
        onChange={setStyles}
        element={element}
        onElementChange={setElement}
      />
      <Canvas styles={styles} element={element} />
    </>
  )
}
