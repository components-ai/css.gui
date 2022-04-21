import { useState } from 'react'
import { LengthInput, Length, stringifyUnit, CSSUnitValue } from 'gui'

export const LengthExample = () => {
  const [value, setValue] = useState<Length>({
    value: 16,
    unit: 'px',
  })
  return (
    <div>
      <div sx={{ width: 256, ml: 0 }}>
        <LengthInput property="fontSize" value={value} onChange={setValue} />
      </div>
      <h1
        sx={{
          m: 0,
          lineHeight: 1.2,
          fontSize: stringifyUnit('fontSize', value),
        }}
      >
        Aa
      </h1>
    </div>
  )
}
