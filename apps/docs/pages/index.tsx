import { Primitives, UnitSelect } from 'gui'
import { useState } from 'react'

export default function Docs() {
  const [num, setNum] = useState<number>(0)
  return (
    <div>
      <h1>Docs</h1>
      <h3>Number</h3>
      <Primitives.Number value={num} onChange={setNum} />
      <h3>Unit</h3>
      <UnitSelect withTheme={true} withPercentages={true} />
    </div>
  )
}
