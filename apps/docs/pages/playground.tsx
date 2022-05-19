import { useState } from 'react'
import { Canvas } from '../components/playground/Canvas'
import { Sidebar } from '../components/playground/Sidebar'
import * as initialStyles from '../data/elements'

export default function Playground() {
  const [styles, setStyles] = useState(initialStyles.a)
  const [element, setElement] = useState({
    name: 'a',
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
