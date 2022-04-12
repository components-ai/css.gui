import { Primitives } from 'gui'
import { useState } from 'react'

export default function Docs() {
  const [num, setNum] = useState<number>(0)
  return (
    <div>
      <h1>Docs</h1>
      <h3>Number</h3>
      <Primitives.Number
        value={num}
        onChange={(n: number) => {
          console.log(n)
          setNum(n)
        }}
      />
    </div>
  )
}
